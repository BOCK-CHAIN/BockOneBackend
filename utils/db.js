/**
 * db.js — Direct PostgreSQL pool (RDS)
 * Drop-in replacement for the Supabase client for table queries.
 * Provides a subset of the @supabase/supabase-js query builder API so
 * existing route files need minimal changes.
 */
import pg from 'pg';
import dotenv from 'dotenv';
import { S3Client, PutObjectCommand, DeleteObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';

dotenv.config();

const { Pool } = pg;

// ── S3 client ────────────────────────────────────────────────────
const s3 = new S3Client({
  region: process.env.AWS_REGION || 'ap-south-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const S3_BUCKET = process.env.AWS_S3_BUCKET || 'bock-s3-188055487636';
const CLOUDFRONT_URL = process.env.CLOUDFRONT_URL || null;

function buildPublicUrl(storagePath) {
  if (CLOUDFRONT_URL) {
    return `${CLOUDFRONT_URL}/${storagePath}`;
  }
  return `https://${S3_BUCKET}.s3.${process.env.AWS_REGION || 'ap-south-1'}.amazonaws.com/${storagePath}`;
}

// Allow self-signed RDS certs
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 10,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 5000,
});

pool.on('error', (err) => {
  console.error('❌ Unexpected error on idle pg client', err);
});

// ──────────────────────────────────────────────────────────────
// Lightweight Supabase-compatible query builder
// Supports: .from(table).select(cols).eq(col,val).in(col,[...])
//           .insert(data).update(data).delete()
//           .single() .maybeSingle() .limit(n) .range(a,b)
//           .order(col, {ascending}) .not(col,op,val)
// Returns:  { data, error }
// ──────────────────────────────────────────────────────────────
class QueryBuilder {
  constructor(table) {
    this._table = table;
    this._operation = 'SELECT';
    this._selectCols = '*';
    this._insertData = null;
    this._updateData = null;
    this._conditions = [];   // { col, op, val }
    this._orderBy = [];
    this._limitVal = null;
    this._offsetVal = null;
    this._singleRow = false;
    this._maybeSingle = false;
    this._returnCols = null; // for .select() after insert/update
  }

  // ── Chainable methods ─────────────────────────────────────
  select(cols = '*') {
    if (this._operation === 'SELECT') {
      this._selectCols = cols || '*';
    } else {
      // .select() after insert/update means "return these columns"
      this._returnCols = cols || '*';
    }
    return this;
  }

  eq(col, val) {
    this._conditions.push({ col, op: '=', val });
    return this;
  }

  neq(col, val) {
    this._conditions.push({ col, op: '!=', val });
    return this;
  }

  gt(col, val) {
    this._conditions.push({ col, op: '>', val });
    return this;
  }

  lt(col, val) {
    this._conditions.push({ col, op: '<', val });
    return this;
  }

  gte(col, val) {
    this._conditions.push({ col, op: '>=', val });
    return this;
  }

  in(col, vals) {
    this._conditions.push({ col, op: 'IN', val: vals });
    return this;
  }

  not(col, op, val) {
    // Supabase .not(col, 'is', null) → col IS NOT NULL
    if (op === 'is' && val === null) {
      this._conditions.push({ col, op: 'IS NOT NULL', val: null, raw: true });
    } else {
      this._conditions.push({ col, op: `NOT ${op.toUpperCase()}`, val });
    }
    return this;
  }

  order(col, { ascending = true } = {}) {
    this._orderBy.push(`${_quoteIdent(col)} ${ascending ? 'ASC' : 'DESC'}`);
    return this;
  }

  limit(n) {
    this._limitVal = n;
    return this;
  }

  range(from, to) {
    this._offsetVal = from;
    this._limitVal = to - from + 1;
    return this;
  }

  single() {
    this._singleRow = true;
    this._limitVal = 1;
    return this._execute();
  }

  maybeSingle() {
    this._maybeSingle = true;
    this._limitVal = 1;
    return this._execute();
  }

  // Resolve as a promise (then/catch)
  then(resolve, reject) {
    return this._execute().then(resolve, reject);
  }

  // ── Operation starters ────────────────────────────────────
  insert(data) {
    this._operation = 'INSERT';
    this._insertData = Array.isArray(data) ? data : [data];
    return this;
  }

  update(data) {
    this._operation = 'UPDATE';
    this._updateData = data;
    return this;
  }

  delete() {
    this._operation = 'DELETE';
    return this;
  }

  upsert(data, { onConflict } = {}) {
    this._operation = 'UPSERT';
    this._insertData = Array.isArray(data) ? data : [data];
    this._onConflict = onConflict;
    return this;
  }

  // ── SQL execution ─────────────────────────────────────────
  async _execute() {
    try {
      const { sql, params } = this._buildSql();
      const result = await pool.query(sql, params);
      const rows = result.rows;

      if (this._singleRow) {
        if (!rows.length) return { data: null, error: new Error('No rows found') };
        return { data: rows[0], error: null };
      }
      if (this._maybeSingle) {
        return { data: rows[0] ?? null, error: null };
      }
      return { data: rows, error: null };
    } catch (err) {
      console.error(`❌ DB error [${this._table}]:`, err.message);
      return { data: null, error: err };
    }
  }

  _buildSql() {
    const params = [];
    let idx = 1;

    const addParam = (v) => { params.push(v); return `$${idx++}`; };

    // WHERE clause
    const whereParts = this._conditions.map(({ col, op, val, raw }) => {
      if (raw) return `${_quoteIdent(col)} ${op}`;
      if (op === 'IN' || op === 'NOT IN') {
        let vals = val;
        // Support PostgREST string IN filter format like ("uuid1","uuid2")
        if (typeof vals === 'string' && vals.startsWith('(')) {
          vals = vals.slice(1, -1).split(',').map(s => s.replace(/(^"|"$)/g, ''));
        }
        if (!vals || !vals.length) return op === 'IN' ? 'FALSE' : 'TRUE';
        const placeholders = vals.map(v => addParam(v)).join(', ');
        return `${_quoteIdent(col)} ${op} (${placeholders})`;
      }
      return `${_quoteIdent(col)} ${op} ${addParam(val)}`;
    });
    const whereClause = whereParts.length ? `WHERE ${whereParts.join(' AND ')}` : '';

    let sql;

    if (this._operation === 'SELECT') {
      // Supabase uses FK join syntax like profiles!posts_user_id_fkey(col,col)
      // We simplify: strip join hints, select from main table only
      const cols = _simplifySelect(this._selectCols);
      sql = `SELECT ${cols} FROM ${_quoteIdent(this._table)} ${whereClause}`;
      if (this._orderBy.length) sql += ` ORDER BY ${this._orderBy.join(', ')}`;
      if (this._limitVal != null) sql += ` LIMIT ${this._limitVal}`;
      if (this._offsetVal != null) sql += ` OFFSET ${this._offsetVal}`;

    } else if (this._operation === 'INSERT' || this._operation === 'UPSERT') {
      const rows = this._insertData;
      const keys = Object.keys(rows[0]);
      const cols = keys.map(_quoteIdent).join(', ');
      const valueSets = rows.map(row =>
        `(${keys.map(k => addParam(row[k])).join(', ')})`
      ).join(', ');
      sql = `INSERT INTO ${_quoteIdent(this._table)} (${cols}) VALUES ${valueSets}`;
      if (this._operation === 'UPSERT' && this._onConflict) {
        const conflictCols = this._onConflict.split(',').map(c => _quoteIdent(c.trim())).join(', ');
        const updateSets = keys.filter(k => !this._onConflict.includes(k))
          .map(k => `${_quoteIdent(k)} = EXCLUDED.${_quoteIdent(k)}`).join(', ');
        sql += ` ON CONFLICT (${conflictCols}) DO ${updateSets ? 'UPDATE SET ' + updateSets : 'NOTHING'}`;
      }
      const retCols = this._returnCols ? _simplifySelect(this._returnCols) : '*';
      sql += ` RETURNING ${retCols}`;

    } else if (this._operation === 'UPDATE') {
      const sets = Object.entries(this._updateData)
        .map(([k, v]) => `${_quoteIdent(k)} = ${addParam(v)}`).join(', ');
      const retCols = this._returnCols ? _simplifySelect(this._returnCols) : '*';
      sql = `UPDATE ${_quoteIdent(this._table)} SET ${sets} ${whereClause} RETURNING ${retCols}`;

    } else if (this._operation === 'DELETE') {
      sql = `DELETE FROM ${_quoteIdent(this._table)} ${whereClause} RETURNING *`;
    }

    return { sql, params };
  }
}

// ── Helpers ──────────────────────────────────────────────────
function _quoteIdent(name) {
  return `"${name.replace(/"/g, '""')}"`;
}

// Strip Supabase join-hint syntax: profiles!fkey(col) → just skip joined tables
// Keep simple column lists intact
function _simplifySelect(cols) {
  if (!cols || cols === '*') return '*';
  const tokens = cols
    .split(',')
    .map((token) => token.trim())
    .filter(Boolean)
    .filter(
      (token) =>
        !token.includes('(') &&
        !token.includes(')') &&
        !token.includes('!'),
    );

  if (!tokens.length) return '*';
  if (tokens.includes('*')) return '*';

  return tokens.join(', ');
}

// ── Public API ────────────────────────────────────────────────
const supabase = {
  from: (table) => new QueryBuilder(table),

  rpc: (funcName, params = {}) => {
    let sql, args;
    if (funcName === 'increment_likes_count') {
      sql = 'UPDATE public.posts SET likes_count = likes_count + 1 WHERE id = $1';
      args = [params.post_id];
    } else if (funcName === 'decrement_likes_count') {
      sql = 'UPDATE public.posts SET likes_count = GREATEST(likes_count - 1, 0) WHERE id = $1';
      args = [params.post_id];
    } else if (funcName === 'increment_comments_count') {
      sql = 'UPDATE public.posts SET comments_count = comments_count + 1 WHERE id = $1';
      args = [params.post_id];
    } else if (funcName === 'decrement_comments_count') {
      sql = 'UPDATE public.posts SET comments_count = GREATEST(comments_count - 1, 0) WHERE id = $1';
      args = [params.post_id];
    } else {
      return Promise.resolve({ data: null, error: new Error(`RPC ${funcName} not implemented`) });
    }
    return pool.query(sql, args)
      .then(() => ({ data: null, error: null }))
      .catch(err => ({ data: null, error: err }));
  },

  // S3-based storage (replaces Supabase Storage)
  storage: {
    from: (bucket) => ({
      upload: async (path, buffer, opts) => {
        try {
          await s3.send(new PutObjectCommand({
            Bucket: S3_BUCKET,
            Key: `${bucket}/${path}`,
            Body: buffer,
            ContentType: opts?.contentType || 'application/octet-stream',
          }));
          console.log(`✅ S3 upload succeeded: ${bucket}/${path}`);
          return { data: { path }, error: null };
        } catch (err) {
          console.error(`❌ S3 upload error [${bucket}/${path}]:`, err.message);
          return { data: null, error: err };
        }
      },
      getPublicUrl: (path) => {
        const fullPath = `${bucket}/${path}`;
        return { data: { publicUrl: buildPublicUrl(fullPath) } };
      },
    }),
  },

  // Auth stub (not used — routes use their own JWT)
  auth: {
    getUser: async () => ({ data: { user: null }, error: new Error('Use custom JWT') }),
  },
};

export const verifyJWT = async (req, res, next) => {
  return res.status(401).json({ error: 'Unauthorized', message: 'Use Authorization: Bearer <token>' });
};

export const optionalJWT = async (req, res, next) => next();

export default supabase;
export { pool };

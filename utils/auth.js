/**
 * auth.js — Re-exports the pg-backed supabase shim from db.js
 * Keeps backward compatibility for all routes that import from './auth.js'
 */
export { default, verifyJWT, optionalJWT } from './db.js';
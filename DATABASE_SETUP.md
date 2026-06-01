# Database Setup Guide for BockFoodsServer

## Current Issue
The database connection is failing because Prisma cannot reach the Neon PostgreSQL database.

## Solutions

### Option 1: Fix Neon PostgreSQL Connection (Recommended for Production)

If you have a Neon PostgreSQL database, update your `.env` file:

```env
DATABASE_URL="postgresql://user:password@ep-mute-haze-a431c4vk-pooler.us-east-1.aws.neon.tech:5432/dbname?sslmode=require"
JWT_SECRET="your-super-secret-jwt-key-change-this-in-production-min-32-characters"
PORT=3000
```

**Important:** 
- Replace `user`, `password`, and `dbname` with your actual Neon database credentials
- Make sure `?sslmode=require` is included at the end
- Verify your Neon database is active and accessible

### Option 2: Use Local PostgreSQL (Recommended for Development)

1. **Install PostgreSQL locally** (if not already installed)
   - Download from: https://www.postgresql.org/download/

2. **Create a database:**
   ```sql
   CREATE DATABASE bockfoods;
   ```

3. **Update `.env` file:**
   ```env
   DATABASE_URL="postgresql://postgres:yourpassword@localhost:5432/bockfoods"
   JWT_SECRET="dev-secret-key-change-in-production-min-32-characters-long"
   PORT=3000
   ```

4. **Run migrations:**
   ```bash
   npx prisma migrate deploy
   ```

### Option 3: Use Docker PostgreSQL (Quick Setup)

1. **Create `docker-compose.yml` in BockFoodsServer:**
   ```yaml
   version: '3.8'
   services:
     postgres:
       image: postgres:15-alpine
       container_name: bockfoods_db
       environment:
         POSTGRES_USER: bockuser
         POSTGRES_PASSWORD: bockpassword
         POSTGRES_DB: bockfoods
       ports:
         - "5432:5432"
       volumes:
         - postgres_data:/var/lib/postgresql/data

   volumes:
     postgres_data:
   ```

2. **Start PostgreSQL:**
   ```bash
   docker-compose up -d
   ```

3. **Update `.env` file:**
   ```env
   DATABASE_URL="postgresql://bockuser:bockpassword@localhost:5432/bockfoods"
   JWT_SECRET="dev-secret-key-change-in-production-min-32-characters-long"
   PORT=3000
   ```

4. **Run migrations:**
   ```bash
   npx prisma migrate deploy
   ```

## After Setting Up Database

1. **Generate Prisma Client:**
   ```bash
   npx prisma generate
   ```

2. **Run Migrations:**
   ```bash
   npx prisma migrate deploy
   ```

3. **Test Connection:**
   ```bash
   npx prisma db pull
   ```
   This should connect successfully without errors.

4. **Start Server:**
   ```bash
   npm run dev
   ```

You should see: `✅ Successfully connected to database`

## Troubleshooting

### Error: "Can't reach database server"
- Check if PostgreSQL is running
- Verify DATABASE_URL credentials are correct
- For Neon: Ensure `?sslmode=require` is in the URL
- Check firewall/network settings

### Error: "Authentication failed"
- Verify username and password are correct
- Check if database exists
- Verify user has proper permissions

### Error: "Database does not exist"
- Create the database: `CREATE DATABASE bockfoods;`
- Or update DATABASE_URL to point to existing database

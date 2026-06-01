# BockFoodsServer Setup Guide

## Prerequisites
- Node.js 18+ installed
- PostgreSQL database running
- DATABASE_URL environment variable configured

## Setup Steps

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
Create a `.env` file in the `BockFoodsServer` directory (copy from `.env.example`):

**For Neon PostgreSQL (Cloud):**
```env
DATABASE_URL="postgresql://user:password@ep-mute-haze-a431c4vk-pooler.us-east-1.aws.neon.tech:5432/dbname?sslmode=require"
JWT_SECRET="your-super-secret-jwt-key-change-this-in-production-min-32-characters"
PORT=3000
```

**For Local PostgreSQL:**
```env
DATABASE_URL="postgresql://user:password@localhost:5432/bockfoods"
JWT_SECRET="your-super-secret-jwt-key-change-this-in-production-min-32-characters"
PORT=3000
```

**Important:** 
- If using Neon PostgreSQL, make sure `?sslmode=require` is included in the DATABASE_URL
- Replace `user`, `password`, and `dbname` with your actual database credentials
- The JWT_SECRET should be at least 32 characters long
- **See DATABASE_SETUP.md for detailed database configuration instructions**

### 3. Test Database Connection
```bash
npm run test-db
```

This will verify your DATABASE_URL is correct and the database is accessible.

### 4. Generate Prisma Client
```bash
npx prisma generate
```

**Note:** If you get a file permission error on Windows, try:
- Close any running Node.js processes
- Run the command again
- Or restart your terminal/IDE

### 5. Run Database Migrations
```bash
npx prisma migrate deploy
```

Or if you need to create a new migration:
```bash
npx prisma migrate dev --name init
```

### 6. (Optional) Seed Database
If you have seed data:
```bash
npm run seed
```

### 7. Start the Server
```bash
npm run dev
```

The server will run on `http://localhost:3000`

## API Endpoints

### Categories
- `GET /api/categories` - Get all available categories

### Menu Items
- `GET /api/menu-items` - Get all menu items
- `GET /api/menu-items?cuisine=Italian` - Filter by cuisine
- `GET /api/menu-items?q=search` - Search menu items
- `GET /api/menu-items/restaurant/:restaurantId` - Get items by restaurant

### Grocery Items
- `GET /api/grocerystores/categories` - Get grocery categories
- `GET /api/grocerystores/items` - Get all grocery items
- `GET /api/grocerystores/items?categoryId=xxx` - Filter by category
- `GET /api/grocerystores/items?q=search` - Search grocery items
- `GET /api/grocerystores/featured` - Get featured items

### Restaurants
- `GET /api/restaurants` - Get all restaurants
- `GET /api/restaurants/:id` - Get restaurant with menu items

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

## Flutter App Configuration

In the Flutter app, set `BOCK_FOODS_API_BASE_URL` in `.env`:
```env
BOCK_FOODS_API_BASE_URL=http://localhost:3000
```

Or configure it in the app's Settings page.

## Troubleshooting

### Prisma Client Generation Fails
- Close all Node.js processes
- Delete `node_modules/.prisma` folder
- Run `npx prisma generate` again

### Database Connection Issues
- **Run `npm run test-db` to diagnose connection problems**
- Verify DATABASE_URL is correct in `.env` file
- Ensure PostgreSQL is running (local) or accessible (cloud)
- Check database credentials
- For Neon PostgreSQL: Ensure `?sslmode=require` is in DATABASE_URL
- **See DATABASE_SETUP.md for detailed troubleshooting**

### CORS Issues
- CORS is enabled for all origins in development
- Adjust CORS settings in `src/index.js` for production

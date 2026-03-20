// src/index.js

const express = require('express');
const cors = require('cors');
require('dotenv').config();
const prisma = require('./lib/prisma');

const authRouter = require('./routes/auth.routes');
const userRouter = require('./routes/user.routes');
const restaurantRouter = require('./routes/restaurant.routes');
const menuRouter = require('./routes/menu.routes');
const cartRouter = require('./routes/cart.routes');
const orderRouter = require('./routes/order.routes');
const groceryRouter = require('./routes/grocery.routes');
const categoryRouter = require('./routes/category.routes');

const app = express();
const PORT = process.env.PORT || 3000;

// --- CORRECT MIDDLEWARE ORDER ---

// 1. Enable CORS for all requests. This should come first.
app.use(cors());

// 2. Add a special handler specifically for preflight OPTIONS requests.
// This ensures they are handled quickly and correctly.
app.options('*', cors()); 

// 3. THEN, use the JSON body parser. This will only run on requests
// that are NOT preflight requests (like POST, GET, etc.).
app.use(express.json());

// --- END OF MIDDLEWARE CORRECTION ---


// --- ROUTES ---
app.get('/', (req, res) => {
  res.send('Hello, Swiggy Backend!');
});

app.use('/api/auth', authRouter);
app.use('/api/users', userRouter);
app.use('/api/restaurants', restaurantRouter);
app.use('/api/menu-items', menuRouter);
app.use('/api/cart', cartRouter);
app.use('/api/orders', orderRouter);
app.use('/api/grocerystores', groceryRouter);
app.use('/api/categories', categoryRouter);


const shutdown = async () => {
  try {
    await prisma.$disconnect();
  } catch (error) {
    console.error('Error disconnecting Prisma:', error.message);
  } finally {
    process.exit(0);
  }
};

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);

const startServer = async () => {
  try {
    await prisma.$connect();
    console.log('✅ Successfully connected to database');

    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
      console.log(`\n📝 Note: Make sure DATABASE_URL is configured in .env file`);
      console.log(`📚 See DATABASE_SETUP.md for database configuration help\n`);
    });
  } catch (error) {
    console.error('❌ Database connection error:', error.message);
    console.error('💡 Please check your DATABASE_URL in .env file');
    process.exit(1);
  }
};

// --- SERVER START ---
startServer();

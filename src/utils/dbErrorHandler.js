// Database error handler utility
function handleDatabaseError(error, res) {
  console.error('Database error:', error);
  
  // Prisma connection errors
  if (error.code === 'P1001' || error.message.includes("Can't reach database")) {
    return res.status(503).json({ 
      message: 'Database connection failed', 
      error: 'Please check DATABASE_URL in .env file and ensure the database server is running',
      hint: 'For Neon PostgreSQL, ensure SSL is enabled: ?sslmode=require',
      help: 'See DATABASE_SETUP.md for configuration help'
    });
  }
  
  // Prisma query errors
  if (error.code && error.code.startsWith('P')) {
    return res.status(500).json({ 
      message: 'Database query error', 
      error: error.message 
    });
  }
  
  // Generic error
  return res.status(500).json({ 
    message: 'Database operation failed', 
    error: error.message 
  });
}

module.exports = { handleDatabaseError };

// src/controllers/auth.controller.js

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { handleDatabaseError } = require('../utils/dbErrorHandler');
const prisma = require('../lib/prisma');

const register = async (req, res) => {
  const { email, password, name } = req.body;

  if (!email || !password || !name) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { email, name, password: hashedPassword },
    });
    const { password: _, ...userWithoutPassword } = user;
    res.status(201).json(userWithoutPassword);
  } catch (error) {
    console.error('--- REGISTER ERROR ---', error);
    
    // Handle database connection errors specifically
    if (error.code === 'P1001' || error.message.includes("Can't reach database")) {
      return handleDatabaseError(error, res);
    }
    
    res.status(500).json({ message: 'Something went wrong', error: error.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign(
      { userId: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );
    
    // Return user data (excluding password) along with token
    const { password: _, ...userWithoutPassword } = user;
    res.status(200).json({ 
      message: 'Login successful', 
      token,
      user: userWithoutPassword
    });
  } catch (error) {
    console.error('--- LOGIN ERROR ---', error);
    
    // Handle database connection errors specifically
    if (error.code === 'P1001' || error.message.includes("Can't reach database")) {
      return handleDatabaseError(error, res);
    }
    
    res.status(500).json({ message: 'Something went wrong', error: error.message });
  }
};

module.exports = {
  register,
  login,
};

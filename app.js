const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorHandler');

// Routes
const authRoutes = require('./routes/authRoutes');
const mediaRoutes = require('./routes/mediaRoutes');

// Init
dotenv.config();
const app = express();
connectDB();

// Middleware
app.use(cors());
app.use(express.json()); // handles JSON requests
app.use(express.urlencoded({ extended: true })); // handles URL-encoded form submissions

// Static folder for serving uploaded files
app.use('/uploads', express.static('uploads'));

// Routes
app.use('/auth', authRoutes);
app.use('/media', mediaRoutes);

// Base route
app.get('/', (req, res) => {
  res.send('🎉 Welcome to the Polimart API!');
});

// Centralized error handler
app.use(errorHandler);

module.exports = app;

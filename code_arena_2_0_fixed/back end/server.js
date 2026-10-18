require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const connectDB = require('./config/db');

// Initialize app
const app = express();

// Connect Database (auto-seeds questions when the collection is empty)
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Fail fast with a clear message while the database is not connected
app.use('/api', (req, res, next) => {
  if (mongoose.connection.readyState !== 1) {
    return res.status(503).json({
      message: 'Database not connected. Start MongoDB (or set MONGODB_URI in back end/.env) and check the backend terminal.',
    });
  }
  next();
});

// Define Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/questions', require('./routes/questions'));
app.use('/api/submissions', require('./routes/submissions'));

// Basic Health Check Route
app.get('/', (req, res) => {
  const states = ['disconnected', 'connected', 'connecting', 'disconnecting'];
  res.send(`CodeArena AI API is running... (database: ${states[mongoose.connection.readyState]})`);
});

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

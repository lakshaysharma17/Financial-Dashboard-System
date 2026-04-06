const express = require('express');
const cors = require('cors');
const { errorHandler, notFound } = require('./middlewares/error');

// Route imports
const indexRoutes = require('./routes/indexRoutes');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check route
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Financial Records API is running',
    version: '1.0.0',
  });
});

app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'API is healthy',
    timestamp: new Date().toISOString(),
  });
});

// API Routes
app.use('/api', indexRoutes);


// Error Handling
app.use(notFound);
app.use(errorHandler);

module.exports = app;

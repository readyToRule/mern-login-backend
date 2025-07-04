const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// CORS setup - SIMPLE AND BULLETPROOF
const corsOptions = {
  origin: [
    "http://localhost:3000",
    "https://mern-food-client.vercel.app"
  ],
  credentials: true
};
app.use(cors(corsOptions));

// Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Import and use your routes
const authRoutes = require('./routes/auth');
const dishRoutes = require('./routes/dishes');
app.use('/api', authRoutes);
app.use('/api', dishRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

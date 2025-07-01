const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// CORS options: allow both local frontend and your deployed Vercel frontend
const corsOptions = {
  origin: [
    "http://localhost:3000", // Local React for development
    "https://mern-login-frontend-f6xac5k05-shiv-dutt-dwivedis-projects.vercel.app" // <-- Your deployed Vercel frontend URL
  ],
  credentials: true
};
app.use(cors(corsOptions));

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB Connected')).catch(console.error);

// Import routes
const userRoutes = require('./routes/users');
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

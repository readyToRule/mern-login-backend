const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// CORS options: allow both local frontend and deployed frontend (replace with your real URL when deployed)
const corsOptions = {
  origin: [
    "http://localhost:3000", // Local React
    "https://mern-login-frontend.vercel.app" // <--- Replace with your actual deployed frontend URL when you deploy!
  ],
  credentials: true
};
app.use(cors(corsOptions));
// If not deployed yet, you can temporarily use this:
// app.use(cors({ origin: "*" }));

app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB Connected')).catch(console.error);

// Import routes
const userRoutes = require('./routes/users');
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

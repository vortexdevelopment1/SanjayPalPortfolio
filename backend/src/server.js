const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

const path = require('path');
dotenv.config({ path: path.join(__dirname, '../.env') });

const app = express();

// Prevent CORS caching issues (MUST be before cors middleware to apply to OPTIONS preflight)
app.use((req, res, next) => {
  res.header('Vary', 'Origin');
  res.header('Cache-Control', 'no-cache, no-store, must-revalidate');
  next();
});

// CORS
app.use(cors({
  origin: true,
  credentials: true
}));

// Body parser
app.use(express.json());

// Serve static files from uploads directory
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/projects', require('./routes/projectRoutes'));
app.use('/api/contact', require('./routes/contactRoutes'));

// Health check
app.get('/', (req, res) => res.json({ message: 'Portfolio API is running' }));

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});

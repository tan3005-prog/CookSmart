// server.js
require('dotenv').config(); // load .env
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.use(express.static(__dirname)); // serve your static files

const MONGO_URI = process.env.MONGO_URI;
if (!MONGO_URI) {
  console.error('MONGO_URI not set in .env');
  process.exit(1);
}

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch(err => {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  });

// mount authentication router
try {
  const authRouter = require('./api/auth');
  app.use('/api/auth', authRouter);
  console.log('✅ Auth router loaded successfully');
} catch (e) {
  console.error('❌ Error loading ./api/auth:', e.message);
  console.error(e.stack);
}

// mount routers if present
try {
  const recipesRouter = require('./api/recipes');
  app.use('/api/recipes', recipesRouter);
} catch (e) {
  console.warn('Could not load ./api/recipes. Falling back to a simple mock route.');
  app.get('/api/recipes', (req, res) => {
    const recipes = [
      { _id: '1', name: 'Tomato Pasta', ingredients: ['tomato','pasta','garlic'], time:20 },
      { _id: '2', name: 'Egg Fried Rice', ingredients: ['rice','egg','soy sauce'], time:15 }
    ];
    res.json(recipes);
  });
}

try {
  const searchRouter = require('./api/search');
  app.use('/api/search', searchRouter);
} catch (e) {
  console.warn('Could not load ./api/search. Search routes will be unavailable.');
}

app.get('/health', (req, res) => res.json({ status: 'ok', message: 'Server is running' }));

// Test API endpoints
app.get('/api/test', (req, res) => res.json({ success: true, message: 'API is working' }));

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'discover.html')));

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));

async function shutdown() {
  console.log('Shutting down server...');
  try { await mongoose.disconnect(); } catch (e) { console.warn(e.message); }
  server.close(() => process.exit(0));
}

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
process.on('unhandledRejection', (r) => console.error('Unhandled Rejection:', r));

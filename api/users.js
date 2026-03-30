// api/users.js
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/User');
const Recipe = require('../models/Recipe');

// GET /api/users/:id/saved - return saved recipes populated
router.get('/:id/saved', async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid user id' });
    }

    const user = await User.findById(id).populate({ path: 'savedRecipes' }).lean();
    if (!user) return res.status(404).json({ message: 'User not found' });

  // Also include a normalized list of IDs as strings to make client matching robust
  const savedArr = user.savedRecipes || [];
  const savedIds = savedArr.map(r => String((r && (r._id || r.id)) || r));
  res.json({ success: true, saved: savedArr, savedIds });
  } catch (err) {
    console.error('GET /api/users/:id/saved error:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// GET /api/users/:id/likes - return liked recipes populated
router.get('/:id/likes', async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid user id' });
    }

    const user = await User.findById(id).populate({ path: 'likedRecipes' }).lean();
    if (!user) return res.status(404).json({ message: 'User not found' });

  const likedArr = user.likedRecipes || [];
  const likedIds = likedArr.map(r => String((r && (r._id || r.id)) || r));
  res.json({ success: true, liked: likedArr, likedIds });
  } catch (err) {
    console.error('GET /api/users/:id/likes error:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// PUT /api/users/:id - update allowed personal fields on the user
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid user id' });
    }

  // Only allow a small set of updatable fields from the client
  const allowed = ['name', 'email', 'contactNumber'];
    const updates = {};
    allowed.forEach((key) => {
      if (Object.prototype.hasOwnProperty.call(req.body, key)) {
        updates[key] = req.body[key];
      }
    });

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({ message: 'No updatable fields provided' });
    }

    const user = await User.findByIdAndUpdate(id, updates, { new: true }).select('-password').lean();
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json({ success: true, user });
  } catch (err) {
    console.error('PUT /api/users/:id error:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;

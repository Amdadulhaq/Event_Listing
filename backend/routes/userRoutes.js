const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Event = require('../models/Event');
const auth = require('../middleware/authMiddleware');

// Save event
router.post('/save/:eventId', auth, async (req, res) => {
  const user = await User.findById(req.user);
  if (!user.savedEvents.includes(req.params.eventId)) {
    user.savedEvents.push(req.params.eventId);
    await user.save();
  }
  res.json(user.savedEvents);
});

// Unsave event
router.post('/unsave/:eventId', auth, async (req, res) => {
  const user = await User.findById(req.user);
  user.savedEvents = user.savedEvents.filter(id => id.toString() !== req.params.eventId);
  await user.save();
  res.json(user.savedEvents);
});

// Get saved events
router.get('/saved', auth, async (req, res) => {
  const user = await User.findById(req.user).populate('savedEvents');
  res.json(user.savedEvents);
});

module.exports = router;

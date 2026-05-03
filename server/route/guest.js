const express = require('express');
const router  = express.Router();
const Guest   = require('../models/guest');

// Register a new guest
router.post('/register', async (req, res) => {
  try {
    const newGuest    = new Guest(req.body);
    const savedGuest  = await newGuest.save();
    res.status(201).json(savedGuest);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get all guests
router.get('/all', async (req, res) => {
  try {
    const guests = await Guest.find();
    res.json(guests);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
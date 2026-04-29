const express = require('express');
const router = express.Router();
const Guest = require('../models/guest');

// This responds to POST http://localhost:8080/api/guests/register
router.post('/register', async (req, res) => {
    try {
        const newGuest = new Guest(req.body);
        const savedGuest = await newGuest.save();
        res.status(201).json(savedGuest);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
const express = require('express');
const router = express.Router();
const Room = require('../models/room');

// POST: Add a new room (Inventory Management)
router.post('/add', async (req, res) => {
    try {
        const room = new Room(req.body);
        const savedRoom = await room.save();
        res.status(201).json(savedRoom);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// GET: Availability Dashboard (Real-time tracking)
router.get('/all', async (req, res) => {
    try {
        const rooms = await Room.find();
        res.json(rooms);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
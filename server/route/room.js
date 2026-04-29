const express = require('express');
const router = express.Router();
const Room = require('../models/room');

// POST: Add a new room to inventory
router.post('/add', async (req, res) => {
    try {
        const room = new Room(req.body);
        await room.save();
        res.status(201).json({ message: "Room added successfully", room });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// GET: View all rooms (Availability Dashboard logic)
router.get('/all', async (req, res) => {
    const rooms = await Room.find();
    res.json(rooms);
});

module.exports = router;
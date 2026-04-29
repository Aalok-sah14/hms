const express = require('express');
const router = express.Router();
const Booking = require('../models/booking');
const Room = require('../models/room'); // Needed to update status

// POST: Front Desk Check-in
router.post('/checkin', async (req, res) => {
    try {
        const { guest, room, checkIn } = req.body;

        // 1. Create the new booking
        const booking = new Booking({ guest, room, checkIn });
        await booking.save();

        // 2. Update Room status to 'Occupied' (Phase 2 Requirement)
        await Room.findByIdAndUpdate(room, { status: 'Occupied' });

        res.status(201).json({ 
            message: "Check-in successful! Room status updated to Occupied.", 
            booking 
        });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;
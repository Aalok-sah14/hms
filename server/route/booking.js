const express  = require('express');
const router   = express.Router();
const Booking  = require('../models/booking');
const Room     = require('../models/room');

// Check-in
router.post('/checkin', async (req, res) => {
  try {
    const { guest, room, checkIn } = req.body;

    const booking = new Booking({ guest, room, checkIn });
    await booking.save();

    await Room.findByIdAndUpdate(room, { status: 'Occupied' });

    res.status(201).json({ message: 'Check-in successful! Room status updated to Occupied.', booking });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Check-out
router.patch('/checkout/:bookingId', async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.bookingId);
    if (!booking) return res.status(404).json({ message: 'Booking not found' });

    booking.checkOut = new Date();
    await booking.save();

    await Room.findByIdAndUpdate(booking.room, { status: 'Available' });

    res.json({ message: 'Check-out successful! Room is now Available.', booking });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all bookings
router.get('/all', async (req, res) => {
  try {
    const bookings = await Booking.find().populate('guest').populate('room');
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//total amount
router.patch('/checkout/:bookingId', async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.bookingId);
    if (!booking) return res.status(404).json({ message: 'Booking not found' });

    booking.checkOut = new Date();

    // ← ADD THIS: calculate and save total
    const { generateInvoice } = require('../models/billing');
    const invoice = await generateInvoice(req.params.bookingId);
    booking.totalAmount = invoice.grandTotal;

    await booking.save();
    await Room.findByIdAndUpdate(booking.room, { status: 'Available' });

    res.json({ message: 'Check-out successful!', booking, invoice });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
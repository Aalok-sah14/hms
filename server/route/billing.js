const express  = require('express');
const router   = express.Router();
const { ServiceCharge, generateInvoice } = require('../models/billing');

// Add a service charge
router.post('/add-service', async (req, res) => {
  try {
    const charge      = new ServiceCharge(req.body);
    const savedCharge = await charge.save();
    res.status(201).json({ message: 'Service charge added', charge: savedCharge });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Generate invoice for a booking
router.get('/invoice/:bookingId', async (req, res) => {
  try {
    const invoice = await generateInvoice(req.params.bookingId);
    res.json(invoice);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
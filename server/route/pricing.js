const express     = require('express');
const router      = express.Router();
const PricingRate = require('../models/pricing');

// Add a pricing rate
router.post('/add', async (req, res) => {
  try {
    const rate      = new PricingRate(req.body);
    const savedRate = await rate.save();
    res.status(201).json({ message: 'Pricing rate added', rate: savedRate });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all pricing rates
router.get('/all', async (req, res) => {
  try {
    const rates = await PricingRate.find();
    res.json(rates);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Toggle active/inactive
router.patch('/toggle/:id', async (req, res) => {
  try {
    const rate = await PricingRate.findById(req.params.id);
    if (!rate) return res.status(404).json({ message: 'Rate not found' });
    rate.isActive = !rate.isActive;
    await rate.save();
    res.json({ message: 'Pricing rate updated', rate });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
const express = require('express');
const router = express.Router();

// Add Service Charge (F&B, Laundry, Minibar)
router.post('/add-service', async (req, res) => {
    // Billing Logic: (Room Rate * Days) + Σ(Extra Services) [cite: 21]
    res.send("Extra Service Billing Route");
});

// Generate Consolidated Invoice [cite: 18]
router.get('/invoice/:bookingId', async (req, res) => {
    res.send("Generate Total Bill");
});

module.exports = router;
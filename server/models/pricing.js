const mongoose = require('mongoose');

const pricingRateSchema = new mongoose.Schema({
  rateName:       { type: String, required: true },
  roomClass:      { type: String, enum: ['Standard', 'Deluxe', 'Premium'], required: true },
  baseMultiplier: { type: Number, default: 1.0 },
  startDate:      { type: Date, required: true },
  endDate:        { type: Date, required: true },
  isActive:       { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('PricingRate', pricingRateSchema);
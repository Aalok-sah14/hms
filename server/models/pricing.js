const pricingRateSchema = new mongoose.Schema({
  rateName: { type: String, required: true }, // e.g., "Summer Special", "New Year Eve"
  roomClass: { type: String, enum: ['Standard', 'Deluxe', 'Premium'], required: true }, 
  
  // Pricing Multiplier
  baseMultiplier: { type: Number, default: 1.0 }, // e.g., 1.5 would increase price by 50%
  
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  isActive: { type: Boolean, default: true }
});
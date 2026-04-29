const bookingSchema = new mongoose.Schema({
  guest: { type: mongoose.Schema.Types.ObjectId, ref: 'Guest', required: true },
  room: { type: mongoose.Schema.Types.ObjectId, ref: 'Room', required: true },
  checkIn: { type: Date, required: true },
  checkOut: { type: Date }, // Set during Check-out workflow [cite: 11]
  status: { type: String, enum: ['Active', 'Completed', 'Cancelled'], default: 'Active' }
}, { toJSON: { virtuals: true } });

// Calculation of Stay Duration (Days) 
bookingSchema.virtual('stayDuration').get(function() {
  if (!this.checkOut) return 0;
  const diffTime = Math.abs(this.checkOut - this.checkIn);
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
});
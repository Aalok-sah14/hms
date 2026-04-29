const mongoose = require('mongoose'); // <--- ADD THIS LINE

const bookingSchema = new mongoose.Schema({
  guest: { type: mongoose.Schema.Types.ObjectId, ref: 'Guest', required: true },
  room: { type: mongoose.Schema.Types.ObjectId, ref: 'Room', required: true },
  checkIn: { type: Date, required: true },
  checkOut: { type: Date },
  totalAmount: { type: Number, default: 0 }
}, { timestamps: true });

// Virtual for Stay Duration
bookingSchema.virtual('durationDays').get(function() {
  if (!this.checkOut) return null;
  const diffTime = Math.abs(this.checkOut - this.checkIn);
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
});

module.exports = mongoose.model('Booking', bookingSchema);
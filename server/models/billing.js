const mongoose = require('mongoose');
const Booking  = require('./booking');

const serviceChargeSchema = new mongoose.Schema({
  booking:     { type: mongoose.Schema.Types.ObjectId, ref: 'Booking', required: true },
  serviceType: { type: String, enum: ['Food & Beverages', 'Laundry', 'Drinks & Minibar'], required: true },
  amount:      { type: Number, required: true },
  description: { type: String }
}, { timestamps: true });

const ServiceCharge = mongoose.model('ServiceCharge', serviceChargeSchema);

const generateInvoice = async (bookingId) => {
  const booking  = await Booking.findById(bookingId).populate('room');
  if (!booking) throw new Error('Booking not found');

  const services      = await ServiceCharge.find({ booking: bookingId });
  const roomTotal     = booking.room.basePrice * (booking.durationDays || 0);
  const servicesTotal = services.reduce((sum, item) => sum + item.amount, 0);

  return {
    roomTotal,
    servicesTotal,
    grandTotal: roomTotal + servicesTotal
  };
};

module.exports = { ServiceCharge, generateInvoice };
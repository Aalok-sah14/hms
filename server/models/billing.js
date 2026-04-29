const serviceChargeSchema = new mongoose.Schema({
  booking: { type: mongoose.Schema.Types.ObjectId, ref: 'Booking', required: true },
  serviceType: { type: String, enum: ['Food & Beverages', 'Laundry', 'Drinks & Minibar'], required: true },
  amount: { type: Number, required: true },
  description: String
});

// Final Billing Logic: (Room Rate * Days) + Σ(Extra Services) [cite: 12, 18, 21]
const generateInvoice = async (bookingId) => {
  const booking = await Booking.findById(bookingId).populate('room');
  const services = await ServiceCharge.find({ booking: bookingId });
  
  const roomTotal = booking.room.basePrice * booking.stayDuration;
  const servicesTotal = services.reduce((sum, item) => sum + item.amount, 0);
  
  return roomTotal + servicesTotal;
};
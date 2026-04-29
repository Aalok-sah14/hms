const roomSchema = new mongoose.Schema({
  roomNumber: { type: String, required: true, unique: true },
  bedType: { type: String, enum: ['Single Bed', 'Double Bed', 'Family Room'], required: true },
  class: { type: String, enum: ['Standard', 'Deluxe', 'Premium'], required: true },
  basePrice: { type: Number, required: true },
  status: { 
    type: String, 
    enum: ['Available', 'Occupied', 'Maintenance'], 
    default: 'Available' // Supports the Availability Dashboard [cite: 8, 16]
  }
});
const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  roomNumber:  { type: String, required: true, unique: true },
  type:        { type: String, enum: ['Single', 'Double', 'Suite'], required: true },
  roomClass:   { type: String, enum: ['Standard', 'Deluxe', 'Premium'], required: true },
  basePrice:   { type: Number, required: true },
  status:      { type: String, enum: ['Available', 'Occupied', 'Maintenance'], default: 'Available' },
  description: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Room', roomSchema);
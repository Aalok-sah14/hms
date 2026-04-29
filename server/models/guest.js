const mongoose = require('mongoose');

const guestSchema = new mongoose.Schema({
  // Required Personal Details [cite: 3]
  name: { type: String, required: true },
  address: { type: String, required: true },
  phone: { type: String, required: true },
  
  // Demographics for automatic Age calculation [cite: 5]
  dob: { type: Date, required: true },
  
  // Verification: Photo of ID storage [cite: 4]
  idPhotoUrl: { type: String, required: true } 
}, { 
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Automatic Age calculation logic [cite: 5]
guestSchema.virtual('age').get(function() {
  if (!this.dob) return null;
  const diff = Date.now() - this.dob.getTime();
  const ageDate = new Date(diff);
  return Math.abs(ageDate.getUTCFullYear() - 1970);
});

module.exports = mongoose.model('Guest', guestSchema);
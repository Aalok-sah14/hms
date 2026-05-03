const mongoose = require('mongoose');

const guestSchema = new mongoose.Schema({
  name:       { type: String, required: true },
  address:    { type: String, required: true },
  phone:      { type: String, required: true },
  dob:        { type: Date,   required: true },
  idPhotoUrl: { type: String, required: true }
}, {
  timestamps: true,
  toJSON:   { virtuals: true },
  toObject: { virtuals: true }
});

guestSchema.virtual('age').get(function () {
  if (!this.dob) return null;
  const diff    = Date.now() - this.dob.getTime();
  const ageDate = new Date(diff);
  return Math.abs(ageDate.getUTCFullYear() - 1970);
});

module.exports = mongoose.model('Guest', guestSchema);
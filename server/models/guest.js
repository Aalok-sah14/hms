const guestSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  phone: { type: String, required: true },
  dob: { type: Date, required: true },
  idPhotoUrl: { type: String, required: true }, // URL to stored image 
}, { 
  timestamps: true,
  toJSON: { virtuals: true } 
});

// Automatic Age Calculation [cite: 5, 20]
guestSchema.virtual('age').get(function() {
  const diff = Date.now() - this.dob.getTime();
  const ageDate = new Date(diff);
  return Math.abs(ageDate.getUTCFullYear() - 1970);
});
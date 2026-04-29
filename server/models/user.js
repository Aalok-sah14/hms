const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // Should be hashed
  role: { type: String, enum: ['Admin', 'FrontDesk'], default: 'FrontDesk' }
}, { timestamps: true });
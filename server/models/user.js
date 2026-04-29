const mongoose = require('mongoose'); // Add this line to fix the error

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // Should be hashed for security 
  role: { 
    type: String, 
    enum: ['Admin', 'FrontDesk'], 
    default: 'FrontDesk' 
  }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
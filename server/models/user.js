const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ['Admin', 'FrontDesk'],
    default: 'FrontDesk'
  }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
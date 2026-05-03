const mongoose = require('mongoose');

async function connectDb() {
  await mongoose.connect('mongodb://127.0.0.1:27017/hmsdb');
  console.log('Connected to MongoDB');
}

module.exports = connectDb;
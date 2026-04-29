const mongoose = require('mongoose'); // <--- THIS LINE IS REQUIRED

async function connectDb() {
  await mongoose.connect('mongodb://127.0.0.1:27017/tripaidb');
  console.log('Connected to MongoDB');
}

module.exports = connectDb;
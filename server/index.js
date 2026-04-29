const express = require('express');
const app = express();
const port = 8080;

const connectDb = require('./db/connect'); 
const authRoutes = require('./route/auth');
const guestRoutes = require('./route/guest'); 
const roomRoutes = require('./route/room');      // <--- Check if file exists
const bookingRoutes = require('./route/booking'); // <--- Check if file exists

app.use(express.json());

connectDb().catch(err => console.log("DB Connection Error: ", err));

app.use('/api/auth', authRoutes);
app.use('/api/guests', guestRoutes); 
app.use('/api/rooms', roomRoutes);       
app.use('/api/bookings', bookingRoutes); 

app.listen(port, () => {
  console.log(`🚀 HMS Server listening on port ${port}`);
});
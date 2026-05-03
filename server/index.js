require('dotenv').config();

const express           = require('express');
const app               = express();
const port              = 8080;

const connectDb         = require('./db/connect');
const authRoutes        = require('./route/auth');
const userRoutes        = require('./route/user');
const guestRoutes       = require('./route/guest');
const roomRoutes        = require('./route/room');
const bookingRoutes     = require('./route/booking');
const billingRoutes     = require('./route/billing');
const maintenanceRoutes = require('./route/maintenance');

app.use(express.json());

connectDb().catch(err => console.log('DB Connection Error:', err));

app.use('/api/auth',        authRoutes);
app.use('/api/users',       userRoutes);
app.use('/api/guests',      guestRoutes);
app.use('/api/rooms',       roomRoutes);
app.use('/api/bookings',    bookingRoutes);
app.use('/api/billing',     billingRoutes);
app.use('/api/maintenance', maintenanceRoutes);

app.listen(port, () => {
  console.log(`🚀 HMS Server listening on port ${port}`);
});
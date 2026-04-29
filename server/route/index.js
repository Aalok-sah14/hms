// Import Route Files
const authRoute = require('./route/auth');
const guestRoute = require('./route/guest');
const bookingRoute = require('./route/booking');
const billingRoute = require('./route/billing');

// Use Routes
app.use('/api/auth', authRoute);
app.use('/api/guest', guestRoute);
app.use('/api/booking', bookingRoute);
app.use('/api/billing', billingRoute);
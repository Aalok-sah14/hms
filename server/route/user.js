const express = require('express');
const router = express.Router();
const { registerNewUser, loginUser } = require('../controller/user');

// Register new user
router.post('/register', registerNewUser);

// User login
router.post('/login', loginUser);

module.exports = router;
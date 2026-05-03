const bcrypt = require('bcrypt');
const jwt    = require('jsonwebtoken');
const User   = require('../models/user');

const registerNewUser = async (req, res) => {
  try {
    // Step 1: Check if username already exists
    const userExists = await User.exists({ username: req.body.username });
    if (userExists) {
      return res.status(400).json({ message: 'Username already registered' });
    }

    // Step 2: Hash the password
    req.body.password = await bcrypt.hash(req.body.password, 10);

    // Step 3: Create the user
    const user = await User.create(req.body);
    res.status(201).json({ message: 'User created successfully', user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const loginUser = async (req, res) => {
  try {
    // Step 1: Find user by username
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      return res.status(400).json({ message: 'Username does not exist' });
    }

    // Step 2: Check password
    const isMatched = await bcrypt.compare(req.body.password, user.password);
    if (!isMatched) {
      return res.status(400).json({ message: 'Invalid password' });
    }

    // Step 3: Sign token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.json({ message: 'Login successful', token, user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { registerNewUser, loginUser };
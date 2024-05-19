const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const authController = require('../controllers/authController');


const jwtSecret = 'your_jwt_secret_key';

// Register
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  console.log('Register request received with data:', req.body);

  // Basic validation
  if (!name || !email || !password) {
    console.log('Missing fields');
    return res.status(400).json({ message: 'Please enter all fields' });
  }

  try {
    let user = await User.findOne({ email });
    if (user) {
      console.log('User already exists');
      return res.status(400).json({ message: 'User already exists' });
    }

    user = new User({
      name,
      email,
      password,
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    console.log('User registered successfully');
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error('Server error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});


// Login route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Please enter all fields' });
  }

  try {
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check if password is correct
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Create and sign JWT token
    const token = jwt.sign({ id: user._id }, jwtSecret, { expiresIn: '1h' });

    // Send token to client
    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});


module.exports = router;

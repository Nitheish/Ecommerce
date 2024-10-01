const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Function to generate a JWT token
const generateToken = (user) => {
  return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

// Signup function
async function signup(req, res) {
  const { name, email, password } = req.body;
  try {
    // Create new user
    const user = new User({ name, email, password });
    await user.save();

    // Respond with success message and token
    res.status(200).json({
      message: 'User registered successfully!',
    
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

// Login function
async function login(req, res) {
  const { email, password } = req.body;
  try {
    // Check if the user exists by email
    const user = await User.findOne({ email });

    // Validate the password (assuming `matchPassword` is a method in the User model)
    if (user && (await user.matchPassword(password))) {
      // Generate JWT token for the user
      const token = generateToken(user);

      // Respond with success message, token, and user details
      return res.status(200).json({
        message: 'Login successful!',
        success: true,
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
        },
      });
    } else {
      // If user or password is invalid
      return res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    // Handle any other errors during the process
    return res.status(400).json({ error: error.message });
  }
}

module.exports = {
  signup,
  login,
};

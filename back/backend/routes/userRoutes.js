// routes/userRoutes.js
const express = require('express');
const User = require('../models/userModel'); // User model
const bcrypt = require('bcryptjs');
const router = express.Router();

// Register a new user (Create user)
router.post('/', async (req, res) => {
  const { name, title, role, email, password } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = new User({
      name,
      title,
      role,
      email,
      password,
    });

    await user.save();
    res.status(201).json({
      _id: user._id,
      name: user.name,
      title: user.title,
      role: user.role,
      email: user.email,
      isAdmin: user.isAdmin,
      isActive: user.isActive,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error creating user' });
  }
});

// Get all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users' });
  }
});

// Update user by ID
router.put('/:id', async (req, res) => {
  const { name, title, role, email, password, isActive, isAdmin } = req.body;
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.name = name || user.name;
    user.title = title || user.title;
    user.role = role || user.role;
    user.email = email || user.email;
    user.password = password || user.password;
    user.isActive = isActive ?? user.isActive;
    user.isAdmin = isAdmin ?? user.isAdmin;

    await user.save();
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error updating user' });
  }
});

// Delete user by ID
router.delete('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    await user.remove();
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user' });
  }
});

module.exports = router;

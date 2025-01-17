const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes'); // Task routes
const userRoutes = require('./routes/userRoutes'); // User routes (Add this line)
const Task = require('./models/taskModel'); // Task model
const User = require('./models/userModel'); // User model (Add this line)

dotenv.config();

// Log MONGO_URI to check if it's loaded correctly
console.log(process.env.MONGO_URI); // Make sure MONGO_URI is defined

// Connect to MongoDB
connectDB();

const app = express();

// Middleware setup
app.use(cors());
app.use(express.json()); // Parse incoming JSON requests

app.use('/api/auth', authRoutes); // Add auth routes
// Routes
app.use('/api', taskRoutes); // Task API routes
app.use('/api/users', userRoutes); // User API routes (Add this line)

// Active and deactive user
app.patch("/api/users/:id/status", async (req, res) => {
  const userId = req.params.id;
  const { isActive } = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { isActive },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Failed to update user status" });
  }
});

// Update user 
app.patch("/api/users/:id", async (req, res) => {
  const userId = req.params.id;
  const { name, title, email, role, isActive } = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { name, title, email, role, isActive },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(updatedUser); // Return updated user data
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Failed to update user" });
  }
});

// Example endpoint to fetch tasks
app.get('/api/tasks', async (req, res) => {
  try {
    const tasks = await Task.find(); // Assuming Task is your MongoDB model
    res.json(tasks); // Send tasks as JSON response
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching tasks' });
  }
});

// Error-handling middleware
app.use((err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

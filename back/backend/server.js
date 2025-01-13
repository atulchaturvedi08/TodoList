const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const taskRoutes = require('./routes/taskRoutes'); // Task routes
const Task = require('./models/taskModel'); // Task model

// Load environment variables from .env file
dotenv.config();

// Log MONGO_URI to check if it's loaded correctly
console.log(process.env.MONGO_URI);  // Make sure MONGO_URI is defined

// Connect to MongoDB
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', taskRoutes);

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

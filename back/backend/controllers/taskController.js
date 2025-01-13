const Task = require('../models/taskModel');

// Create a new task
const createTask = async (req, res) => {
  const { title, team, stage, priority, date } = req.body;
  let assets = [];

  if (req.files) {
    assets = req.files.map(file => file.path);
  }

  try {
    const newTask = new Task({
      title,
      team,
      stage,
      priority,
      date,
      assets,
    });

    await newTask.save();
    res.status(201).json({ message: 'Task created successfully', task: newTask });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const getTasks = async (req, res) => {
    try {
      const tasks = await Task.find(); // Fetch all tasks from MongoDB
      console.log("Fetched tasks:", tasks); // Debugging statement
      res.json(tasks); // Return tasks as JSON
    } catch (error) {
      console.error("Error fetching tasks:", error); // More detailed error message
      res.status(500).json({ message: "Error fetching tasks" });
    }
  };

module.exports = { createTask, getTasks };

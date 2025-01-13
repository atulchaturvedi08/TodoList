const express = require('express');
const { createTask, getTasks } = require('../controllers/taskController');
const upload = require('../middlewares/uploadMiddleware');

const router = express.Router();

// POST route to create a task with assets
router.post('/task', upload.array('assets', 5), createTask);

// GET route to fetch tasks
router.get('/tasks', getTasks);

module.exports = router;

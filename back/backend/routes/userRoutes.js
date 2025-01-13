import express from 'express';
import { getTasks, createTask, updateTask, deleteTask } from '../controllers/taskController.js';

const router = express.Router();

router.get('/user', getTasks);

const createUser = async () => {
    const user = {
      name: "John Doe",
      title: "Software Engineer",
      role: "User",
      email: "john.doe@example.com",
      password: "securepassword",
    };
  
    try {
      const response = await fetch("http://localhost:5000/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
  
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
  
      const data = await response.json();
      console.log("User Created:", data);
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };
  
  createUser();
  
router.put('/user/:id', updateTask);
router.delete('/user/:id', deleteTask);

export default router;

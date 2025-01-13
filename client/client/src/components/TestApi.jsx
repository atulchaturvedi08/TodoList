import React, { useState, useEffect } from "react";

const TestApi = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch tasks when component mounts
  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true);
      try {
        const response = await fetch("http://localhost:5000/api/tasks");
        if (!response.ok) {
          throw new Error("Failed to fetch tasks");
        }
        const data = await response.json();
        console.log(data); // Check if the data is being received
        setTasks(data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []); // Empty dependency array to call this effect once on mount

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Tasks</h1>
      <ul>
        {tasks.map((task, index) => (
          <li key={index}>{task.name}</li> // Adjust this to match the actual task structure
        ))}
      </ul>
    </div>
  );
};

export default TestApi;

import React, { useState, useEffect } from "react";

const TestApi = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch tasks when the component mounts
  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch("http://localhost:5000/api/tasks");
        if (!response.ok) {
          throw new Error("Failed to fetch tasks");
        }
        const data = await response.json();
        console.log(data); // Check if the data is being received
        setTasks(data);
      } catch (error) {
        setError(error.message);
        console.error("Error fetching tasks:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []); // Empty dependency array to call this effect once on mount

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl text-red-500">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Tasks</h1>
      {tasks.length > 0 ? (
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-4 py-2 text-left">Task Title</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Priority</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Created At</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Assets</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Team</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task, index) => (
              <tr key={task._id} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                <td className="border border-gray-300 px-4 py-2">{task.title}</td>
                <td className="border border-gray-300 px-4 py-2">{task.priority}</td>
                <td className="border border-gray-300 px-4 py-2">
                  {new Date(task.createdAt).toLocaleDateString()}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {task.assets && task.assets.length > 0 ? (
                    <ul>
                      {task.assets.map((asset, assetIndex) => (
                        <li key={assetIndex}>
                          <a
                            href={`http://localhost:5000/${asset}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600"
                          >
                            Asset {assetIndex + 1}
                          </a>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    "No assets"
                  )}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {task.team && task.team.length > 0 ? (
                    <ul>
                      {JSON.parse(task.team).map((memberId, memberIndex) => (
                        <li key={memberIndex}>{memberId}</li> // Replace with actual member details if available
                      ))}
                    </ul>
                  ) : (
                    "No team assigned"
                  )}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <button className="text-blue-500 mr-4">Edit</button>
                  <button className="text-red-500">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="text-xl text-center">No tasks found</div>
      )}
    </div>
  );
};

export default TestApi;

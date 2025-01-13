import React from "react";
import TaskCard from "./TaskCard";

const BoardView = ({ tasks }) => {
  if (!tasks || tasks.length === 0) {
    return <div>No tasks available.</div>;
  }

  return (
    <div className="w-full py-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 2xl:gap-10">
      {tasks.map((task, index) => (
        <TaskCard key={task._id} task={task} />  // Ensure 'task._id' is unique for each task
      ))}
    </div>
  );
};


export default BoardView;

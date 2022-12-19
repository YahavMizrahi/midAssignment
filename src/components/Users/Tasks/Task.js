import React from "react";
import "./Tasks.css";

function Task({ task, markTaskDone }) {
  return (
    <div
      className="task"
      style={{
        border: `solid 2px ${task.completed ? "green" : "red"}`,
      }}
    >
      <span style={{ width: "70%" }}>
        <h4> {task.title}</h4>
        {task.completed ? "Completed" : "Uncompleted"}
      </span>
      {!task.completed && (
        <button onClick={() => markTaskDone(task.id)}>Mark Done</button>
      )}
    </div>
  );
}

export default Task;

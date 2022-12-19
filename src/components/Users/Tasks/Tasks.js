import { useState, useEffect } from "react";
import AddTask from "./AddTask";
import Task from "./Task";
import "./Tasks.css";

function Tasks({ userSelectedId, tasks, markTaskDone, addTask, deleteFlag }) {
  const [addTaskFlag, setAddTaskFlag] = useState(false);

  useEffect(() => {
    setAddTaskFlag(false);
  }, [userSelectedId]);

  return !addTaskFlag ? (
    <div className="tasks">
      {userSelectedId !== 0 && !deleteFlag && (
        <nav className="rightNav">
          <h3>Tasks User ID: {userSelectedId} </h3>
          <button onClick={() => setAddTaskFlag(true)}>Add Task</button>
        </nav>
      )}
      <div className="tasks-s">
        {tasks.map(
          (task) =>
            task.userId === userSelectedId && (
              <Task key={task.id} task={task} markTaskDone={markTaskDone} />
            )
        )}
      </div>
    </div>
  ) : (
    <AddTask
      tasks={tasks}
      addTask={addTask}
      userSelectedId={userSelectedId}
      show={(show) => setAddTaskFlag(show)}
    />
  );
}

export default Tasks;

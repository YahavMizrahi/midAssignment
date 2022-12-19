import { useState } from "react";
import Form from "../../Form/Form";
import { getFreeId } from "../../../utils/utils";

function AddTask({ tasks, addTask, userSelectedId, show }) {
  const [newTask, setNewTask] = useState({});

  const changeHandler = (e) => {
    setNewTask({
      ...newTask,
      id: getFreeId(tasks),
      userId: userSelectedId,
      completed: false,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    addTask(newTask);
    show(false);
    e.target.reset();
  };

  const cancelAddTask = () => {
    show(false);
  };

  return true ? (
    <Form>
      <h3 className="header">Add New Task to User: {userSelectedId}</h3>

      <form
        className="addForm"
        onChange={changeHandler}
        onSubmit={submitHandler}
      >
        <span
          style={{ display: "flex", flexDirection: "column ", width: "60%" }}
        >
          <label>Title: </label>
          <input type={"text"} name={"title"} required></input>
        </span>
        <span>
          <button className="add" type={"submit"}>
            Add Task
          </button>
          <button onClick={cancelAddTask}>Cancel</button>
        </span>
      </form>
    </Form>
  ) : (
    <></>
  );
}

export default AddTask;

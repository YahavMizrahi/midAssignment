import { useState } from "react";
import { getFreeId } from "../../utils/utils";
import Form from "../Form/Form";

function AddUser({ addNewUser, users, show }) {
  const [newUser, setNewUser] = useState({});
  const [valid,setValid]=useState('')

  const changeHandler = (e) => {
    if (e.traget.name == "name")
      setNewUser({
        ...newUser,
        id: getFreeId(users),
        [e.target.name]: e.target.value,
      });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    addNewUser(newUser);
    e.target.reset();
  };

  const cancelAddUser = (e) => {
    show(false);
  };

  return show ? (
    <div className="right">
      <Form>
          <nav className="rightNav">
            <h3 className="header">Add New User</h3>
          </nav>
          <form
            className="addForm "
            onChange={changeHandler}
            onSubmit={submitHandler}
            style={{ width: "30vw" }}
          >
            <span
              style={{
                display: "flex",
                flexDirection: "column ",
                width: "70%",
              }}
            >
              <label>Name: </label>
              <input type={"text"} name={"name"} required></input>

              <label>Email: </label>
              <input type={"email"} name={"email"} required></input>
            </span>
            <span>
              <button type={"submit"}>Add User</button>
              <button onClick={cancelAddUser}>Cancel</button>
            </span>
          </form>
      </Form>
    </div>
  ) : (
    <></>
  );
}

export default AddUser;

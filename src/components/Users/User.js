import { useState, useEffect } from "react";
import "./Users.css";

function User({
  user,
  selectUserHandle,
  selected,
  tasks,
  updateUser,
  deleteUser,
}) {
  const [moreData, setMoreData] = useState(false);
  const [updateUserTemp, setUpdateUser] = useState(user);
  const [disabled, setDisabled] = useState(true);

  const checkAllTasksDone = (userId) =>
    tasks.filter((t) => t.userId === userId && t.completed).length ===
    tasks.filter((t) => t.userId === userId).length;

  const changeHandler = (e) => {
    if (e.target.name === "name")
      setUpdateUser({ ...updateUserTemp, [e.target.name]: e.target.value });
    if (e.target.name === "email")
      setUpdateUser({ ...updateUserTemp, [e.target.name]: e.target.value });
    if (e.target.name === "street")
      setUpdateUser({
        ...updateUserTemp,
        address: { ...updateUserTemp.address, [e.target.name]: e.target.value },
      });
    if (e.target.name === "city")
      setUpdateUser({
        ...updateUserTemp,
        address: { ...updateUserTemp.address, [e.target.name]: e.target.value },
      });
    if (e.target.name === "zipcode")
      setUpdateUser({
        ...updateUserTemp,
        address: { ...updateUserTemp.address, [e.target.name]: e.target.value },
      });
    equalUserData();
  };

  const submitHandler = (e) => {
    e.preventDefault();
    updateUser(updateUserTemp);
  };

  const equalUserData = () => {
    setDisabled(
      !(
        updateUserTemp.name !== user.name ||
        updateUserTemp.email !== user.email ||
        updateUserTemp.address?.street !== user.address?.street ||
        updateUserTemp.address?.city !== user.address?.city ||
        updateUserTemp.address?.zipcode !== user.address?.zipcode
      )
    );
  };

  useEffect(() => {
    equalUserData();
  });

  return (
    <form
      className="userCard"
      onChange={changeHandler}
      onSubmit={submitHandler}
      key={user.id}
      style={{
        borderColor: checkAllTasksDone(user.id) ? " green" : " red",

        background: selected === user.id ? "rgba(255, 166, 0, 0.461)" : null,
      }}
    >
      <div>
        <div
          style={{
            padding: "0px 0px  5px 0px",
            cursor: "pointer",
            background: " rgba(192, 192, 192, 0.742)",

            textAlign: "center",
            borderRadius: "5px",
            padding: "0px",
            color: "black",
            boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
            fontWeight: "700",
          }}
          onClick={() => selectUserHandle(user.id)}
        >
          ID: {user.id}
        </div>
        <span className="userData">
          <label>Name: </label>
          <input
            disabled={selected !== user.id}
            name={"name"}
            type="text"
            defaultValue={user.name}
          />
        </span>

        <span className="userData">
          <label>Email: </label>{" "}
          <input
            disabled={selected !== user.id}
            name="email"
            type="text"
            defaultValue={user.email}
          />
        </span>
        {moreData && (
          <>
            <span className="userData">
              <label>Street:</label>{" "}
              <input
                disabled={selected !== user.id}
                name="street"
                type="text"
                defaultValue={user.address?.street}
              />
            </span>
            <span className="userData">
              <label>City: </label>
              <input
                disabled={selected !== user.id}
                name="city"
                type="text"
                defaultValue={user.address?.city}
              />
            </span>
            <span className="userData">
              <label>Zip Code:</label>{" "}
              <input
                disabled={selected !== user.id}
                name="zipcode"
                type="text"
                defaultValue={user.address?.zipcode}
              />
            </span>
          </>
        )}
      </div>

      <button
        onMouseEnter={() => setMoreData(true)}
        onClick={() => setMoreData(false)}
      >
        {!moreData ? " More Data >>" : "Less Data <<"}
      </button>
      <button className="updateBtn" type="submit" disabled={disabled}>
        Update
      </button>
      <button className="deleteBtn" onClick={() => deleteUser(user.id)}>
        Delete
      </button>
    </form>
  );
}

export default User;

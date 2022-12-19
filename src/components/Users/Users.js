import { useState, useEffect } from "react";
import Search from "../Search/Search";
import User from "./User";
import axios from "axios";
import Tasks from "./Tasks/Tasks";
import Posts from "./Posts/Posts";
import { getAllTasks, getAllPosts } from "../../utils/axios";
import AddUser from "./AddUser";
import "./Users.css";

const urlUser = `https://jsonplaceholder.typicode.com/users/`;
function Users() {
  const [users, setUsers] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [posts, setPosts] = useState([]);
  const [searchInput, setSearch] = useState("");
  const [selectedUser, setSelectedUser] = useState(0);
  const [addUserFlag, setAddUserFlag] = useState(false);
  const [deleteUserFlag, setDeleteUserFlag] = useState(false);

  useEffect(() => {
    const getUsers = async () => {
      let res = await axios.get(urlUser);
      setUsers(res.data);
    };
    getUsers();
    const getTasks = async () => {
      let res = await getAllTasks();
      setTasks(res.data);
    };
    getTasks();
    const getPosts = async () => {
      let res = await getAllPosts();
      setPosts(res.data);
    };
    getPosts();
  }, []);

  const handleChange = (str) => {
    setSearch(str);
  };

  const checkInputSearch = (str) => str.toLowerCase().includes(searchInput);

  const selectUser = (id) => {
    setSelectedUser(id);
    setAddUserFlag(false);
    setDeleteUserFlag(false);
  };

  const markTaskDone = (taskid) => {
    const objIndex = tasks.findIndex((obj) => obj.id === taskid);
    let tempTasks = tasks;
    tempTasks[objIndex].completed = true;
    setTasks([...tempTasks]);
  };

  const updateUser = (upUser) => {
    const objIndex = users.findIndex((obj) => obj.id === upUser.id);
    let tempUsers = users;
    tempUsers[objIndex] = upUser;
    setUsers([...tempUsers]);
  };

  const deleteUser = (id) => {
    setUsers([...users.filter((u) => u.id !== id)]);
    const objIndex = tasks.findIndex((obj) => obj.userId === id);
    let tempTasks = tasks;
    tempTasks[objIndex].completed = true;
    setTasks([...tasks.filter((t) => t.userId !== id)]);
    setPosts([...posts.filter((p) => p.userId !== id)]);
    setDeleteUserFlag(true);
  };

  const addNewUser = (newUser) => {
    setUsers([...users, { ...newUser }]);
  };

  const addTask = (newTask) => {
    setTasks([newTask, ...tasks]);
  };

  const addPost = (newPost) => {
    setPosts([...posts, newPost]);
  };

  return users.length > 0 ? (
    <div className="app">
      <nav className="search nav">
        <Search searchByInput={handleChange} />
      </nav>
      <div className="container">
        <div className="left">
          <nav
              className="header"
            >
              <h3>Users:</h3>
              <button
                className="add"
                onClick={() => {
                  setAddUserFlag(true);
                  setSelectedUser(false);
                }}
              >
                Add User
              </button>
          </nav>

          <div className="users ">
            {users.map(
              (user) =>
                (checkInputSearch(user.name) ||
                  checkInputSearch(user.email)) && (
                  <User
                    deleteUser={deleteUser}
                    updateUser={updateUser}
                    selected={selectedUser}
                    key={user.id}
                    user={user}
                    tasks={tasks}
                    selectUserHandle={selectUser}
                  />
                )
            )}
          </div>
        </div>
        {!addUserFlag ? (
          <div className="right">
            <Tasks
              users={users}
              deleteFlag={deleteUserFlag}
              tasks={tasks}
              userSelectedId={selectedUser}
              markTaskDone={markTaskDone}
              addTask={addTask}
            />
            <Posts
              deleteFlag={deleteUserFlag}
              userSelectedId={selectedUser}
              posts={posts}
              addPost={addPost}
            />
          </div>
        ) : (
          <AddUser
            addNewUser={addNewUser}
            users={users}
            show={(show) => setAddUserFlag(show)}
          />
        )}
      </div>
    </div>
  ) : (
    <></>
  );
}

export default Users;

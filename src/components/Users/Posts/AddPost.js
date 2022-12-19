import { useState } from "react";
import Form from "../../Form/Form";
import { getFreeId } from "../../../utils/utils";
import "./Posts.css";

function AddPost({ posts, addPost, userSelectedId, show }) {
  const [newPost, setNewPost] = useState({});

  const changeHandler = (e) => {
    setNewPost({
      ...newPost,
      id: getFreeId(posts),
      userId: userSelectedId,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    addPost(newPost);
    e.target.reset();
    show(false);
  };

  const cancelAddPost = () => {
    show(false);
  };

  return true ? (
    <Form>
      <h3 className="header">Add New Post to User: {userSelectedId}</h3>
      <form
        className="addForm"
        onChange={changeHandler}
        onSubmit={submitHandler}
      >
        <span
          style={{
            display: "flex",
            flexDirection: "column ",
            width: "70%",
          }}
        >
          <label>Title: </label>
          <input type={"text"} name={"title"} required></input>
          <label style={{ margin: "0 0 5px 0" }}>Body: </label>
          <textarea
            rows={5}
            cols={20}
            type={"text"}
            name={"body"}
            required
          ></textarea>
        </span>
        <div>
          <button className="add" type={"submit"}>
            Add Post
          </button>
          <button onClick={cancelAddPost}>Cancel</button>
        </div>
      </form>
    </Form>
  ) : (
    <></>
  );
}

export default AddPost;

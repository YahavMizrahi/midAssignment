import Post from "./Post";

import { useState, useEffect } from "react";
import AddPost from "./AddPost";
import "./Posts.css";

function Posts({ userSelectedId, posts, addPost, deleteFlag }) {
  const [addPostFlag, setAddPostFlag] = useState(false);

  useEffect(() => {
    setAddPostFlag(false);
  }, [userSelectedId]);

  return !addPostFlag ? (
    <div className="posts">
      {userSelectedId !== 0 && !deleteFlag && (
        <nav className="rightNav">
          <h3>Posts User ID: {userSelectedId}</h3>
          <button onClick={() => setAddPostFlag(true)}>Add Post</button>
        </nav>
      )}
      <div className="posts-s">
        {posts.map(
          (post) =>
            post.userId === userSelectedId && (
              <Post deleteFlag={deleteFlag} post={post} key={post.id} />
            )
        )}
      </div>
    </div>
  ) : (
    <AddPost
      posts={posts}
      addPost={addPost}
      userSelectedId={userSelectedId}
      show={(show) => setAddPostFlag(show)}
    />
  );
}

export default Posts;

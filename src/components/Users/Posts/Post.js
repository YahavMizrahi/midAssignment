function Post({ post }) {
  return (
      <div className="post" key={post.id}>
        <h4 style={{ borderBottom: "solid 3px orange" }}>{post.title}</h4>
        <p>{post.body}</p>
      </div>
  );
}

export default Post;

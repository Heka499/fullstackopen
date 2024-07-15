import { useDispatch, useSelector } from "react-redux";
import { likeBlog, deleteBlog, commentBlog } from "../reducers/blogReducer";
import { notify } from "../reducers/notificationReducer";
import { useParams } from "react-router-dom";
import { useState } from "react";

const Blog = () => {
  const dispatch = useDispatch();
  const [comment, setComment] = useState("");
  const user = useSelector((state) => state.user);
  const id = useParams().id;
  const blog = useSelector((state) =>
    state.blogs.find((blog) => blog.id === id),
  );

  const handleLike = () => {
    dispatch(likeBlog(blog));
    dispatch(notify(`You liked '${blog.title}'`, 5));
  };

  const handleComment = () => {
    dispatch(commentBlog(blog, comment));
    dispatch(notify(`You commented '${comment}'`, 5));
    setComment("");
  };

  const handleRemove = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      dispatch(deleteBlog(blog));
      dispatch(notify(`You removed '${blog.title}'`, 5));
    }
  };

  console.log("blog", blog);

  if (!blog) {
    return null;
  }

  return (
    <div>
      <h1>Title: {blog.title}</h1>
      <p>Author: {blog.author}</p>
      <p>
        <a href={blog.url}>{blog.url}</a>
      </p>
      <p>
        Likes: {blog.likes}{" "}
        <button className="blog-like-button" onClick={handleLike}>
          Like
        </button>{" "}
      </p>
      <p>Added by: {blog.user.name}</p>
      {user.id === blog.user._id && (
        <button onClick={handleRemove}>Remove</button>
      )}
      <h2>Comments</h2>
      <input
        type="text"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <button onClick={handleComment}>Add comment</button>
      <ul>
        {blog.comments.map((comment) => (
          <li key={comment}>{comment}</li>
        ))}
      </ul>
    </div>
  );
};

export default Blog;

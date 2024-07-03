import { useDispatch } from "react-redux";
import { likeBlog, deleteBlog } from "../reducers/blogReducer";
import { useState } from "react";
import { useNotificationDispatch } from "../context/NotificationContext";

const Blog = ({ blog, user }) => {
  const dispatch = useDispatch();
  const notificationDispatch = useNotificationDispatch();
  const [visible, setVisible] = useState(false);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const handleLike = () => {
    dispatch(likeBlog(blog));
    notificationDispatch({
      type: "SET_NOTIFICATION",
      data: `You liked '${blog.title}'`,
    });
  };

  const handleRemove = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      dispatch(deleteBlog(blog));
      notificationDispatch({
        type: "SET_NOTIFICATION",
        data: `You removed '${blog.title}'`,
      });
    }
  };

  if (!visible) {
    return (
      <div style={blogStyle}>
        <p>
          {blog.title} by {blog.author}{" "}
          <button className="blog-view-button" onClick={toggleVisibility}>
            view
          </button>
        </p>
      </div>
    );
  } else {
    return (
      <div style={blogStyle}>
        <p>
          Title: {blog.title} <button onClick={toggleVisibility}>hide</button>{" "}
        </p>
        <p>Author: {blog.author}</p>
        <p>Link: {blog.url}</p>
        <p>
          Likes: {blog.likes}{" "}
          <button className="blog-like-button" onClick={handleLike}>
            Like
          </button>{" "}
        </p>
        <p>Added by: {blog.user.name}</p>
        {user.username === blog.user.username && (
          <button onClick={handleRemove}>Remove</button>
        )}
      </div>
    );
  }
};

export default Blog;

import { useState } from "react";
import { useNotificationDispatch } from "../context/NotificationContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import blogService from "../services/blogs";

const Blog = ({ blog, user }) => {
  const queryClient = useQueryClient();
  const notificationDispatch = useNotificationDispatch();
  const [visible, setVisible] = useState(false);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const updateBlogMutation = useMutation({
    mutationFn: blogService.update,
    onSuccess: () => {
      queryClient.invalidateQueries("blogs");
    },
  });

  const deleteBlogMutation = useMutation({
    mutationFn: blogService.remove,
    onSuccess: () => {
      queryClient.invalidateQueries("blogs");
    },
  });

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const handleLike = (blog) => {
    updateBlogMutation.mutate({ ...blog, likes: blog.likes + 1 });
    notificationDispatch({
      type: "SET_NOTIFICATION",
      data: `You liked '${blog.title}'`,
    });
  };

  const handleRemove = (id) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      deleteBlogMutation.mutate(id);
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
          <button className="blog-like-button" onClick={() => handleLike(blog)}>
            Like
          </button>{" "}
        </p>
        <p>Added by: {blog.user.name}</p>
        {user.username === blog.user.username && (
          <button onClick={() => handleRemove(blog.id)}>Remove</button>
        )}
      </div>
    );
  }
};

export default Blog;

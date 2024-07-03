import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNotificationDispatch } from "../context/NotificationContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import blogService from "../services/blogs";

const BlogForm = () => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const notificationDispatch = useNotificationDispatch();
  const blogInitialState = {
    title: "",
    author: "",
    url: "",
  };
  const [newBlog, setNewBlog] = useState(blogInitialState);

  const newBlogMutation = useMutation({
    mutationFn: blogService.create,
    onSuccess: () => {
      queryClient.invalidateQueries("blogs");
    },
  });

  const handleBlogChange = (event) => {
    setNewBlog({ ...newBlog, [event.target.name]: event.target.value });
  };

  const addBlog = async (event) => {
    event.preventDefault();
    newBlogMutation.mutate(newBlog);
    notificationDispatch({
      type: "SET_NOTIFICATION",
      data: `Added ${newBlog.title}`,
    });
    setNewBlog(blogInitialState);
  };

  return (
    <form onSubmit={addBlog}>
      <div>
        <label>title:</label>
        <input
          value={newBlog.title}
          name="title"
          onChange={handleBlogChange}
          placeholder="Title"
          data-testid="title"
        />
      </div>
      <div>
        <label>author:</label>
        <input
          value={newBlog.author}
          name="author"
          onChange={handleBlogChange}
          placeholder="Author"
          data-testid="author"
        />
      </div>
      <div>
        <label>url:</label>
        <input
          value={newBlog.url}
          name="url"
          onChange={handleBlogChange}
          placeholder="URL"
          data-testid="url"
        />
      </div>
      <button type="submit">save</button>
    </form>
  );
};

export default BlogForm;

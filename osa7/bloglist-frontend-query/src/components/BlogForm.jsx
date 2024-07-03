import { useState } from "react";
import { createBlog } from "../reducers/blogReducer";
import { useDispatch } from "react-redux";
import { useNotificationDispatch } from "../context/NotificationContext";

const BlogForm = () => {
  const dispatch = useDispatch();
  const notificationDispatch = useNotificationDispatch();
  const blogInitialState = {
    title: "",
    author: "",
    url: "",
  };
  const [newBlog, setNewBlog] = useState(blogInitialState);

  const handleBlogChange = (event) => {
    setNewBlog({ ...newBlog, [event.target.name]: event.target.value });
  };

  const addBlog = (event) => {
    event.preventDefault();
    dispatch(createBlog(newBlog));
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

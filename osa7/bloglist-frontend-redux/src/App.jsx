import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import { useDispatch } from "react-redux";
import { notify } from "./reducers/notificationReducer";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  const blogFormRef = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));

      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
      dispatch(notify(`Welcome back ${user.name}`, 5));
    } catch (exception) {
      dispatch(notify("Wrong username or password", 5));
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem("loggedBlogappUser");
    setUser(null);
    dispatch(notify("Logged out", 5));
  };

  const addBlog = (blogObject) => {
    blogService
      .create(blogObject)
      .then((returnedBlog) => {
        setBlogs(blogs.concat(returnedBlog));
        dispatch(
          notify(
            `a new blog ${blogObject.title} by ${blogObject.author} added`,
            5,
          ),
        );
      })
      .catch((error) => {
        dispatch(notify("Error adding blog", 5));
      });
  };

  const handleLike = (id) => {
    const blog = blogs.find((b) => b.id === id);
    const changedBlog = { ...blog, likes: blog.likes + 1 };

    blogService
      .update(id, changedBlog)
      .then((returnedBlog) => {
        setBlogs(blogs.map((blog) => (blog.id !== id ? blog : returnedBlog)));
      })
      .catch((error) => {
        dispatch(notify("Error updating blog", 5));
      });
  };

  const handleRemove = (id) => {
    if (window.confirm("Remove blog?")) {
      blogService
        .remove(id)
        .then(() => {
          setBlogs(blogs.filter((blog) => blog.id !== id));
        })
        .catch((error) => {
          dispatch(notify("Error removing blog", 5));
        });
    }
  };

  return (
    <div>
      {!user && (
        <div>
          <h2>log in to application</h2>
          <Notification />
          <LoginForm
            handleLogin={handleLogin}
            username={username}
            setUsername={setUsername}
            password={password}
            setPassword={setPassword}
          />
        </div>
      )}
      {user && (
        <div>
          <h2>blogs</h2>
          <Notification />
          <p>{user.name} logged in</p>
          <button onClick={handleLogout}>logout</button>
          <Togglable buttonLabel="new blog" ref={blogFormRef}>
            <BlogForm createBlog={addBlog} />
          </Togglable>
          <div className="bloglist">
            {blogs
              .sort((a, b) => b.likes - a.likes) // Sort blogs based on likes
              .map((blog) => (
                <Blog
                  key={blog.id}
                  blog={blog}
                  user={user}
                  like={handleLike}
                  remove={handleRemove}
                />
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;

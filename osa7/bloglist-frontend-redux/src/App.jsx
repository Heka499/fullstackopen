import { useEffect, useRef } from "react";
import blogService from "./services/blogs";
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import BlogList from "./components/BlogList";
import Users from "./components/Users";
import { useDispatch, useSelector } from "react-redux";
import { notify } from "./reducers/notificationReducer";
import { initializeBlogs } from "./reducers/blogReducer";
import { setUser, logoutUser } from "./reducers/userReducer";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

const App = () => {
  const user = useSelector((state) => state.user);
  const blogFormRef = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeBlogs());
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      dispatch(setUser(user));
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogout = () => {
    dispatch(logoutUser());
    dispatch(notify("Logged out", 5));
  };

  return (
    <Router>
      <div>
        {!user && (
          <div>
            <h2>log in to application</h2>
            <Notification />
            <LoginForm />
          </div>
        )}
        {user && (
          <div>
            <h2>blogs</h2>
            <Notification />
            <p>{user.name} logged in</p>
            <button onClick={handleLogout}>logout</button>
            <Togglable buttonLabel="new blog" ref={blogFormRef}>
              <BlogForm />
            </Togglable>
            <div>
              <Link to="/">blogs</Link>
              <Link to="/users">users</Link>
            </div>
            <Routes>
              <Route path="/users" element={<Users />} />
            </Routes>

            <div className="bloglist">
              <BlogList user={user} />
            </div>
          </div>
        )}
      </div>
    </Router>
  );
};

export default App;

import { useEffect, useRef } from "react";
import blogService from "./services/blogs";
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import BlogList from "./components/BlogList";
import { useDispatch, useSelector } from "react-redux";
import { initializeBlogs } from "./reducers/blogReducer";
import { setUser, logoutUser } from "./reducers/userReducer";
import { useNotificationDispatch } from "./context/NotificationContext";

const App = () => {
  const user = useSelector((state) => state.user);
  const blogFormRef = useRef();
  const dispatch = useDispatch();
  const notificationDispatch = useNotificationDispatch();

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
    notificationDispatch({ type: "SET_NOTIFICATION", data: "logged out" });
  };

  return (
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
          <div className="bloglist">
            <BlogList user={user} />
          </div>
        </div>
      )}
    </div>
  );
};

export default App;

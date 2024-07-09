import { useEffect, useRef } from "react";
import blogService from "./services/blogs";
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import BlogList from "./components/BlogList";
import { useNotificationDispatch } from "./context/NotificationContext";
import { useUserValue, useUserDispatch } from "./context/UserContext";

const App = () => {
  const user = useUserValue();
  const blogFormRef = useRef();
  const notificationDispatch = useNotificationDispatch();
  const userDispatch = useUserDispatch();

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      userDispatch({ type: "SET_USER", data: JSON.parse(loggedUserJSON) });
      blogService.setToken(JSON.parse(loggedUserJSON).token);
    }
  }, []);

  const handleLogout = () => {
    userDispatch({ type: "CLEAR_USER" });
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

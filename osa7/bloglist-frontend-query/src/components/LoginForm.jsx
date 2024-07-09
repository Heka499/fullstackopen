import { useState } from "react";
import { useNotificationDispatch } from "../context/NotificationContext";
import { useUserDispatch } from "../context/UserContext";
import loginService from "../services/login";
import blogService from "../services/blogs";

const LoginForm = () => {
  const userDispatch = useUserDispatch();
  const notificationDispatch = useNotificationDispatch();
  const credentialsInitialState = {
    username: "",
    password: "",
  };
  const [credentials, setCredentials] = useState(credentialsInitialState);

  const handleCredentialsChange = (event) => {
    setCredentials({
      ...credentials,
      [event.target.name]: event.target.value,
    });
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    const user = await loginService.login(credentials);
    console.log("user", user);
    userDispatch({ type: "SET_USER", data: user });
    blogService.setToken(user.token);
    notificationDispatch({
      type: "SET_NOTIFICATION",
      data: `Welcome back ${user.name}`,
    });
    setCredentials(credentialsInitialState);
  };

  return (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          value={credentials.username}
          onChange={handleCredentialsChange}
          data-testid="username"
          type="text"
          name="username"
        />
      </div>
      <div>
        password
        <input
          value={credentials.password}
          onChange={handleCredentialsChange}
          data-testid="password"
          type="password"
          name="password"
        />
      </div>
      <button type="submit">login</button>
    </form>
  );
};

export default LoginForm;

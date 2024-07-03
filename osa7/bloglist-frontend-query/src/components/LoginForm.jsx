import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../reducers/userReducer";
import { useNotificationDispatch } from "../context/NotificationContext";
import { useUserDispatch } from "../context/UserContext";

const LoginForm = () => {
  const dispatch = useDispatch();
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
    userDispatch({ type: "SET_USER", data: credentials });
    notificationDispatch({
      type: "SET_NOTIFICATION",
      data: `Welcome back ${credentials.username}`,
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

import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../reducers/userReducer";
import { notify } from "../reducers/notificationReducer";

const LoginForm = () => {
  const dispatch = useDispatch();
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
    dispatch(loginUser(credentials));
    dispatch(notify(`Welcome back ${credentials.username}`, 5));
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

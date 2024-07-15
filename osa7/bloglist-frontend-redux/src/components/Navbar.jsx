import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../reducers/userReducer";
import { notify } from "../reducers/notificationReducer";

const Navbar = () => {
  const padding = {
    padding: 5,
  };
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutUser());
    dispatch(notify("Logged out", 5));
  };

  return (
    <div>
      <Link style={padding} to="/">
        blogs
      </Link>
      <Link style={padding} to="/users">
        users
      </Link>
      {user && (
        <span>
          {user.name} logged in
          <button onClick={handleLogout}>logout</button>
        </span>
      )}
      {!user && (
        <Link style={padding} to="/login">
          login
        </Link>
      )}
    </div>
  );
};

export default Navbar;

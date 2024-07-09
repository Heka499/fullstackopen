import { createSlice } from "@reduxjs/toolkit";
import userService from "../services/users";

const usersSlice = createSlice({
  name: "users",
  initialState: [],
  reducers: {
    setUsers(state, action) {
      return action.payload;
    },
    appendUser(state, action) {
      state.push(action.payload);
    },
    updateUser(state, action) {
      return state.map((user) =>
        user.id !== action.payload.id ? user : action.payload,
      );
    },
    removeUser(state, action) {
      return state.filter((user) => user.id !== action.payload.id);
    },
  },
});

export const { setUsers, appendUser, updateUser, removeUser } =
  usersSlice.actions;

export default usersSlice.reducer;

export const initializeUsers = () => {
  return async (dispatch) => {
    const users = await userService.getAll();
    dispatch(setUsers(users));
  };
};

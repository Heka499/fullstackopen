import { configureStore } from "@reduxjs/toolkit";

import blogReducer from "./reducers/notificationReducer.js";

const store = configureStore({
  reducer: {
    blogs: blogReducer,
  },
});

export default store;

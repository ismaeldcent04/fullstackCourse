import { configureStore } from "@reduxjs/toolkit";
import blogReducer from "./reducers/blogReducer";
import loginReducer from "./reducers/loginReducer";
import userReducer from "./reducers/userReducer";

export const store = configureStore({
  reducer: {
    blogs: blogReducer,
    login: loginReducer,
    users: userReducer,
  },
});

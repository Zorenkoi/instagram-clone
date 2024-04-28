import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "./slices/postsSlice";
import usersReducer from "./slices/usersSlice";
import modalReducer from "./slices/modalSlice";
import modalUsersReducer from "./slices/modalUsersSlice";
import modalConfirmReducer from "./slices/modalConfirmSlice";

const store = configureStore({
  reducer: {
    postsReducer,
    usersReducer,
    modalReducer,
    modalUsersReducer,
    modalConfirmReducer,
  },
});

export default store;

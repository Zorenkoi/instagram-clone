import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "modalusers",
  initialState: {
    isOpen: false,
  },
  reducers: {
    openModalUsers: (state, action) => {
      state.isOpen = true;
    },
    closeModalUsers: (state, action) => {
      state.isOpen = false;
    },
  },
});

export const { closeModalUsers, openModalUsers } = slice.actions;

const modalUsersReducer = slice.reducer;
export default modalUsersReducer;

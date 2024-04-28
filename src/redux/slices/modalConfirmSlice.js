import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "modalconfirm",
  initialState: {
    isOpen: false,
    question: "",
    confirm: null,
    cancel: null,
  },
  reducers: {
    openModalConfirm: (state, action) => {
      state.isOpen = true;
      state.question = action.payload.question;
      state.confirm = action.payload.confirm;
      state.cancel = action.payload.cancel;
    },
    closeModalConfirm: (state, action) => {
      state.isOpen = false;
      state.confirm = null;
      state.cancel = null;
    },
  },
});

export const { closeModalConfirm, openModalConfirm } = slice.actions;

const modalConfirmReducer = slice.reducer;
export default modalConfirmReducer;

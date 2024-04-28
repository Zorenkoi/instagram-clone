import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";

export const getUsers = createAsyncThunk(
  "users/getUsers",
  async function (_, { rejectWithValue }) {
    try {
      const users = await api.getUsers();
      return users;
    } catch (error) {
      return rejectWithValue();
    }
  }
);

export const toggleSubscribe = createAsyncThunk(
  "users/toggleSubscribe",
  async function ({ userId, updatedUser }, { rejectWithValue, getState }) {
    try {
      const { users } = getState().usersReducer;

      await api.mutateUser(userId, updatedUser);

      const updatedUsers = users.map((user) => {
        if (user.id == userId) return updatedUser;
        return user;
      });

      return updatedUsers;
    } catch (error) {
      console.log(error);
      return rejectWithValue();
    }
  }
);

export const updateUser = createAsyncThunk(
  "users/updateUser",
  async function ({ userId, updatedUser }, { rejectWithValue, getState }) {
    try {
      const { users } = getState().usersReducer;

      await api.mutateUser(userId, updatedUser);

      const updatedUsers = users.map((user) => {
        if (user.id == userId) return updatedUser;
        return user;
      });

      return updatedUsers;
    } catch (error) {
      console.log(error);
      return rejectWithValue();
    }
  }
);

export const addUser = createAsyncThunk(
  "users/addUser",
  async function ({ newUser }, { rejectWithValue, getState }) {
    try {
      const { users } = getState().usersReducer;

      await api.addUser(newUser);

      const updatedUsers = [newUser, ...users];

      return updatedUsers;
    } catch (error) {
      console.log(error);
      return rejectWithValue();
    }
  }
);

export const updateTwoUsers = createAsyncThunk(
  "users/updateTwoUsers",
  async function (
    { updatedUser1, updatedUser2 },
    { rejectWithValue, getState }
  ) {
    try {
      const { users } = getState().usersReducer;

      await api.mutateUser(updatedUser1.id, updatedUser1);
      await api.mutateUser(updatedUser2.id, updatedUser2);

      const updatedUsers = users.map((user) => {
        if (user.id == updatedUser1.id) return updatedUser1;
        if (user.id == updatedUser2.id) return updatedUser2;
        return user;
      });

      return updatedUsers;
    } catch (error) {
      console.log(error);
      return rejectWithValue();
    }
  }
);

const usersSlice = createSlice({
  name: "users",
  initialState: {
    myId: null,
    users: [],
    isLoading: false,
    isError: false,
  },
  reducers: {
    setMyId: (state, action) => {
      state.myId = action.payload.myId;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUsers.pending, (state, action) => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(getUsers.fulfilled, (state, action) => {
      state.users = action.payload;
      state.isLoading = false;
      state.isError = false;
    });
    builder.addCase(getUsers.rejected, (state, action) => {
      state.users = null;
      state.isLoading = false;
      state.isError = true;
    });
    ///
    builder.addCase(updateUser.fulfilled, (state, action) => {
      state.users = action.payload;
    });
    ///
    builder.addCase(updateTwoUsers.fulfilled, (state, action) => {
      state.users = action.payload;
    });
    ///
    builder.addCase(addUser.fulfilled, (state, action) => {
      state.users = action.payload;
    });
  },
});

export const { setMyId } = usersSlice.actions;
const usersReducer = usersSlice.reducer;
export default usersReducer;

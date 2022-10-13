import { createSlice } from "@reduxjs/toolkit";

export const loggedInSlice = createSlice({
  name: "loggedInUser",
  initialState: {},
  reducers: {
    setLoggedInUser: (state, action) => {
      return action.payload;
    },
    logout: (state, action) => (state = {}),
  },
});

export const { setLoggedInUser, logout } = loggedInSlice.actions;
export default loggedInSlice.reducer;

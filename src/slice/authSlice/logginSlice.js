import { createSlice } from "@reduxjs/toolkit";

export const loggedInSlice = createSlice({
  name: "loggedInUser",
  initialState: {},
  reducers: {
    setLoggedInUser: (state, action) => {
      return action.payload;
    },
  },
});

export const { setLoggedInUser } = loggedInSlice.actions;
export default loggedInSlice.reducer;

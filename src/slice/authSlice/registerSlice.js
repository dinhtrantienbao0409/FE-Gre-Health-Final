import { createSlice } from "@reduxjs/toolkit";

export const registeredSlice = createSlice({
  name: "registeredUser",
  initialState: {},
  reducers: {
    setRegisteredUser: (state, action) => {
      return action.payload;
    },
  },
});

export const { setRegisteredUser } = registeredSlice.actions;
export default registeredSlice.reducer;

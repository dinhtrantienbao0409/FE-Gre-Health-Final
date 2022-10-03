import { createSlice } from "@reduxjs/toolkit";

export const registeredSlice = createSlice({
  name: "registeredUser",
  initialState: {
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    dateOfBirth: "",
    gender: "",
    address: "",
    contact: "",
    jobTitle: "",
  },
  reducers: {
    setUserAccount: (state, action) => {
      state.email = action.payload.email;
      state.password = action.payload.password;
      state.confirmPassword = action.payload.confirmPassword;
      return state;
    },
    setUserDetails: (state, action) => {
      state.name = action.payload.name;
      state.dateOfBirth = action.payload.dateOfBirth;
      state.gender = action.payload.gender;
      state.address = action.payload.address;
      state.contact = action.payload.contact;
      state.jobTitle = action.payload.jobTitle;
      return state;
    },
  },
});

export const { setUserAccount, setUserDetails } = registeredSlice.actions;
export default registeredSlice.reducer;

import { configureStore } from "@reduxjs/toolkit";
import authReducer from "slice/authSlice/logginSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

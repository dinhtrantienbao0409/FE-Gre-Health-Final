import { createSlice } from "@reduxjs/toolkit";

export const ImageSlide = createSlice({
  name: "firebaseImage",
  initialState: {
    url: "",
    // password: "",
    // confirmPassword: "",
    // name: "",
    // dateOfBirth: "",
    // gender: "",
    // address: "",
    // contact: "",
    // jobTitle: "",
  },
  reducers: {
    setFirebaseImage: (state, action) => {
      state.url = action.payload;
      return state;
    },
    removeFirebaseImage: (state, action) => (state = {}),
  },
});

export const { setFirebaseImage, removeFirebaseImage } = ImageSlide.actions;
export default ImageSlide.reducer;

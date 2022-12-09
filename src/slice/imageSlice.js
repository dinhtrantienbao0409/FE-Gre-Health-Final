import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  url: "",
};

export const ImageSlide = createSlice({
  name: "firebaseImage",
  initialState: initialState,
  reducers: {
    setFirebaseImage: (state, action) => {
      state.url = action.payload;
      return state;
    },
    removeFirebaseImage: (state, action) => Object.assign(state, initialState),
  },
});

export const { setFirebaseImage, removeFirebaseImage } = ImageSlide.actions;
export default ImageSlide.reducer;

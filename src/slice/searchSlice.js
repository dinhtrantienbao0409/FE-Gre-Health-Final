import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  searchQuery: "",
  isSearching: false,
};
export const SearchSlide = createSlice({
  name: "search",
  initialState: initialState,
  reducers: {
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload.searchQuery;
      state.isSearching = action.payload.isSearching;
      return state;
    },
    resetSearch: (state) => Object.assign(state, initialState),
  },
});

export const { setSearchQuery, resetSearch } = SearchSlide.actions;
export default SearchSlide.reducer;

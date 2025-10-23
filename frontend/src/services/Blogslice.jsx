import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  category: "all",
  searchTerm: ""
};

const blogSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {
    setcategory(state, action) {
      state.category = action.payload.cat;
      // Clear search when selecting a category
      if (action.payload.cat !== "all") {
        state.searchTerm = "";
      }
    },
    
    setSearchTerm(state, action) {
      state.searchTerm = action.payload;
      // Set category to 'all' when searching
      if (action.payload) {
        state.category = "all";
      }
    },
    
    clearFilters(state) {
      state.category = "all";
      state.searchTerm = "";
    }
  },
});

export const { setcategory, setSearchTerm, clearFilters } = blogSlice.actions;
export default blogSlice.reducer;

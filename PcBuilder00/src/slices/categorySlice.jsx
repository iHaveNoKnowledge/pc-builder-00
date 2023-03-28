import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  category: "CPU"
};

export const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    changeCategory: (state, action) => {
      state.category = action.payload;
    }
  }
});

export const { changeCategory } = categorySlice.actions;
export default categorySlice.reducer;

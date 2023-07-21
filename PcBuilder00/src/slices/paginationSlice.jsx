import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentPage: 1,
};

export const paginationSlice = createSlice({
  name: "pagination",
  initialState,
  reducers: {
    setDefault: (state, action) => {
      state.currentPage = initialState.currentPage;
    },

    setPageNum: (state, action) => {
      state.currentPage = action.payload;
    },
  },
});

export const { setDefault, setPageNum } = paginationSlice.actions;
export default paginationSlice.reducer;

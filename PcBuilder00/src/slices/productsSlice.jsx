import { createSlice } from "@reduxjs/toolkit";
import { apiSlice } from "../features/api/dataApiSlice";

const initialState = {
  products: [],
  loading: false,
  error: null,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  // reducers: {
  //   getProducts: (state, action) => {
  //     state.products = [...action.payload];
  //   },
  // },
  extraReducers: (builder) => {
    builder
      .addMatcher(apiSlice.endpoints.getPosts.matchPending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addMatcher(apiSlice.endpoints.getPosts.matchFulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
        state.error = null;
      })
      .addMatcher(apiSlice.endpoints.getPosts.matchRejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { getProducts } = productsSlice.actions;
export default productsSlice.reducer;

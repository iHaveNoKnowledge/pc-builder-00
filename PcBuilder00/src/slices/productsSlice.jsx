import { createSlice } from "@reduxjs/toolkit";
import { apiSliceDb } from "../features/api/dataApiSlice";
import plainBranches from "../json/filtered_data.json";

const initialState = {
  products: [],
  loading: false,
  error: null,
  totalRows: 1,
  branches: null,
  plainBranches,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  //* ของแท้
  extraReducers: (builder) => {
    builder
      .addMatcher(apiSliceDb.endpoints.getDbItem.matchPending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addMatcher(apiSliceDb.endpoints.getDbItem.matchFulfilled, (state, action) => {
        state.branches = null;
        state.loading = false;
        state.products = action.payload.data;
        state.totalRows = action.payload.totalRows;
        state.error = null;
        state.branches = [
          ...new Set(action.payload.data.flatMap((item) => item.BRANCH_CODE)),
        ].sort();
      })
      .addMatcher(apiSliceDb.endpoints.getDbItem.matchRejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { getProducts } = productsSlice.actions;
export default productsSlice.reducer;

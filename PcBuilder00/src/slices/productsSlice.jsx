import { createSlice } from "@reduxjs/toolkit";
import { apiSlice, apiSliceJSONPlaceHolder, apiSliceDb } from "../features/api/dataApiSlice";

const initialState = {
  products: [],
  loading: false,
  error: null,
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
        state.loading = false;
        state.products = action.payload.recordsets.flat();
        state.error = null;
      })
      .addMatcher(apiSliceDb.endpoints.getDbItem.matchRejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },

  //* ของเทส
  // extraReducers: (builder) => {
  //   builder
  //     .addMatcher(apiSliceJSONPlaceHolder.endpoints.getPhotos.matchPending, (state) => {
  //       state.loading = true;
  //       state.error = null;
  //     })
  //     .addMatcher(apiSliceJSONPlaceHolder.endpoints.getPhotos.matchFulfilled, (state, action) => {
  //       state.loading = false;
  //       state.products = action.payload;
  //       state.error = null;
  //     })
  //     .addMatcher(apiSliceJSONPlaceHolder.endpoints.getPhotos.matchRejected, (state, action) => {
  //       state.loading = false;
  //       state.error = action.error.message;
  //     });
  // },
});

export const { getProducts } = productsSlice.actions;
export default productsSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";
import { apiSliceDb } from "../features/api/dataApiSlice";

const initialState = {
  sets: [],
  loading: false,
  error: null,
  totalRows: 1,
};

const setsSlice = createSlice({
  name: "sets",
  initialState,
  extraReducers: (builder) => {
    builder
      .addMatcher(apiSliceDb.endpoints.getSets.matchPending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addMatcher(apiSliceDb.endpoints.getSets.matchFulfilled, (state, action) => {
        state.loading = false;
        state.sets = action.payload.updatedRecordset;
        state.totalRows = action.payload.totalRows;
        state.error = null;
      })
      .addMatcher(apiSliceDb.endpoints.getSets.matchRejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default setsSlice.reducer;

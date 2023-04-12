import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "./slices/categorySlice";
import customizeReducer from "./slices/customizeSlice";
import noApiCustomizeReducer from "./slices/cutomizeSliceNoApi";
import { apiSlice } from "./features/api/dataApiSlice";

export const store = configureStore({
  reducer: {
    category: categoryReducer,
    customize: customizeReducer,
    noApiCustomize: noApiCustomizeReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

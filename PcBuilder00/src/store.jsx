import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "./slices/categorySlice";
import customizeReducer from "./slices/customizeSlice";
import noApiCustomizeReducer from "./slices/cutomizeSliceNoApi";
import { apiSlice, apiSliceDb, updateApi } from "./features/api/dataApiSlice";
import userFilterReducer from "./slices/userFilterSlice";
import reportReducer from "./slices/reportSlice";
import paginationReducer from "./slices/paginationSlice";
import productsReducer from "./slices/productsSlice";

export const store = configureStore({
  reducer: {
    category: categoryReducer,
    customize: customizeReducer,
    noApiCustomize: noApiCustomizeReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
    [apiSliceDb.reducerPath]: apiSliceDb.reducer,
    userFilter: userFilterReducer,
    report: reportReducer,
    pagination: paginationReducer,
    products: productsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware, apiSliceDb.middleware, updateApi.middleware),
});

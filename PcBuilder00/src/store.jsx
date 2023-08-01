import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "./slices/categorySlice";
import noApiCustomizeReducer from "./slices/cutomizeSliceNoApi";
import {
  apiSlice,
  apiSliceDb,
  updateApi,
  apiSliceJSONPlaceHolder,
} from "./features/api/dataApiSlice";
import userFilterReducer from "./slices/userFilterSlice";
import reportReducer from "./slices/reportSlice";
import paginationReducer from "./slices/paginationSlice";
import productsReducer from "./slices/productsSlice";
import setsReducer from "./slices/setsSlice";

export const store = configureStore({
  reducer: {
    category: categoryReducer,
    noApiCustomize: noApiCustomizeReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
    [apiSliceDb.reducerPath]: apiSliceDb.reducer,
    [apiSliceJSONPlaceHolder.reducerPath]: apiSliceJSONPlaceHolder.reducer,
    userFilter: userFilterReducer,
    report: reportReducer,
    pagination: paginationReducer,
    products: productsReducer,
    // sets: setsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      apiSlice.middleware,
      apiSliceDb.middleware,
      updateApi.middleware,
      apiSliceJSONPlaceHolder.middleware
    ),
});

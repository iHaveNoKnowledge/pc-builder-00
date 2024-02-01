import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "./slices/categorySlice";
import noApiCustomizeReducer from "./slices/customizeSliceNoApi";
import { apiSliceDb, apiPutSets } from "./features/api/dataApiSlice";
import userFilterReducer from "./slices/userFilterSlice";
import reportReducer from "./slices/reportSlice";
import paginationReducer from "./slices/paginationSlice";
import productsReducer from "./slices/productsSlice";
import setsReducer from "./slices/setsSlice";

export const store = configureStore({
  reducer: {
    category: categoryReducer,
    customized: noApiCustomizeReducer,
    [apiSliceDb.reducerPath]: apiSliceDb.reducer,
    [apiPutSets.reducerPath]: apiPutSets.reducer,
    userFilter: userFilterReducer,
    report: reportReducer,
    pagination: paginationReducer,
    products: productsReducer,
    sets: setsReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSliceDb.middleware, apiPutSets.middleware),
});

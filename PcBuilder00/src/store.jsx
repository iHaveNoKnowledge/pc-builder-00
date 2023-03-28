import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "./slices/categorySlice";
import customizeReducer from "./slices/customizeSlice";
import noApiCustomizeReducer from "./slices/cutomizeSliceNoApi";

export const store = configureStore({
    reducer: {
      category: categoryReducer,
      customize: customizeReducer,
      noApiCustomize: noApiCustomizeReducer
    }
  });
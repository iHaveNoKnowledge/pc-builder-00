import { combineReducers, configureStore } from "@reduxjs/toolkit";
import categoryReducer from "./slices/categorySlice";
import customizeReducer from "./slices/customizeSlice";
import noApiCustomizeReducer from "./slices/cutomizeSliceNoApi";
import { apiSlice } from "./features/api/dataApiSlice";
import userFilterReducer from "./slices/userFilterSlice";
import { persistStore, persistReducer, createTransform } from "redux-persist"; //libraryพวกนี้ทำให้ สามารถคงค่า state ไว้ได้
import storage from "redux-persist/lib/storage"; //libraryพวกนี้ทำให้ สามารถคงค่า state ไว้ได้

const rootRudecer = combineReducers({
  category: categoryReducer,
  customize: customizeReducer,
  noApiCustomize: noApiCustomizeReducer,
  [apiSlice.reducerPath]: apiSlice.reducer,
  userFilter: userFilterReducer,
});

const transformConfig = {
  inbound: (inboundState, key) => {
    // แปลงแต่งค่าข้อมูลใน inboundState เป็น JSON
    const transformedState = JSON.stringify(inboundState);
    console.log("in", transformedState);
    return transformedState;
  },
  outbound: (outboundState, key) => {
    // แปลงแต่งค่าข้อมูลใน outboundState จาก JSON กลับเป็นข้อมูลเดิม
    const transformedState = JSON.parse(outboundState);
    console.log("out", transformedState);
    return transformedState;
  },
};

const nonSerializableTransform = createTransform(transformConfig.inbound, transformConfig.outbound);

const persistConfig = {
  key: "root",
  storage,
  transforms: [nonSerializableTransform],
};

const persistedReducer = persistReducer(persistConfig, rootRudecer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
});

const persistor = persistStore(store);
export { persistor };

// persistor.persist();
// persistor.pause();
// persistor.purge();

// store.replaceReducer(persistedReducer);

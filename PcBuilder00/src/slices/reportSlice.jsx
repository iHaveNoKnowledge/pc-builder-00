import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  info: { setName: "", customerName: "", customerTel: "", sellerName: "" },
  partData: [],
  sets: [],
};

export const reportSlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    addInfo: (state, action) => {
      state.info = action.payload;
    },

    getPartData: (state, action) => {
      state.partData = action.payload;
    },

    saveSet: (state, action) => {
      const { updatedInputData, partData } = action.payload;
      console.log("กด save แล้วได้ไรมา", JSON.stringify(updatedInputData), partData);
      state.info = updatedInputData;
      state.partData = partData;
    },
  },
});

export const { addInfo, getPartData, saveSet } = reportSlice.actions;
export default reportSlice.reducer;

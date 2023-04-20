import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  textSearch: null,
  filter: null,
  categorizedData: null,
};

export const filterSlice = createSlice({
  name: "userFilter",
  initialState,
  reducers: {
    changeTextSearch: (state, action) => {
      state.textSearch = action.payload;
      console.log("เสิชว่าไร: ", state.textSearch);
    },
    createFilter: (state, action) => {
      //ยังไม่รู้จะใช้ยังไง
      state.filter = action.payload;
    },
    getCategorizedData: (state, action) => {
      //ใช้รับ showData จาก selectionProto
      console.log("getCategorizedDatawได้ไรมา:", action.payload);
      const cpuBrandOption = [...new Set(action.payload.map((item) => item.brand))];
      const cpuModelOption = [...new Set(action.payload.map((item) => item.model))];
      const cpuSocketOption = [...new Set(action.payload.map((item) => item.socket))];
      state.categorizedData = [cpuBrandOption, cpuModelOption, cpuSocketOption];
    },
  },
});

export const { changeTextSearch, createFilter, getCategorizedData } = filterSlice.actions;
export default filterSlice.reducer;

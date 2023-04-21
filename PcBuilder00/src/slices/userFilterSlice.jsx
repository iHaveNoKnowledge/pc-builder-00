import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  textSearch: null,
  filters: { CPU: { brand: "", model: "", socket: "" }, Mainboard: {}, RAM: {} },
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
      const { showProduct: option, category } = action.payload;
      console.log("getCategorizedDatawได้ไรมา:", category);

      state.categorizedData = null;

      if (category === "CPU") {
        const cpuBrandOption = [...new Set(option.map((item) => item.brand))];
        const cpuModelOption = [...new Set(option.map((item) => item.model))];
        const cpuSocketOption = [...new Set(option.map((item) => item.socket))];
        state.categorizedData = [
          { filterName: "Brand", value: cpuBrandOption },
          { filterName: "Model", value: cpuModelOption },
          { filterName: "Socket", value: cpuSocketOption },
        ];
      } else if (category === "Mainboard") {
      }
    },
  },
});

export const { changeTextSearch, createFilter, getCategorizedData } = filterSlice.actions;
export default filterSlice.reducer;

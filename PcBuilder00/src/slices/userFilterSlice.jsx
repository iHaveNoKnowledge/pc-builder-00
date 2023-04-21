import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  textSearch: null,
  filters: {
    CPU: { brand: "", model: "", socket: "" },
    Mainboard: { formFactor: "", brand: "", socket: "", chipset: "", slot: "" },
    RAM: { brand: "", type: "", count: "" },
  },
  filterOptions: null,
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

      state.filterOptions = null;

      if (category === "CPU") {
        const cpuBrandOption = [...new Set(option.map((item) => item.brand))].concat("");
        const cpuModelOption = [...new Set(option.map((item) => item.model))].concat("");
        const cpuSocketOption = [...new Set(option.map((item) => item.socket))].concat("");
        ///สร้าง option ให้ dropdown
        state.filterOptions = [
          { filterName: "Brand", value: cpuBrandOption },
          { filterName: "Model", value: cpuModelOption },
          { filterName: "Socket", value: cpuSocketOption },
        ];
      } else if (category === "Mainboard") {
        const mbFormFactorOpt = [...new Set(option.map((item) => item.formFactor))].concat("");
        const mbBrandOpt = [...new Set(option.map((item) => item.brand))].concat("");
        const mbSocketOpt = [...new Set(option.map((item) => item.socket))].concat("");
        const mbChipsetOpt = [...new Set(option.map((item) => item.chipset))].concat("");
        const mbSlotOpt = [...new Set(option.map((item) => item.slot))].concat("");
        ///สร้าง option ให้ dropdown
        state.filterOptions = [
          { filterName: "formFactor", value: mbFormFactorOpt },
          { filterName: "brand", value: mbBrandOpt },
          { filterName: "socket", value: mbSocketOpt },
          { filterName: "chipset", value: mbChipsetOpt },
          { filterName: "slot", value: mbSlotOpt },
        ];
      }
    },
  },
});

export const { changeTextSearch, createFilter, getCategorizedData } = filterSlice.actions;
export default filterSlice.reducer;

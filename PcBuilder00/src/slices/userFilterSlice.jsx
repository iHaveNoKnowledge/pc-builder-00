import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  textSearch: null,
  filters: {
    CPU: { brand: "", model: "", socket: "" },
    Mainboard: { formFactor: "", brand: "", socket: "", chipset: "", slot: "" },
    RAM: { brand: "", type: "", count: "" },
  },
  filterOptions: null,
  expression: "",
  selectedValueCopy: {},
};

export const filterSlice = createSlice({
  name: "userFilter",
  initialState,
  reducers: {
    changeTextSearch: (state, action) => {
      state.textSearch = action.payload;
    },
    createFilter: (state, action) => {
      //ยังไม่รู้จะใช้ยังไง
      state.filter = action.payload;
    },
    getCategorizedData: (state, action) => {
      //ใช้รับ showData จาก selectionProto
      const { showProduct: option, category } = action.payload;

      state.filterOptions = null;

      if (category === "CPU") {
        const cpuBrandOption = [...new Set(option.map((item) => item.brand))].concat("");
        const cpuModelOption = [...new Set(option.map((item) => item.model))].concat("");
        const cpuSocketOption = [...new Set(option.map((item) => item.socket))].concat("");
        ///สร้าง option ให้ dropdown
        state.filterOptions = [
          { filterName: "brand", value: cpuBrandOption },
          { filterName: "model", value: cpuModelOption },
          { filterName: "socket", value: cpuSocketOption },
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
          { filterName: "Slot", value: mbSlotOpt },
        ];
      }
    },

    updateFilters: (state, action) => {
      console.log(
        "dispatchUpdateFilters selectedValues:",
        action.payload.selectedValues,
        "currentCategory:",
        action.payload.currentCategory
      );
      const { selectedValues, currentCategory } = action.payload;
      console.log("selectedValuesได้ไรมา", selectedValues);
      state.filters[currentCategory] = { ...state.filters[currentCategory], ...selectedValues };
      console.log("setแล้วเป็นไง", JSON.stringify(state.filters[currentCategory]));

      // Generate filter expression dynamically
      let expression = Object.keys(state.filters)
        .map((filter) => {
          return `(!state.filters.${filter} || product.${filter} === state.filters.${filter})`;
        })
        .join(" && ");

      // Update the expression state
      state.expression = expression;
    },

    clearFilter: (state, action) => {
      state.filters = initialState.filters;
    },

    setSelectedValuesCopy: (state, action) => {
      console.log("destrucไม่ได้", action.payload);
      if (action.payload) {
        const { filterName, newValue, currentCategory } = action.payload;
        // const x = { ...state.selectedValueCopy, [filterName]: newValue };
        // state.selectedValueCopy = x;
        state.filters[currentCategory] = {
          ...state.filters[currentCategory],
          [filterName]: newValue,
        };
        console.log("แอดใหม่ได้ไรมา", state.filters[currentCategory]);
      }
    },
  },
});

export const {
  changeTextSearch,
  createFilter,
  getCategorizedData,
  updateFilters,
  clearFilter,
  setSelectedValuesCopy,
} = filterSlice.actions;
export default filterSlice.reducer;

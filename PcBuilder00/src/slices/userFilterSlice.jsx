import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  textSearch: null,
  selectedOption: {
    CPU: { brand: "", model: "", socket: "" },
    Mainboard: { formFactor: "", brand: "", socket: "", chipset: "", slot: "" },
    RAM: { brand: "", type: "", count: "" },
  },
  filterOptions: null,
  expression: "",
  selectedValueCopy: {},
  filtersSet: [
    {
      name: "cpu",
      filters: [
        { name: "brand", choice: [] },
        { name: "model", choice: [] },
        { name: "socket", choice: [] },
      ],
      selectedOptionState: { brand: "", model: "", socket: "" },
    },
    {
      name: "mainboard",
      filters: [
        { name: "formFactor", choice: [] },
        { name: "brand", choice: [] },
        { name: "socket", choice: [] },
        { name: "chipset", choice: [] },
        { name: "slot", choice: [] },
      ],
      selectedOptionState: { formFactor: "", brand: "", socket: "", chipset: "", slot: "" },
    },
    {
      name: "ram",
      filters: [
        { name: "brand", choice: [] },
        { name: "type", choice: [] },
        { name: "count", choice: [] },
      ],
      selectedOptionState: { brand: "", type: "", count: "" },
    },
  ],
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
      const { showProduct: categorizedData, category } = action.payload;

      state.filterOptions = null;

      if (category === "CPU") {
        const cpuBrandOptions = [...new Set(categorizedData.map((item) => item.brand))];
        const cpuModelOptions = [...new Set(categorizedData.map((item) => item.model))];
        const cpuSocketOptions = [...new Set(categorizedData.map((item) => item.socket))];
        ///สร้าง option ให้ dropdown
        state.filterOptions = [
          { filterName: "brand", value: cpuBrandOptions },
          { filterName: "model", value: cpuModelOptions },
          { filterName: "socket", value: cpuSocketOptions },
        ];

        state.filtersSet[0].filters[0].choice = cpuBrandOptions;
        state.filtersSet[0].filters[1].choice = cpuModelOptions;
        state.filtersSet[0].filters[2].choice = cpuSocketOptions;
      } else if (category === "Mainboard") {
        const mbFormFactorOpt = [...new Set(categorizedData.map((item) => item.formFactor))];
        const mbBrandOpt = [...new Set(categorizedData.map((item) => item.brand))];
        const mbSocketOpt = [...new Set(categorizedData.map((item) => item.socket))];
        const mbChipsetOpt = [...new Set(categorizedData.map((item) => item.chipset))];
        const mbSlotOpt = [...new Set(categorizedData.map((item) => item.slot))];
        ///สร้าง option ให้ dropdown
        state.filterOptions = [
          { filterName: "formFactor", value: mbFormFactorOpt },
          { filterName: "brand", value: mbBrandOpt },
          { filterName: "socket", value: mbSocketOpt },
          { filterName: "chipset", value: mbChipsetOpt },
          { filterName: "slot", value: mbSlotOpt },
        ];
        state.filtersSet[1].filters[0].choice = mbFormFactorOpt;
        state.filtersSet[1].filters[1].choice = mbBrandOpt;
        state.filtersSet[1].filters[2].choice = mbSocketOpt;
        state.filtersSet[1].filters[3].choice = mbChipsetOpt;
        state.filtersSet[1].filters[4].choice = mbSlotOpt;
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
      const filterTarget = state.filtersSet.find(
        (filterItem) => filterItem.name === currentCategory.toLowerCase()
      );

      // // Generate filter expression dynamically
      // let expression = Object.keys(filterTarget)
      //   .map((filter) => {
      //     return `(!state.filters.${filter} || product.${filter} === state.filters.${filter})`;
      //   })
      //   .join(" && ");

      // // Update the expression state
      // state.expression = expression;
    },

    clearFilter: (state, action) => {
      state.filtersSet.map((item, index) => {
        item.selectedOptionState = initialState.filtersSet[index].selectedOptionState;
      });
    },

    setSelectedValuesCopy: (state, action) => {
      console.log("destrucไม่ได้", action.payload);
      if (action.payload) {
        const { value: newValue, currentCategory, keyName } = action.payload;

        const filterTarget = state.filtersSet.find(
          (filterItem) => filterItem.name === currentCategory.toLowerCase()
        );
        console.log("เข้าได้ป่าวหว่า", { ...filterTarget.selectedOption });
        Object.assign(filterTarget.selectedOptionState, { [keyName]: newValue });
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

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  textSearch: null,
  selectedOption: {
    CPU: { brand: "", model: "", socket: "" },
    Mainboard: { formFactor: "", brand: "", socket: "", chipset: "", slot: "" },
    RAM: { brand: "", type: "", count: "" },
  },
  filterOptions: null,
  expression: ` (!selectedOpts.brand || product.brand === selectedOpts.brand) &&
  (!selectedOpts.model || product.model === selectedOpts.model) &&
  (!selectedOpts.socket || product.socket === selectedOpts.socket)`,
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
    { name: "vga", filters: [], selectedOptionState: {} },
    { name: "ssd", filters: [], selectedOptionState: {} },
    { name: "hdd", filters: [], selectedOptionState: {} },
    { name: "psu", filters: [], selectedOptionState: {} },
    { name: "case", filters: [], selectedOptionState: {} },
    { name: "cooling", filters: [], selectedOptionState: {} },
    { name: "accesories diy", filters: [], selectedOptionState: {} },
    { name: "monitor", filters: [], selectedOptionState: {} },
    { name: "mouse", filters: [], selectedOptionState: {} },
    { name: "keyboard", filters: [], selectedOptionState: {} },
    { name: "os", filters: [], selectedOptionState: {} },
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
          { filterName: "brand", value: cpuBrandOptions.sort() },
          { filterName: "model", value: cpuModelOptions.sort() },
          { filterName: "socket", value: cpuSocketOptions.sort() },
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
          { filterName: "formFactor", value: mbFormFactorOpt.sort() },
          { filterName: "brand", value: mbBrandOpt.sort() },
          { filterName: "socket", value: mbSocketOpt.sort() },
          { filterName: "chipset", value: mbChipsetOpt.sort() },
          { filterName: "slot", value: mbSlotOpt.sort() },
        ];
        state.filtersSet[1].filters[0].choice = mbFormFactorOpt;
        state.filtersSet[1].filters[1].choice = mbBrandOpt;
        state.filtersSet[1].filters[2].choice = mbSocketOpt;
        state.filtersSet[1].filters[3].choice = mbChipsetOpt;
        state.filtersSet[1].filters[4].choice = mbSlotOpt;
      }
    },

    // updateFilters: (state, action) => {
    //   console.log(
    //     "dispatchUpdateFilters selectedValues:",
    //     action.payload.selectedValues,
    //     "currentCategory:",
    //     action.payload.currentCategory
    //   );
    //   const { selectedValues, currentCategory } = action.payload;
    //   const filterTarget = state.filtersSet.find(
    //     (filterItem) => filterItem.name === currentCategory.toLowerCase()
    //   );

    //   // Generate filter expression dynamically
    //   let expression = Object.keys(filterTarget)
    //     .map((filter) => {
    //       return `(!state.filters.${filter} || product.${filter} === state.filters.${filter})`;
    //     })
    //     .join(" && ");

    // },

    clearFilter: (state, action) => {
      state.filtersSet.map((item, index) => {
        item.selectedOptionState = initialState.filtersSet[index].selectedOptionState;
      });
    },

    ////
    setSelectedValuesCopy: (state, action) => {
      console.log("destrucไม่ได้", action.payload);
      if (action.payload) {
        const { value: newValue, currentCategory, keyName } = action.payload;
        const filterTarget = state.filtersSet.find(
          (filterItem) => filterItem.name === currentCategory.toLowerCase()
        );
        Object.assign(filterTarget.selectedOptionState, { [keyName]: newValue });

        // Generate filter expression dynamically
        // Object.keys(objParam)กรณีอยากloop obj แต่ obj มัน loop ไม่ได้
        // Object.keys(objParam)ดึงค่า เฉพาะ key จาก objParam มาแล้วเรียงเปน arrayใหม่
        let expression = Object.keys(filterTarget.selectedOptionState)
          .map((filter) => {
            return `(!selectedOpts.${filter} || product.${filter} === selectedOpts.${filter})`;
          })
          .join(" && ");
        // Update the expression state
        state.expression = expression;
        console.log("จะได้ expressionแบบไหน", expression);
      } else {
        console.log("ไม่มี Payload ของ action");
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

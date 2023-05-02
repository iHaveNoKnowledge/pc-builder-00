import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  textSearch: null,
  selectedOption: {
    CPU: { brand: "", model: "", socket: "" },
    Mainboard: { formFactor: "", brand: "", socket: "", chipset: "", slot: 0 },
    RAM: { brand: "", type: "", count: 0 },
  },
  filterOptions: null,
  expression: ` (!selectedOpts.brand || product.brand === selectedOpts.brand) &&
  (!selectedOpts.model || product.model === selectedOpts.model) &&
  (!selectedOpts.socket || product.socket === selectedOpts.socket)`,
  filtersSet: [
    {
      name: "cpu",
      filters: [
        { name: "brand", choices: [] },
        { name: "model", choices: [] },
        { name: "socket", choices: [] },
      ],
      selectedOptionState: { brand: "", model: "", socket: "" },
    },
    {
      name: "mainboard",
      filters: [
        { name: "formFactor", choices: [] },
        { name: "brand", choices: [] },
        { name: "socket", choices: [] },
        { name: "chipset", choices: [] },
        { name: "slot", choices: [] },
      ],
      selectedOptionState: { formFactor: "", brand: "", socket: "", chipset: "", slot: 0 },
    },
    {
      name: "ram",
      filters: [
        { name: "brand", choices: [] },
        { name: "type", choices: [] },
        { name: "count", choices: [] },
      ],
      selectedOptionState: { brand: "", type: "", count: 0 },
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

        state.filtersSet[0].filters[0].choices = cpuBrandOptions;
        state.filtersSet[0].filters[1].choices = cpuModelOptions;
        state.filtersSet[0].filters[2].choices = cpuSocketOptions;
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
          { filterName: "slot", value: Number(mbSlotOpt.sort()) },
        ];
        state.filtersSet[1].filters[0].choices = mbFormFactorOpt;
        state.filtersSet[1].filters[1].choices = mbBrandOpt;
        state.filtersSet[1].filters[2].choices = mbSocketOpt;
        state.filtersSet[1].filters[3].choices = mbChipsetOpt;
        state.filtersSet[1].filters[4].choices = mbSlotOpt;
      }
    },

    clearSelectedFilter: (state, action) => {
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
          (filterSetItem) => filterSetItem.name === currentCategory.toLowerCase()
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
  clearSelectedFilter,
  setSelectedValuesCopy,
} = filterSlice.actions;
export default filterSlice.reducer;

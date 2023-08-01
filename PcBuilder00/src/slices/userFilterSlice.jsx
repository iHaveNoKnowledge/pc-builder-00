import { createSlice } from "@reduxjs/toolkit";
// --------------------------------------------------------------INITIAL_STATE---------------------------------------------------------------------
// จะมี useEffect ที่ทำงานเมื่อ category มีการเปลี่ยนแปลง แล้วจะดึงข้อมูลมา หา filter
const initialState = {
  textSearch: "",
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
        { name: "compatible", displayName: "Brand", choices: [] },
        { name: "model", displayName: "Model", choices: [] },
        { name: "socket", displayName: "Socket", choices: [] },
      ],
      selectedOptionState: { brand: "", model: "", socket: "" },
    },
    {
      name: "mb",
      filters: [
        { name: "formFactor", displayName: "FormFactor", choices: [] },
        { name: "compatible", displayName: "Brand", choices: [] },
        { name: "socket", displayName: "Socket", choices: [] },
        { name: "chipset", displayName: "Chipset", choices: [] },
        { name: "slot", displayName: "Slot", choices: [] },
      ],
      selectedOptionState: { formFactor: "", brand: "", socket: "", chipset: "", slot: 0 },
    },
    {
      name: "ram",
      filters: [
        { name: "compatible", displayName: "Brand", choices: [] },
        { name: "typeRam", displayName: "Type", choices: [] },
        { name: "countItem", displayName: "Count", choices: [] },
      ],
      selectedOptionState: { brand: "", typeRam: "", countItem: 0 },
    },
    { name: "vga", filters: [], selectedOptionState: {} },
    { name: "ssd", filters: [], selectedOptionState: {} },
    { name: "hdd", filters: [], selectedOptionState: {} },
    { name: "liquidcooling", filters: [], selectedOptionState: {} },
    { name: "aircooling", filters: [], selectedOptionState: {} },
    { name: "fancase", filters: [], selectedOptionState: {} },
    { name: "thermalcompound", filters: [], selectedOptionState: {} },
    { name: "sleevecable", filters: [], selectedOptionState: {} },
    { name: "lcs", filters: [], selectedOptionState: {} },
    { name: "gpuextender", filters: [], selectedOptionState: {} },
    { name: "gpuholder", filters: [], selectedOptionState: {} },
    { name: "powersupply", filters: [], selectedOptionState: {} },
    { name: "case", filters: [], selectedOptionState: {} },
  ],
};

// --------------------------------------------------------------------FUNCTIONS-------------------------------------------------------------------
const checkCategory = (category) => {
  category = category.toLowerCase();

  const validCategories = {
    mb: ["mb", "mainboard", "motherboard"],
    cpu: ["cpu"],
    ram: ["ram"],
  };

  for (const key in validCategories) {
    if (validCategories[key].includes(category)) {
      return key;
    }
  }

  return null;
};

// --------------------------------------------------------------------CREATE_SLICE-------------------------------------------------------------------
export const filterSlice = createSlice({
  name: "userFilter",
  initialState,
  reducers: {
    changeTextSearch: (state, action) => {
      console.log("redux action: ", action.payload);
      state.textSearch = action.payload;
    },
    createFilter: (state, action) => {
      //! ยังไม่รู้จะใช้ยังไง
      state.filter = action.payload;
    },

    getCategorizedData: (state, action) => {
      //ใช้รับ showProduct จาก selectionProto(ภายในuseEffect), showProductเป็น รายการproducts ที่ได้ผ่านจากการเลือก category มาแล้ว ถือว่าเป็น categorizedData
      const { showProduct: categorizedData, category } = action.payload;
      console.log("categorizedData", categorizedData);

      state.filterOptions = null;
      ///สร้าง options ให้ dropdown
      if (checkCategory(category) === "cpu") {
        const cpuBrandOptions = [...new Set(categorizedData?.map((item) => item.compatible))];
        const cpuModelOptions = [...new Set(categorizedData?.map((item) => item.model))];
        const cpuSocketOptions = [...new Set(categorizedData?.map((item) => item.socket))];

        state.filterOptions = [
          { filterName: "brand", value: cpuBrandOptions.sort() },
          { filterName: "model", value: cpuModelOptions.sort() },
          { filterName: "socket", value: cpuSocketOptions.sort() },
        ];
        // นำ options ที่สร้างมาใส่ใน filter แต่ละรายการ
        state.filtersSet[0].filters[0].choices = cpuBrandOptions;
        state.filtersSet[0].filters[1].choices = cpuModelOptions;
        state.filtersSet[0].filters[2].choices = cpuSocketOptions;
      } else if (checkCategory(category) === "mb") {
        const mbFormFactorOpts = [...new Set(categorizedData.map((item) => item.formFactor))];
        const mbBrandOpts = [...new Set(categorizedData.map((item) => item.compatible))];
        const mbSocketOpts = [...new Set(categorizedData.map((item) => item.socket))];
        const mbChipsetOpts = [...new Set(categorizedData.map((item) => item.chipset))];
        const mbSlotOpts = [...new Set(categorizedData.map((item) => item.slot))];
        ///สร้าง options ให้ dropdown
        state.filterOptions = [
          { filterName: "formFactor", value: mbFormFactorOpts.sort() },
          { filterName: "brand", value: mbBrandOpts.sort() },
          { filterName: "socket", value: mbSocketOpts.sort() },
          { filterName: "chipset", value: mbChipsetOpts.sort() },
          { filterName: "slot", value: Number(mbSlotOpts.sort()) },
        ];
        state.filtersSet[1].filters[0].choices = mbFormFactorOpts;
        state.filtersSet[1].filters[1].choices = mbBrandOpts;
        state.filtersSet[1].filters[2].choices = mbSocketOpts;
        state.filtersSet[1].filters[3].choices = mbChipsetOpts;
        state.filtersSet[1].filters[4].choices = mbSlotOpts;
      } else if (checkCategory(category) === "ram") {
        const ramBrandOpts = [...new Set(categorizedData.map((item) => item.compatible))];
        const ramTypeOpts = [...new Set(categorizedData.map((item) => item.typeRam))];
        const ramCountOpts = [...new Set(categorizedData.map((item) => item.countItem))];
        const optsPerFilter = [ramBrandOpts, ramTypeOpts, ramCountOpts];
        state.filtersSet[2].filters.map(
          (filter, index) => (filter.choices = [...optsPerFilter[index]])
        );
      }
      console.log("เช็คfilter", JSON.stringify(state.filtersSet[0].selectedOptionState));
    },

    clearSelectedFilter: (state, action) => {
      state.filtersSet.map((item, index) => {
        item.selectedOptionState = initialState.filtersSet[index].selectedOptionState;
      });
    },

    setSelectedValuesCopy: (state, action) => {
      console.log("destrucไม่ได้", action.payload);

      if (action.payload) {
        const { value, currentCategory, keyName } = action.payload;
        const numTypeKey = ["slot", "count"];
        const testResult = numTypeKey.find((item) => item === keyName);
        let newValue = value;

        if (testResult) {
          newValue = Number(value);
        }

        const filterTarget = state.filtersSet.find(
          (filterSetItem) => filterSetItem.name === currentCategory.toLowerCase()
        );
        Object.assign(filterTarget.selectedOptionState, { [keyName]: newValue });

        // Generate filter expression dynamically
        // กรณีอยากloop obj แต่ obj มัน loop ไม่ได้ ใช้ตัวนี้-> Object.keys(objParam)
        // Object.keys(objParam)ดึงค่า เฉพาะ key จาก objParam มาแล้วเรียงเปน arrayใหม่
        let expression = Object.keys(filterTarget.selectedOptionState)
          .map((filter) => {
            return `(!selectedOpts.${filter} || product.${filter} == selectedOpts.${filter})`;
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

// -----------------------------------------------------------------EXPORT_ACTIONS-------------------------------------------------------------------
export const {
  changeTextSearch,
  createFilter,
  getCategorizedData,
  updateFilters,
  clearSelectedFilter,
  setSelectedValuesCopy,
} = filterSlice.actions;
export default filterSlice.reducer;

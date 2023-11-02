import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  info: { setName: "", customerName: "", customerTel: "", sellerName: "", sellerTel: "" },
  branch: {
    code: "",
    name: "",
    address:
      "อาคาร ศูนย์การค้า เดอะ พาลาเดียม เวิลด์ ช็อปปิง ชั้นที่ B1,B2,5 เลขที่ 555 ถนน ราชปรารภ แขวงมักกะสัน เขตราชเทวี กรุงเทพมหานคร 10400",
  },
  sets: [],
  SNs: [],
};

export const reportSlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    addInfo: (state, action) => {
      state.info = initialState.info;
      state.info = action.payload;
    },

    getPartData: (state, action) => {
      state.partData = action.payload;
    },

    saveSet: (state, action) => {
      const { updatedInputData, partData } = action.payload;

      state.info = updatedInputData;
      state.partData = partData;
    },

    setSN: (state, action) => {
      const snList = action.payload;
      state.SNs = [...state.SNs , ...snList];
    },
  },
});

export const { addInfo, getPartData, saveSet, setSN } = reportSlice.actions;
export default reportSlice.reducer;

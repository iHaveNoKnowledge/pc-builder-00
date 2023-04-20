import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  textSearch: "",
  // type: { CPU: [{series:}], Mainboard: [], RAM: [] },
};

export const filterSlice = createSlice({
  name: "userFilter",
  initialState,
  reducers: {
    changeTextSearch: (state, action) => {
      state.textSearch = action.payload;
      console.log("เสิชว่าไร: ", state.textSearch);
    },
  },
});

export const { changeTextSearch } = filterSlice.actions;
export default filterSlice.reducer;

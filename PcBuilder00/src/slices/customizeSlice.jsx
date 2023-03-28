import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  partData: [
    {
      id: null,
      title: "",
      price: null,
      category: "electronics"
    },
    {
      id: null,
      title: "",
      price: null,
      category: "jewelery"
    },
    {
      id: null,
      title: "",
      price: null,
      category: "men's clothing"
    },
    {
      id: null,
      title: "",
      price: null,
      category: "women's clothing"
    }
  ]
};

export const customizeSlice = createSlice({
  name: "customize",
  initialState,
  reducers: {
    ////add product
    addProduct: (state, action) => {
      console.log("แอดของไรมา", action.payload);
      const categoryIndex = state.partData.findIndex(
        (item) => item.category === action.payload.category
      );
      if (categoryIndex !== -1) {
        state.partData[categoryIndex] = {
          id: action.payload.id,
          title: action.payload.title,
          price: action.payload.price,
          category: action.payload.category
        };
      }
    },

    removeProduct: (state, action) => {
      const index = state.partData.findIndex(
        (item) => item.category === action.payload
      );
      if (index !== -1) {
        state.partData[index] = {
          id: null,
          title: "",
          price: null,
          category: action.payload
        };
      }
    }
  }
});

export const { addProduct, removeProduct } = customizeSlice.actions;
export default customizeSlice.reducer;

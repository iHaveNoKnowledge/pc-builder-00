import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  partData: [
    {
      id: null,
      title: "",
      category: "CPU",
      socket: "",
      max: 1,
      selectAmount: 0,
      img: ""
    },
    {
      id: null,
      title: "",
      category: "Mainboard",
      slot: null,
      socket: "",
      typeRAM: "",
      max: 1,
      selectAmount: 0,
      img: ""
    },
    {
      id: null,
      title: "",
      category: "RAM",
      slot: null,
      typeRAM: "",
      max: 4,
      selectAmount: 0,
      count: 1,
      img: ""
    },
    {
      id: null,
      title: "",
      category: "VGA",
      slot: null,
      max: null,
      selectAmount: 0
    },
    {
      id: null,
      title: "",
      category: "SSD",
      slot: null,
      max: null,
      selectAmount: 0
    },
    {
      id: null,
      title: "",
      category: "HDD",
      slot: null,
      max: null,
      selectAmount: 0
    },
    {
      id: null,
      title: "",
      category: "PSU",
      slot: null,
      max: null,
      selectAmount: 0
    },
    {
      id: null,
      title: "",
      category: "Case",
      slot: null,
      max: null,
      selectAmount: 0
    },
    {
      id: null,
      title: "",
      category: "Cooling",
      slot: null,
      max: null,
      selectAmount: 0
    },
    {
      id: null,
      title: "",
      category: "Accesories DIY",
      slot: null,
      max: null,
      selectAmount: 0
    },
    {
      id: null,
      title: "",
      category: "Monitor",
      slot: null,
      max: null,
      selectAmount: 0
    },
    {
      id: null,
      title: "",
      category: "Mouse",
      slot: null,
      max: null,
      selectAmount: 0
    },
    {
      id: null,
      title: "",
      category: "Keyboard",
      slot: null,
      max: null,
      selectAmount: 0
    },
    {
      id: null,
      title: "",
      category: "OS",
      slot: null,
      max: null,
      selectAmount: 0
    }
  ]
};

export const customizeSlice = createSlice({
  name: "customize",
  initialState,
  reducers: {
    addProduct: (state, action) => {
      console.log("แอดของไรมา", action.payload);
      const categoryIndex = state.partData.findIndex(
        (item) => item.category === action.payload.category
      );
      if (categoryIndex !== -1) {
        state.partData[categoryIndex] = {
          ...state.partData[categoryIndex],
          id: action.payload.id,
          title:action.payload.title,
          selectAmount: action.payload.count ? action.payload.count: 1,
          socket: action.payload.socket,
          category: action.payload.category,
          typeRAM: action.payload.typeRAM,
          price: action.payload.price,
          img: action.payload.img,

          
        };
      }
    },

    removeProduct: (state, action) => {
      const index = state.partData.findIndex(
        (item) => item.category === action.payload
      );
      if (index !== -1) {
        state.partData[index] = {
          ...state.partData[index],
          id: null,
          title: "",
          price: null,
          selectAmount:0,
          socket:"",
          typeRAM:"",
          category: action.payload,
          img:"",
          max: initialState.partData[index].max,
          count: initialState.partData[index].count
        };
      }
    },

    setMax: (state, action) => {
      console.log("setMax: ", action.payload);
      const index = state.partData.findIndex((item) => item.category === "RAM");
      if (index !== -1) {
        state.partData[index] = {
          ...state.partData[index],
          max: action.payload
        };
      }
    }
  }
});

export const { addProduct, removeProduct, setMax } = customizeSlice.actions;
export default customizeSlice.reducer;

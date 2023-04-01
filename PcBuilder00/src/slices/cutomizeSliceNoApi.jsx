import { createSlice } from "@reduxjs/toolkit";
import {filter, map} from 'lodash';

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
  ],
  sumAmount : 0,
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
          selectAmount: 1,
          socket: action.payload.socket,
          category: action.payload.category,
          typeRAM: action.payload.typeRAM,
          price: action.payload.price,
          img: action.payload.img,
          count: action.payload.count ? action.payload.count : 1, 
    
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

    //actionนี้ถูกใช้หลังจากเช็คว่าไอเท็มที่แอดมา เป็น mainboard หรือไม่ ถ้ามีให้ใช้ action oี้
    setMax: (state, action) => {
      const index = state.partData.findIndex((item) => item.category === "RAM");
      if (index !== -1) {
        if (state.partData[index].max < action.payload) {
          state.partData[index] = {
            ...state.partData[index],
            max: action.payload
          };
          } else if (state.partData[index].max === action.payload) {
            state.partData[index].max = 4
          } else if (state.partData[index].max > action.payload) {
          state.partData[index].max = action.payload
        }
        if((state.partData[index].selectAmount*state.partData[index].count) > state.partData[index].max){
          state.partData[index].selectAmount = 1
        }
      }
      
    },

    incAmount: (state, action) => {    
      const index = state.partData.findIndex((item)=>item.category === action.payload);
      if(index !== -1) {
        if((state.partData[index].selectAmount*state.partData[index].count) < state.partData[index].max) {
          state.partData[index].selectAmount += 1 
        } else if((state.partData[index].selectAmount*state.partData[index].count) === state.partData[index].max) {  
          state.partData[index].selectAmount
        } else {
          state.partData[index].selectAmount = 1
        } 
      }
    },

    decAmount: (state, action) => {
      console.log("decAmount ใน store ทำงาน")
      const index = state.partData.findIndex((item)=>item.category === action.payload);
      if(index !== -1) {
        if(state.partData[index].selectAmount > 1) {
          
          state.partData[index].selectAmount -= 1 
        } 
      }
    },

    updateSumAMount: (state, action) =>{
      const sumArr = map(state.partData, "selectAmount")
      const sum = sumArr.reduce((acc, item)=>acc+item, state.sumAmount)
      console.log("จำนวนรวม: ",sum)
      }
  }
});

export const { addProduct, removeProduct, setMax, incAmount, decAmount, updateSumAMount } = customizeSlice.actions;
export default customizeSlice.reducer;

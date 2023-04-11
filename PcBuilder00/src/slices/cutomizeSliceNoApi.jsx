import { createSlice } from "@reduxjs/toolkit";
import {
  filter,
  map,
  chain,
  reduce,
  mapValues,
  value,
  findIndex,
} from "lodash";

const initialState = {
  partData: [
    {
      category: "CPU",
      typeMax: 1,
      typeAmount: 0,
      listItems: [
        {
          id: null,
          title: "",
          socket: "",
          max: 1,
          selectAmount: 0,
          img: "",
          price: 0,
          discount: 0,
        },
      ],
    },
    {
      category: "Mainboard",
      typeMax: 1,
      typeAmount: 0,
      listItems: [
        {
          id: null,
          title: "",
          category: "Mainboard",
          slot: null,
          socket: "",
          typeRAM: "",
          selectAmount: 0,
          img: "",
          price: 0,
          discount: 0,
        },
      ],
    },
    {
      category: "RAM",
      typeMax: 4,
      typeAmount: 0,
      listItems: [
        {
          id: null,
          title: "",
          category: "RAM",
          slot: null,
          typeRAM: "",

          selectAmount: 0,
          count: 1,
          img: "",
          price: 0,
          discount: 0,
        },
      ],
    },
    {
      category: "VGA",
      typeMax: null,
      typeAmount: 0,
      listItems: [
        {
          id: null,
          title: "",
          category: "VGA",
          slot: null,

          selectAmount: 0,
          price: 0,
          discount: 0,
        },
      ],
    },
    {
      category: "SSD",
      typeMax: null,
      typeAmount: 0,
      listItems: [
        {
          id: null,
          title: "",
          category: "SSD",
          slot: null,

          selectAmount: 0,
          price: 0,
          discount: 0,
        },
      ],
    },
    {
      category: "HDD",
      typeMax: null,
      typeAmount: 0,
      listItems: [
        {
          id: null,
          title: "",
          category: "HDD",
          slot: null,

          selectAmount: 0,
          price: 0,
          discount: 0,
        },
      ],
    },
    {
      category: "PSU",
      typeMax: null,
      typeAmount: 0,
      listItems: [
        {
          id: null,
          title: "",
          category: "PSU",
          slot: null,

          selectAmount: 0,
          price: 0,
          discount: 0,
        },
      ],
    },
    {
      category: "Case",
      typeMax: null,
      typeAmount: 0,
      listItems: [
        {
          id: null,
          title: "",
          category: "Case",
          slot: null,

          selectAmount: 0,
          price: 0,
          discount: 0,
        },
      ],
    },
    {
      category: "Cooling",
      typeMax: null,
      typeAmount: 0,
      listItems: [
        {
          id: null,
          title: "",
          category: "Cooling",
          slot: null,

          selectAmount: 0,
          price: 0,
          discount: 0,
        },
      ],
    },
    {
      category: "Accesories DIY",
      typeMax: null,
      typeAmount: 0,
      listItems: [
        {
          id: null,
          title: "",
          category: "Accesories DIY",
          slot: null,

          selectAmount: 0,
          price: 0,
          discount: 0,
        },
      ],
    },
    {
      category: "Monitor",
      typeMax: null,
      typeAmount: 0,
      listItems: [
        {
          id: null,
          title: "",
          category: "Monitor",
          slot: null,

          selectAmount: 0,
          price: 0,
          discount: 0,
        },
      ],
    },
    {
      category: "Mouse",
      typeMax: null,
      typeAmount: 0,
      listItems: [
        {
          id: null,
          title: "",
          category: "Mouse",
          slot: null,
          selectAmount: 0,
          price: 0,
          discount: 0,
        },
      ],
    },
    {
      category: "Keyboard",
      typeMax: null,
      typeAmount: 0,
      listItems: [
        {
          id: null,
          title: "",
          category: "Keyboard",
          slot: null,

          selectAmount: 0,
          price: 0,
          discount: 0,
        },
      ],
    },
    {
      category: "OS",
      typeMax: null,
      typeAmount: 0,
      listItems: [
        {
          id: null,
          title: "",
          category: "OS",
          slot: null,

          selectAmount: 0,
          price: 0,
          discount: 0,
        },
      ],
    },
  ],

  summations: { sumAmount: 0, sum_SRP: 0, sumDiscount: 0 },
};

export const customizeSlice = createSlice({
  name: "customize",
  initialState,
  reducers: {
    ////Main Action (1 action ต่อ 1 ปุ่ม)
    addProduct: (state, action) => {
      const categoryIndex = state.partData.findIndex(
        (item) => item.category === action.payload.category
      );

      if (categoryIndex !== -1) {
        ////ตรวจสอบว่าเกินหรือไม่
        ///currentType จะเป็นการเลือก สมาชิกที่ filter category มาแล้ว
        const currentType = state.partData[categoryIndex];
        if (currentType.typeAmount < currentType.typeMax) {
          console.log("สินค้ายังไม่เกินกว่ากำหนด");
          ////ตรวจสอบว่ามีแล้วหรือไม่ ถ้าเป็น true isFoundItem เป็น obj สมาชิก listItems, false จะเป็น undefined ต้องสร้าง obj ใหม่
          const isFoundItem = currentType.listItems.find(
            (item) => item.id === action.payload.id
          );
          if (isFoundItem) {
            console.log("เจอซ้ำ", isFoundItem.title);
          } else {
            console.log("ไม่เจอ", isFoundItem);
            const newArray = {
              ...currentType.listItems[0],
              id: action.payload.id,
              title: action.payload.title,
              selectAmount: 1,
              socket: action.payload.socket,
              category: action.payload.category,
              typeRAM: action.payload.typeRAM,
              price: action.payload.price,
              discount: action.payload.discount,
              img: action.payload.img,
              count: action.payload.count ? action.payload.count : 1,
            };
            console.log("newArray มีค่า:", newArray);
            currentType.listItems.push(newArray);
          }
        } else if (currentType.typeAmount === currentType.typeMax) {
          console.log("สินค้าเท่ากับจำนวนที่กำหนดแล้ว");
        } else {
          console.log("สินค้าเกินจำนวนที่กำหนด");
        }
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
          selectAmount: 0,
          socket: "",
          typeRAM: "",
          category: action.payload,
          img: "",
          max: initialState.partData[index].max,
          count: initialState.partData[index].count,
        };
      }
    },

    incAmount: (state, action) => {
      const index = state.partData.findIndex(
        (item) => item.category === action.payload
      );
      if (index !== -1) {
        if (
          state.partData[index].selectAmount * state.partData[index].count <
          state.partData[index].max
        ) {
          state.partData[index].selectAmount += 1;
        } else if (
          state.partData[index].selectAmount * state.partData[index].count ===
          state.partData[index].max
        ) {
          state.partData[index].selectAmount;
        } else {
          state.partData[index].selectAmount = 1;
        }
      }
    },

    decAmount: (state, action) => {
      console.log("decAmount ใน store ทำงาน");
      const index = state.partData.findIndex(
        (item) => item.category === action.payload
      );
      if (index !== -1) {
        if (state.partData[index].selectAmount > 1) {
          state.partData[index].selectAmount -= 1;
        }
      }
    },

    resetCustomized: (state, action) => {
      state.partData = initialState.partData;
    },

    setTypeAmount: (state, action) => {
      const index = findIndex(state.partData, {
        category: action.payload.category,
      });

      let sumAllItem = 0;
      state.partData[index].listItems.map((item) => {
        sumAllItem += item.selectAmount;
      });
      console.log("sumAllItem มีค่าเท่าไหร่", sumAllItem);
      state.partData[index].typeAmount = sumAllItem;
    },

    ////Sub Action (ใช้ ร่วมกับ action หลัก)
    //actionนี้ถูกใช้หลังจากเช็คว่าไอเท็มที่แอดมา เป็น mainboard หรือไม่ ถ้ามีให้ใช้ action
    setMax: (state, action) => {
      const index = state.partData.findIndex((item) => item.category === "RAM");
      if (index !== -1) {
        if (state.partData[index].max < action.payload) {
          state.partData[index] = {
            ...state.partData[index],
            max: action.payload,
          };
        } else if (state.partData[index].max === action.payload) {
          state.partData[index].max = 4;
        } else if (state.partData[index].max > action.payload) {
          state.partData[index].max = action.payload;
        }
        if (
          state.partData[index].selectAmount * state.partData[index].count >
          state.partData[index].max
        ) {
          state.partData[index].selectAmount = 1;
        }
      }
    },

    updateSumAmount: (state, action) => {
      console.log(state.summations.sumAmount);
      const sumArr = map(state.partData, "selectAmount"); // lodash นะ อย่า งง ตอนแรกลืมว่า syntax ไร
      const sum = sumArr.reduce((acc, item) => acc + item, 0);
      console.log("จำนวนรวม: ", sum);
      state.summations.sumAmount = sumArr.reduce((acc, item) => acc + item, 0);
    },

    updateSumPrices: (state, action) => {
      const sumPriceArr = state.partData.map((obj) => {
        return obj.price * obj.selectAmount;
      });

      const sumDiscountArr = state.partData.map((obj) => {
        return obj.price - obj.price * (1 - obj.discount) * obj.selectAmount;
      });

      console.log("afterreducr:", sumPriceArr);
      state.summations.sumDiscount = sumDiscountArr.reduce(
        (acc, item) => acc + item,
        0
      );
      state.summations.sum_SRP = sumPriceArr.reduce(
        (acc, item) => acc + item,
        0
      );
      console.log("ราคาต้น", state.summations.sum_SRP);
      console.log("ส่วนลด", state.summations.sumDiscount);
    },
  },
});

export const {
  addProduct,
  removeProduct,
  setMax,
  incAmount,
  decAmount,
  updateSumAmount,
  resetCustomized,
  updateSumPrices,
  setTypeAmount,
} = customizeSlice.actions;
export default customizeSlice.reducer;

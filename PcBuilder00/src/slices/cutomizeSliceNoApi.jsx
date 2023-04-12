import { createSlice } from "@reduxjs/toolkit";
import {
  filter,
  map,
  chain,
  reduce,
  mapValues,
  value,
  findIndex,
  find,
} from "lodash";

const initialState = {
  partData: [
    {
      category: "CPU",
      typeMax: 1,
      typeAmount: 0,
      listItems: [],
    },
    {
      category: "Mainboard",
      typeMax: 1,
      typeAmount: 0,
      listItems: [],
    },
    {
      category: "RAM",
      typeMax: 4,
      typeAmount: 0,
      listItems: [],
    },
    {
      category: "VGA",
      typeMax: null,
      typeAmount: 0,
      listItems: [],
    },
    {
      category: "SSD",
      typeMax: null,
      typeAmount: 0,
      listItems: [],
    },
    {
      category: "HDD",
      typeMax: null,
      typeAmount: 0,
      listItems: [],
    },
    {
      category: "PSU",
      typeMax: null,
      typeAmount: 0,
      listItems: [],
    },
    {
      category: "Case",
      typeMax: null,
      typeAmount: 0,
      listItems: [],
    },
    {
      category: "Cooling",
      typeMax: null,
      typeAmount: 0,
      listItems: [],
    },
    {
      category: "Accesories DIY",
      typeMax: null,
      typeAmount: 0,
      listItems: [],
    },
    {
      category: "Monitor",
      typeMax: null,
      typeAmount: 0,
      listItems: [],
    },
    {
      category: "Mouse",
      typeMax: null,
      typeAmount: 0,
      listItems: [],
    },
    {
      category: "Keyboard",
      typeMax: null,
      typeAmount: 0,
      listItems: [],
    },
    {
      category: "OS",
      typeMax: null,
      typeAmount: 0,
      listItems: [],
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
      ///เก็บค่าใหม่ที่รับเข้ามาดองไว้ใน object ก่อน
      const newArray = {
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
      ////เช็คสมาชิกใหม่ว่า load เท่าไหร่
      const typeMaxConsumtion = newArray.selectAmount * newArray.count;
      console.log("ค่าโหลดเท่าไหร่: ", typeMaxConsumtion);

      if (categoryIndex !== -1) {
        ////ตรวจสอบว่าเกินหรือไม่
        ///currentType จะเป็นการเลือก สมาชิกที่ filter category มาแล้ว
        const currentType = state.partData[categoryIndex];
        if (currentType.typeAmount + typeMaxConsumtion < currentType.typeMax) {
          console.log("สินค้ายังไม่เกินกว่ากำหนด");
          ////ตรวจสอบว่ามีแล้วหรือไม่ ถ้าเป็น true isFoundItem เป็น obj ที่เป็นสมาชิก Arr listItems, false จะเป็น undefined ต้องสร้าง obj ใหม่
          const isFoundItem = currentType.listItems.find(
            (item) => item.id === action.payload.id
          );
          if (isFoundItem) {
            console.log("เจอซ้ำ", isFoundItem.id);
            isFoundItem.selectAmount += 1;
          } else {
            console.log("ไม่เจอ", isFoundItem);
            currentType.listItems.push(newArray);
          }
        } else if (
          currentType.typeAmount + typeMaxConsumtion ===
          currentType.typeMax
        ) {
          console.log("สินค้าเท่ากับจำนวนที่กำหนดแล้ว");
          currentType.listItems.push(newArray);
        } else {
          console.log("สินค้าเกินจำนวนที่กำหนด");
        }
        console.log("หน้าตาเป็นไงแล้ว:", JSON.stringify(currentType.listItems));
      }

      let totalAmount = 0; // Initialize the total amount to 0

      // Loop through the listItems array of the RAM object
      for (let i = 0; i < state.partData[categoryIndex].listItems.length; i++) {
        let item = state.partData[categoryIndex].listItems[i];
        totalAmount += item.selectAmount * (item.count ? item.count : 1); // Add the product of selectAmount and count to the total amount
      }

      state.partData[categoryIndex].typeAmount = totalAmount; // Assign the total amount to the typeAmount property of the RAM object
    },

    removeProduct: (state, action) => {
      const index = state.partData.findIndex(
        (item) => item.category === action.payload.category
      );
      //categorizedList เป็น array เก็บค่าในหมวดหมู่นั้นๆ
      const categorizedListItem = state.partData[index].listItems;
      console.log(
        "Arrayในประเภทที่เลือก: ",
        JSON.stringify(categorizedListItem)
      );

      const miniIndex = action.payload.miniIndex;

      if (index !== -1) {
        console.log("indexที่เอามา splice: ", miniIndex);
        categorizedListItem.splice(miniIndex, 1);
        console.log(
          "splice แล้วเหลือไร: ",
          JSON.stringify(categorizedListItem)
        );
        let totalAmount = 0; // Initialize the total amount to 0
        for (let i = 0; i < categorizedListItem.length; i++) {
          console.log("ติดไร: ", JSON.stringify(categorizedListItem.length), i);
          let item = categorizedListItem[i];
          totalAmount += item.selectAmount * (item.count ? item.count : 1); // Add the product of selectAmount and count to the total amount
        }

        state.partData[index].typeAmount = totalAmount; // Assign the total amount to the typeAmount property of the RAM object
        state.partData[index] = initialState.partData[index];
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
        if (action.payload) {
          state.partData[index].typeMax = action.payload;
        } else {
          state.partData[index].typeMax = initialState.partData[index].typeMax;
        }

        // if (state.partData[index].typeMax < action.payload) {
        //   state.partData[index] = {
        //     ...state.partData[index],
        //     typeMax: action.payload,
        //   };
        // } else if (state.partData[index].typeMax === action.payload) {
        //   state.partData[index].typeMax = 4;
        // } else if (state.partData[index].typeMax > action.payload) {
        //   state.partData[index].typeMax = action.payload;
        // }

        const categorizedListItem = state.partData[index].listItems;
        let totalAmount = 0; // Initialize the total amount to 0
        for (let i = 0; i < categorizedListItem.length; i++) {
          let item = categorizedListItem.listItems[i];
          totalAmount += item.selectAmount * (item.count ? item.count : 1); // Add the product of selectAmount and count to the total amount
        }

        state.partData[index].typeAmount = totalAmount; // Assign the total amount to the typeAmount property of the RAM object

        if (
          state.partData[index].selectAmount * state.partData[index].count >
          state.partData[index].typeMax
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

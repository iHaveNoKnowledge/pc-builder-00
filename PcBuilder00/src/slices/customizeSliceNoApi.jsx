import { createSlice } from "@reduxjs/toolkit";
import { map, findIndex } from "lodash";

const initialState = {
  partData: [
    {
      category: "cpu",
      categoryDisplay: "CPU",
      dbCategory: "CPU",
      typeMax: 1,
      typeAmount: 0,
      listItems: [],
      isStackable: false,
    },
    {
      category: "mb",
      categoryDisplay: "Mainboard",
      dbCategory: "MB",
      typeMax: 1,
      typeAmount: 0,
      listItems: [],
      isStackable: false,
    },
    {
      category: "ram",
      categoryDisplay: "RAM",
      dbCategory: "RAM",
      typeMax: 4,
      typeAmount: 0,
      listItems: [],
      isStackable: true,
    },
    {
      category: "vga",
      categoryDisplay: "GPU",
      dbCategory: "VGA",
      typeMax: null,
      typeAmount: 0,
      listItems: [],
      isStackable: false,
    },
    {
      category: "ssd",
      categoryDisplay: "SSD",
      dbCategory: "SSD",
      typeMax: null,
      typeAmount: 0,
      listItems: [],
      isStackable: true,
    },
    {
      category: "hdd",
      categoryDisplay: "HDD",
      dbCategory: "HDD",
      typeMax: null,
      typeAmount: 0,
      listItems: [],
      isStackable: true,
    },
    {
      category: "powersupply",
      categoryDisplay: "Power supply",
      dbCategory: "Power supply",
      typeMax: null,
      typeAmount: 0,
      listItems: [],
      isStackable: false,
    },
    {
      category: "case",
      categoryDisplay: "CASE",
      dbCategory: "CASE",
      typeMax: null,
      typeAmount: 0,
      listItems: [],
      isStackable: false,
    },
    {
      category: "liquidcooling",
      categoryDisplay: "Liquid Cooling",
      dbCategory: "Liquid Cooling",
      typeMax: null,
      typeAmount: 0,
      listItems: [],
      isStackable: false,
    },
    {
      category: "aircooling",
      categoryDisplay: "Air Cooling",
      dbCategory: "Air Cooling",
      typeMax: null,
      typeAmount: 0,
      listItems: [],
      isStackable: false,
    },
    {
      category: "fancase",
      categoryDisplay: "FAN CASE",
      dbCategory: "FAN CASE",
      typeMax: null,
      typeAmount: 0,
      listItems: [],
      isStackable: false,
    },
    {
      category: "thermalcompound",
      categoryDisplay: "Thermal compound",
      dbCategory: "Thermal compound",
      typeMax: null,
      typeAmount: 0,
      listItems: [],
      isStackable: false,
    },
    {
      category: "sleevecable",
      categoryDisplay: "Sleeve Cable",
      dbCategory: "Sleeve Cable",
      typeMax: null,
      typeAmount: 0,
      listItems: [],
      isStackable: false,
    },
    {
      category: "lcs",
      categoryDisplay: "LCS",
      dbCategory: "LCS",
      typeMax: null,
      typeAmount: 0,
      listItems: [],
      isStackable: false,
    },
    {
      category: "gpuextender",
      categoryDisplay: "GPU Extender",
      dbCategory: "GPU Extender",
      typeMax: null,
      typeAmount: 0,
      listItems: [],
      isStackable: false,
    },
    {
      category: "gpuholder",
      categoryDisplay: "GPU HOLDER",
      dbCategory: "GPU HOLDER",
      typeMax: null,
      typeAmount: 0,
      listItems: [],
      isStackable: false,
    },
  ],
  itemsList: [],
  summations: { sumAmount: 0, sum_SRP: 0, sumDiscount: 0, sumPrice: 0 },
};

export const customizeSlice = createSlice({
  name: "customize",
  initialState,
  reducers: {
    //Main Action (1 action ต่อ 1 ปุ่ม) ---------------------------------------------------
    addProduct: (state, action) => {
      const categoryIndex = state.partData.findIndex(
        (item) => item.category === action.payload.category.toLowerCase().replace(" ", "")
      );

      //* เก็บค่าใหม่ที่รับเข้ามาดองไว้ใน object ก่อน
      const newArray2 = { ...action.payload };

      for (let key in newArray2) {
        if (newArray2[key] === null || newArray2[key] === undefined) {
          delete newArray2[key];
          delete newArray2["qty"];
        }
      }

      newArray2["selectAmount"] = newArray2["selectAmount"] > 1 ? newArray2["selectAmount"] : 1;
      newArray2["category"] = newArray2["category"].toLowerCase().replace(" ", "");
      newArray2["countItem"] = newArray2["countItem"] ? newArray2["countItem"] : 1;

      //* เช็คสมาชิกใหม่ว่า load เท่าไหร่ เนื่องจากมี max capa ทำให้ต้องดู load ว่าเกิน max capaหรือไม่
      const typeMaxConsumtion = newArray2.selectAmount * newArray2.countItem;

      if (categoryIndex !== -1) {
        const currentStateType = state.partData[categoryIndex]; ///currentStateType จะเป็นการเลือก สมาชิกที่ filter category มาแล้ว
        const isFoundItem = currentStateType.listItems.find(
          (item) => item.id === action.payload.id
        ); //* ตรวจสอบว่ามีแล้วหรือไม่ ถ้าเป็น true isFoundItem เป็น obj ที่เป็นสมาชิก Arr listItems, false จะเป็น undefined ต้องสร้าง obj ใหม่
        if (currentStateType.typeMax) {
          if (currentStateType.typeAmount === 0) {
            currentStateType.listItems.push(newArray2);
          } else {
            if (
              currentStateType.typeAmount / currentStateType.typeMax === 1 &&
              currentStateType.listItems.length < 2 &&
              currentStateType.typeAmount <= 1
            ) {
              currentStateType.listItems[0] = newArray2;
            } else {
              if (currentStateType.typeAmount + typeMaxConsumtion <= currentStateType.typeMax) {
                if (isFoundItem) {
                  isFoundItem.selectAmount += 1;
                } else {
                  currentStateType.listItems.push(newArray2);
                }
              } else {
              }
            }
          }
        } else {
          if (currentStateType.isStackable) {
            if (isFoundItem) {
              isFoundItem.selectAmount += 1;
            } else {
              currentStateType.listItems.push(newArray2);
            }
          } else {
            if (currentStateType.listItems.length > 0) {
              if (isFoundItem) {
                isFoundItem.selectAmount++;
              }
            } else {
              currentStateType.listItems.push(newArray2);
            }
          }
        }
      }

      let totalAmount = 0; // Initialize the total amount to 0

      // Loop through the listItems array of the RAM object
      for (let i = 0; i < state.partData[categoryIndex].listItems.length; i++) {
        let item = state.partData[categoryIndex].listItems[i];
        totalAmount += item.selectAmount * (item.countItem ? item.countItem : 1); // Add the product of selectAmount and count to the total amount
      }

      state.partData[categoryIndex].typeAmount = totalAmount; // Assign the total amount to the typeAmount property of the RAM object
      state.itemsList = state.partData.flatMap((part) => part.listItems.map((item) => item));
    },

    removeProduct: (state, action) => {
      const index = state.partData.findIndex(
        (item) => item.category === action.payload.category.toLowerCase().replace(" ", "")
      );
      //categorizedList เป็น array เก็บค่าในหมวดหมู่นั้นๆ
      const categorizedListItem = state.partData[index].listItems;

      const miniIndex = action.payload.miniIndex;

      if (index !== -1) {
        categorizedListItem.splice(miniIndex, 1);

        //เป็นการรวม SelectAmountที่เหลืออยู่
        let totalAmount = 0; // การจะนับของก็ต้องทำตะกร้าให้เป็น 0 สะก่อน แล้วใช้ for loop ค่อยๆโยนแล้วนับจำนวน
        //ใช้ for loop เพื่อดึงค่า selectAmount(จำนวนสินค้าที่เลือกย่อย) ของสมาชิกที่เหลือแต่ละตัว เพื่อจะได้ไปรวมที่ typeAmount(รวมจำนวนสินค้าทั้งหมด)
        for (let i = 0; i < categorizedListItem.length; i++) {
          let item = categorizedListItem[i];
          totalAmount += item.selectAmount * (item.countItem ? item.countItem : 1); // Add the product of selectAmount and count to the total amount
        }

        state.partData[index].typeAmount = totalAmount; // Assign the total amount to the typeAmount property of the RAM object
        // state.partData[index] = initialState.partData[index];
      }
      state.itemsList = state.partData.flatMap((part) => part.listItems.map((item) => item));
    },

    incAmount: (state, action) => {
      const index = state.partData.findIndex(
        (item) => item.category === action.payload.category.toLowerCase().replace(" ", "")
      ); //action.payload = category
      const categorizedListItem = state.partData[index].listItems;
      const miniIndex = action.payload.miniIndex;
      if (state.partData[index].typeMax) {
        if (index !== -1) {
          if (state.partData[index].typeAmount < state.partData[index].typeMax) {
            categorizedListItem[miniIndex].selectAmount++;
          } else if (state.partData[index].typeAmount === state.partData[index].typeMax) {
            categorizedListItem[miniIndex].selectAmount;
          } else {
            categorizedListItem[miniIndex].selectAmount = 1;
          }
        }

        let totalAmount = 0; // Initialize the total amount to 0
        // Loop through the listItems array of the RAM object
        for (let i = 0; i < state.partData[index].listItems.length; i++) {
          let item = state.partData[index].listItems[i];
          totalAmount += item.selectAmount * (item.countItem ? item.countItem : 1); // Add the product of selectAmount and count to the total amount
        }
        state.partData[index].typeAmount = totalAmount; // Assign the total amount to the typeAmount property of the RAM object
      } else {
        if (index !== -1) {
          categorizedListItem[miniIndex].selectAmount++;
        }
      }
      state.itemsList = state.partData.flatMap((part) => part.listItems.map((item) => item));
    },

    decAmount: (state, action) => {
      const index = state.partData.findIndex(
        (item) => item.category === action.payload.category.toLowerCase().replace(" ", "")
      );
      const categorizedListItem = state.partData[index].listItems;
      const miniIndex = action.payload.miniIndex;

      if (index !== -1) {
        if (categorizedListItem[miniIndex].selectAmount > 1) {
          categorizedListItem[miniIndex].selectAmount--;
        }
      }

      let totalAmount = 0; // Initialize the total amount to 0
      // Loop through the listItems array of the RAM object
      for (let i = 0; i < state.partData[index].listItems.length; i++) {
        let item = state.partData[index].listItems[i];
        totalAmount += item.selectAmount * (item.countItem ? item.countItem : 1); // Add the product of selectAmount and count to the total amount
      }
      state.partData[index].typeAmount = totalAmount; // Assign the total amount to the typeAmount property of the RAM object
      state.itemsList = state.partData.flatMap((part) => part.listItems.map((item) => item));
    },

    resetCustomized: (state, action) => {
      state.partData = initialState.partData;
      state.itemsList = state.partData.flatMap((part) => part.listItems.map((item) => item));
    },

    setTypeAmount: (state, action) => {
      const index = findIndex(state.partData, {
        category: action.payload.category.toLowerCase().replace(" ", ""),
      });

      let sumAllItem = 0;
      state.partData[index].listItems.map((item) => {
        sumAllItem += item.selectAmount;
      });

      state.partData[index].typeAmount = sumAllItem;
    },

    //Sub Action (ใช้ ร่วมกับ action หลัก)----------------------------------
    //actionนี้ถูกใช้หลังจากเช็คว่าไอเท็มที่แอดมา เป็น mainboard หรือไม่ ถ้ามีให้ใช้ action
    //* ทำงานจากการรับ MB แต่ Action นี้จะเปลี่ยนค่า Max ของ ram  Setmax ให้ RAM เท่านั้น ยังไม่สามารถ ใช้กับตัวอื่นได้
    setMax: (state, action) => {
      const mbSlot = action.payload?.mbSlot
      const isFromSets = action.payload?.isFromSets;
      const index = state.partData.findIndex((item) => item.category === "ram");
      console.log("ทำงานหรือไม่ รับค่าไรมา : ", action.payload);
      if (index !== -1 || isMbSelected) {
        //กรณีมี Payload
        if (state.partData[1].listItems.length > 0) {
          if (mbSlot) {
            state.partData[index].typeMax = mbSlot;
          } else {
            // state.partData[index].typeMax = initialState.partData[index].typeMax;
            // if ((state.partData[1].listItems[0] && !mbSlot) || isFromSets) {
            //   //มีเมนบอร์ดป่าว?
            //   state.partData[index].typeMax = state.partData[1].listItems[0].mbSlot; //มีก็set max slot ไว้
            // } else {
            //   state.partData[index].typeMax = initialState.partData[index].typeMax; // ไม่มีก็set เป็นค่าเริ่มต้น
            // }
            state.partData[index].typeMax = mbSlot;
          }
        } else {
          state.partData[index].typeMax = initialState.partData[index].typeMax;
        }

        let categorizedListItem = state.partData[index].listItems;

        let totalAmount = 0; // Initialize the total amount to 0
        for (let i = 0; i < categorizedListItem.length; i++) {
          let item = categorizedListItem[i];
          totalAmount += item.selectAmount * (item.countItem ? item.countItem : 1); // Add the product of selectAmount and count to the total amount
        }

        state.partData[index].typeAmount = totalAmount; // Assign the total amount to the typeAmount property of the RAM object

        if (state.partData[index].typeAmount > state.partData[index].typeMax) {
          categorizedListItem = initialState.partData[index].listItems; //ใช้ไม่ได้
          state.partData[index].listItems = initialState.partData[index].listItems; //อันนี้ได้
        }
      }
    },

    //เรื่องราคาเหมารวมจบใน action เดียวเลย
    updateSummations: (state, action) => {
      let sumAll_SRP_Prices = 0;
      let sumAllDiscount = 0;
      let sumAllPrices = 0;
      let sumAllAmount = 0;
      map(state.partData, (item) => {
        map(item.listItems, (miniItem) => {
          sumAllPrices += miniItem.promotionPrice * miniItem.selectAmount;
          sumAllDiscount += (miniItem.srp - miniItem.promotionPrice) * miniItem.selectAmount;
          sumAll_SRP_Prices += miniItem.srp * miniItem.selectAmount;
          sumAllAmount += miniItem.selectAmount;
        });
      });

      state.summations.sum_SRP = sumAll_SRP_Prices;
      state.summations.sumDiscount = sumAllDiscount;
      state.summations.sumPrice = sumAllPrices;
      state.summations.sumAmount = sumAllAmount;
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
  updateSummations,
  setTypeAmount,
  batchAdd,
} = customizeSlice.actions;
export default customizeSlice.reducer;
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
    },
    {
      category: "mb",
      categoryDisplay: "Mainboard",
      dbCategory: "MB",
      typeMax: 1,
      typeAmount: 0,
      listItems: [],
    },
    {
      category: "ram",
      categoryDisplay: "RAM",
      dbCategory: "RAM",
      typeMax: 4,
      typeAmount: 0,
      listItems: [],
    },
    {
      category: "vga",
      categoryDisplay: "VGA",
      dbCategory: "VGA",
      typeMax: null,
      typeAmount: 0,
      listItems: [],
    },
    {
      category: "ssd",
      categoryDisplay: "SSD",
      dbCategory: "SSD",
      typeMax: null,
      typeAmount: 0,
      listItems: [],
    },
    {
      category: "hdd",
      categoryDisplay: "HDD",
      dbCategory: "HDD",
      typeMax: null,
      typeAmount: 0,
      listItems: [],
    },
    {
      category: "liquidcooling",
      categoryDisplay: "Liquid Cooling",
      dbCategory: "Liquid Cooling",
      typeMax: null,
      typeAmount: 0,
      listItems: [],
    },
    {
      category: "aircooling",
      categoryDisplay: "Air Cooling",
      dbCategory: "Air Cooling",
      typeMax: null,
      typeAmount: 0,
      listItems: [],
    },
    {
      category: "fancase",
      categoryDisplay: "FAN CASE",
      dbCategory: "FAN CASE",
      typeMax: null,
      typeAmount: 0,
      listItems: [],
    },
    {
      category: "thermalcompound",
      categoryDisplay: "Thermal compound",
      dbCategory: "Thermal compound",
      typeMax: null,
      typeAmount: 0,
      listItems: [],
    },
    {
      category: "sleevecable",
      categoryDisplay: "Sleeve Cable",
      dbCategory: "Sleeve Cable",
      typeMax: null,
      typeAmount: 0,
      listItems: [],
    },
    {
      category: "lcs",
      categoryDisplay: "LCS",
      dbCategory: "LCS",
      typeMax: null,
      typeAmount: 0,
      listItems: [],
    },
    {
      category: "gpuextender",
      categoryDisplay: "GPU Extender",
      dbCategory: "GPU Extender",
      typeMax: null,
      typeAmount: 0,
      listItems: [],
    },
    {
      category: "gpuholder",
      categoryDisplay: "GPU HOLDER",
      dbCategory: "GPU HOLDER",
      typeMax: null,
      typeAmount: 0,
      listItems: [],
    },
    {
      category: "powersupply",
      categoryDisplay: "Power supply",
      dbCategory: "Power supply",
      typeMax: null,
      typeAmount: 0,
      listItems: [],
    },
    {
      category: "case",
      categoryDisplay: "CASE",
      dbCategory: "CASE",
      typeMax: null,
      typeAmount: 0,
      listItems: [],
    },
  ],
  itemsList: [],
  summations: { sumAmount: 0, sum_SRP: 0, sumDiscount: 0, sumPrice: 0 },
};

export const customizeSlice = createSlice({
  name: "customize",
  initialState,
  reducers: {
    //Main Action (1 action ต่อ 1 ปุ่ม)///////////////////////////////////////////////
    addProduct: (state, action) => {
      const categoryIndex = state.partData.findIndex(
        (item) => item.category === action.payload.category.toLowerCase().replace(" ", "")
      );

      console.log("ใน slice", action.payload);

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
      console.log("newArray2: ", newArray2);

      //* เช็คสมาชิกใหม่ว่า load เท่าไหร่ เนื่องจากมี max capa ทำให้ต้องดู load ว่าเกิน max capaหรือไม่
      const typeMaxConsumtion = newArray2.selectAmount * newArray2.countItem;
      console.log("ค่าโหลดของสินค้าที่ Add เท่าไหร่: ", typeMaxConsumtion);

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
                console.log("สินค้ายังไม่เกินกว่ากำหนด");
                if (isFoundItem) {
                  console.log("เจอซ้ำ", isFoundItem.id);
                  isFoundItem.selectAmount += 1;
                } else {
                  console.log("ไม่เจอ", isFoundItem);
                  currentStateType.listItems.push(newArray2);
                }
              } else {
                console.log("สินค้าเกินจำนวนที่กำหนด");
              }
              console.log("หน้าตาเป็นไงแล้ว:", JSON.stringify(currentStateType.listItems));
            }
          }
        } else {
          console.log(currentStateType.category, "ไม่มีtypeMaxนี่นา");
          if (currentStateType.listItems.length > 0) {
            console.log("มีไอเต็มใน", currentStateType.category, "หรือไม่");
            if (isFoundItem) {
              isFoundItem.selectAmount++;
            }
          } else {
            console.log(`ไม่เคยมี Item ใน category ${currentStateType.category} มาก่อนต้องใส่ลงไป`);
            currentStateType.listItems.push(newArray2);
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
      console.log("Arrayในประเภทที่เลือก: ", JSON.stringify(categorizedListItem));

      const miniIndex = action.payload.miniIndex;

      if (index !== -1) {
        console.log("indexที่เอามา splice: ", miniIndex);
        categorizedListItem.splice(miniIndex, 1); //ลบ สมาชิก 1 ตัว ที่มีตำแหน่งindex = miniIndex ออกจาก Array categorizedListItem
        console.log("splice แล้วเหลือไร: ", JSON.stringify(categorizedListItem));

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
          console.log("มีป่าวหว่า: ", JSON.stringify(categorizedListItem[miniIndex]));
        }

        let totalAmount = 0; // Initialize the total amount to 0
        // Loop through the listItems array of the RAM object
        for (let i = 0; i < state.partData[index].listItems.length; i++) {
          let item = state.partData[index].listItems[i];
          totalAmount += item.selectAmount * (item.countItem ? item.countItem : 1); // Add the product of selectAmount and count to the total amount
        }
        state.partData[index].typeAmount = totalAmount; // Assign the total amount to the typeAmount property of the RAM object
      } else {
        console.log("ไม่มี Typemax");
        if (index !== -1) {
          categorizedListItem[miniIndex].selectAmount++;
          console.log("มีป่าวหว่า: ", JSON.stringify(categorizedListItem[miniIndex]));
        }
      }
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
      console.log("sumAllItem มีค่าเท่าไหร่", sumAllItem);
      state.partData[index].typeAmount = sumAllItem;
    },

    //Sub Action (ใช้ ร่วมกับ action หลัก)----------------------------------
    //actionนี้ถูกใช้หลังจากเช็คว่าไอเท็มที่แอดมา เป็น mainboard หรือไม่ ถ้ามีให้ใช้ action
    setMax: (state, action) => {
      const index = state.partData.findIndex((item) => item.category === "ram");
      console.log("setMaxทำงาน: ", state.partData[index].category, "Payload:", action.payload);

      //มีผลกับ MaxRAM ตรวจว่ามี mainboard หรือไม่ สำหรับเช็ค maxRAM
      const isMbSelected = state.partData[1].listItems.length;

      if (index !== -1 || isMbSelected) {
        //กรณีมี Payload
        if (action.payload) {
          state.partData[index].typeMax = action.payload;
          console.log(
            "setMaxทำงาน:เงื่อนไขแรก ",
            JSON.stringify(state.partData[index]),
            " ",
            "slotที่ได้: ",
            action.payload
          );
        } else {
          console.log("ไม่มี Payload");
          state.partData[index].typeMax = initialState.partData[index].typeMax;
          if (state.partData[1].listItems[0] && !action.payload) {
            //มีเมนบอร์ดป่าว?
            console.log("มีเมนบอดแต่ payload = ", action.payload);
            state.partData[index].typeMax = action.payload; //มีก็set max slot ไว้
          } else {
            console.log("ไม่มีเมนบอด: ");
            state.partData[index].typeMax = initialState.partData[index].typeMax; // ไม่มีก็set เป็นค่าเริ่มต้น
          }
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

      console.log("ราคาทั้งหมด: ", sumAllPrices);
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

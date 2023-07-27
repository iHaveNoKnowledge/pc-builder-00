import { createSlice } from "@reduxjs/toolkit";
import { filter, map, chain, reduce, mapValues, value, findIndex, find } from "lodash";

const initialState = {
  partData: [
    {
      category: "cpu",
      categoryDisplay: "CPU",
      typeMax: 1,
      typeAmount: 0,
      listItems: [],
    },
    {
      category: "mb",
      categoryDisplay: "Mainboard",
      typeMax: 1,
      typeAmount: 0,
      listItems: [],
    },
    {
      category: "ram",
      categoryDisplay: "RAM",
      typeMax: 4,
      typeAmount: 0,
      listItems: [],
    },
    {
      category: "vga",
      categoryDisplay: "VGA",
      typeMax: null,
      typeAmount: 0,
      listItems: [],
    },
    {
      category: "ssd",
      categoryDisplay: "SSD",
      typeMax: null,
      typeAmount: 0,
      listItems: [],
    },
    {
      category: "hdd",
      categoryDisplay: "HDD",
      typeMax: null,
      typeAmount: 0,
      listItems: [],
    },
    {
      category: "liquidcooling",
      categoryDisplay: "Liquid Cooling",
      typeMax: null,
      typeAmount: 0,
      listItems: [],
    },
    {
      category: "aircooling",
      categoryDisplay: "Air Cooling",
      typeMax: null,
      typeAmount: 0,
      listItems: [],
    },
    {
      category: "fancase",
      categoryDisplay: "FAN CASE",
      typeMax: null,
      typeAmount: 0,
      listItems: [],
    },
    {
      category: "thermalcompound",
      categoryDisplay: "Thermal compound",
      typeMax: null,
      typeAmount: 0,
      listItems: [],
    },
    {
      category: "sleevecable",
      categoryDisplay: "Sleeve Cable",
      typeMax: null,
      typeAmount: 0,
      listItems: [],
    },
    {
      category: "lcs",
      categoryDisplay: "LCS",
      typeMax: null,
      typeAmount: 0,
      listItems: [],
    },
    {
      category: "gpuextender",
      categoryDisplay: "GPU Extender",
      typeMax: null,
      typeAmount: 0,
      listItems: [],
    },
    {
      category: "gpuholder",
      categoryDisplay: "GPU HOLDER",
      typeMax: null,
      typeAmount: 0,
      listItems: [],
    },
    {
      category: "powersupply",
      categoryDisplay: "Power supply",
      typeMax: null,
      typeAmount: 0,
      listItems: [],
    },
    {
      category: "case",
      categoryDisplay: "CASE",
      typeMax: null,
      typeAmount: 0,
      listItems: [],
    },
  ],

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

      const newArray2 = { ...action.payload };

      for (let key in newArray2) {
        if (newArray2[key] === null || newArray2[key] === undefined) {
          delete newArray2[key];
          delete newArray2["qty"];
        }
      }

      newArray2["selectAmount"] = 1;

      newArray2["category"] = newArray2["category"].toLowerCase().replace(" ", "");

      newArray2["countItem"] = newArray2["countItem"] ? newArray2["countItem"] : 1;

      console.log("newArray2: ", newArray2);

      ///* เก็บค่าใหม่ที่รับเข้ามาดองไว้ใน object ก่อน
      // const newArray = {
      //   id: action.payload.id,
      //   code: action.payload.code,
      //   productDescription: action.payload.productDescription,
      //   title: action.payload.title,
      //   selectAmount: 1,
      //   socket: action.payload.socket,
      //   category: action.payload.category.toLowerCase().replace(" ", ""),
      //   typeRam: action.payload.typeRam,
      //   promotionPrice: action.payload.promotionPrice,
      //   srp: action.payload.srp,
      //   img: action.payload.img,
      //   count: action.payload.count ? action.payload.count : 1,
      //   slot: action.payload.slot,
      //   max: action.payload.max,
      // };

      //เช็คสมาชิกใหม่ว่า load เท่าไหร่ เนื่องจากมี max capa ทำให้ต้องดู load ว่าเกิน max capaหรือไม่
      const typeMaxConsumtion = newArray2.selectAmount * newArray2.count;
      console.log("ค่าโหลดของสินค้าที่ Add เท่าไหร่: ", typeMaxConsumtion);

      if (categoryIndex !== -1) {
        const currentType = state.partData[categoryIndex]; ///currentType จะเป็นการเลือก สมาชิกที่ filter category มาแล้ว
        const isFoundItem = currentType.listItems.find((item) => item.id === action.payload.id); //ตรวจสอบว่ามีแล้วหรือไม่ ถ้าเป็น true isFoundItem เป็น obj ที่เป็นสมาชิก Arr listItems, false จะเป็น undefined ต้องสร้าง obj ใหม่
        if (currentType.typeMax) {
          if (currentType.typeAmount === 0) {
            currentType.listItems.push(newArray2);
          } else {
            if (
              currentType.typeAmount / currentType.typeMax === 1 &&
              currentType.listItems.length < 2 &&
              currentType.typeAmount <= 1
            ) {
              currentType.listItems[0] = newArray2;
            } else {
              if (currentType.typeAmount + typeMaxConsumtion <= currentType.typeMax) {
                console.log("สินค้ายังไม่เกินกว่ากำหนด");
                if (isFoundItem) {
                  console.log("เจอซ้ำ", isFoundItem.id);
                  isFoundItem.selectAmount += 1;
                } else {
                  console.log("ไม่เจอ", isFoundItem);
                  currentType.listItems.push(newArray2);
                }
              } else {
                console.log("สินค้าเกินจำนวนที่กำหนด");
              }
              console.log("หน้าตาเป็นไงแล้ว:", JSON.stringify(currentType.listItems));
            }
          }
        } else {
          if (currentType.listItems.length > 0) {
            if (isFoundItem) {
              isFoundItem.selectAmount++;
            } else {
              currentType.listItems.push(newArray);
            }
          }
        }
      }

      let totalAmount = 0; // Initialize the total amount to 0

      // Loop through the listItems array of the RAM object
      for (let i = 0; i < state.partData[categoryIndex].listItems.length; i++) {
        let item = state.partData[categoryIndex].listItems[i];
        totalAmount += item.selectAmount * (item.count ? item.count : 1); // Add the product of selectAmount and count to the total amount
      }

      state.partData[categoryIndex].typeAmount = totalAmount; // Assign the total amount to the typeAmount property of the RAM object
    },

    //! เกมอาจจะเปลีย่นเล็กน้อยเหมือนจะไม่ได้ใช้
    // batchAdd: (state, action) => {
    //   const newSet = action.payload.itemsSet;
    //   console.log("redux รับ set จาก list", newSet);
    //   // state.partData = newSet;
    // },

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
        categorizedListItem.splice(miniIndex, 1);
        console.log("splice แล้วเหลือไร: ", JSON.stringify(categorizedListItem));

        let totalAmount = 0; // Initialize the total amount to 0
        //ใช้ for loop เพื่อดึงค่า selectAmount(จำนวนสินค้าที่เลือกย่อย) ของสมาชิกที่เหลือแต่ละตัว เพื่อจะได้ไปรวมที่ typeAmount(รวมจำนวนสินค้าทั้งหมด)
        for (let i = 0; i < categorizedListItem.length; i++) {
          console.log("ติดไร: ", JSON.stringify(categorizedListItem.length), i);
          let item = categorizedListItem[i];
          totalAmount += item.selectAmount * (item.count ? item.count : 1); // Add the product of selectAmount and count to the total amount
        }

        state.partData[index].typeAmount = totalAmount; // Assign the total amount to the typeAmount property of the RAM object
        // state.partData[index] = initialState.partData[index];
      }
    },

    incAmount: (state, action) => {
      const index = state.partData.findIndex(
        (item) => item.category === action.payload.category.toLowerCase().replace(" ", "")
      ); //action.payload = category
      const categorizedListItem = state.partData[index].listItems;
      const miniIndex = action.payload.miniIndex;
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
        totalAmount += item.selectAmount * (item.count ? item.count : 1); // Add the product of selectAmount and count to the total amount
      }
      state.partData[index].typeAmount = totalAmount; // Assign the total amount to the typeAmount property of the RAM object
    },

    decAmount: (state, action) => {
      console.log("decAmount ใน store ทำงาน");
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
        totalAmount += item.selectAmount * (item.count ? item.count : 1); // Add the product of selectAmount and count to the total amount
      }
      state.partData[index].typeAmount = totalAmount; // Assign the total amount to the typeAmount property of the RAM object
    },

    resetCustomized: (state, action) => {
      state.partData = initialState.partData;
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

    //Sub Action (ใช้ ร่วมกับ action หลัก)/////////////////////////////////
    //actionนี้ถูกใช้หลังจากเช็คว่าไอเท็มที่แอดมา เป็น mainboard หรือไม่ ถ้ามีให้ใช้ action
    setMax: (state, action) => {
      const index = state.partData.findIndex((item) => item.category === "RAM");
      console.log("setMaxทำงาน: ", index);

      if (index !== -1) {
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
          state.partData[index].typeMax = initialState.partData[index].typeMax;
          if (state.partData[1].listItems[0]) {
            //มีเมนบอร์ดป่าว?
            console.log("มีเมนบอด: ");
            state.partData[index].typeMax = state.partData[1].listItems[0].slot; //มีก็set max slot ไว้
          } else {
            console.log("ไม่มีเมนบอด: ");
            state.partData[index].typeMax = initialState.partData[index].typeMax; // ไม่มีก็set เป็นค่าเริ่มต้น
          }
        }

        let categorizedListItem = state.partData[index].listItems;

        let totalAmount = 0; // Initialize the total amount to 0
        for (let i = 0; i < categorizedListItem.length; i++) {
          let item = categorizedListItem[i];
          totalAmount += item.selectAmount * (item.count ? item.count : 1); // Add the product of selectAmount and count to the total amount
        }

        state.partData[index].typeAmount = totalAmount; // Assign the total amount to the typeAmount property of the RAM object

        if (state.partData[index].typeAmount > state.partData[index].typeMax) {
          categorizedListItem = initialState.partData[index].listItems; //ใช้ไม่ได้
          state.partData[index].listItems = initialState.partData[index].listItems; //อันนี้ได้
        }
      }
    },

    updateSumAmount: (state, action) => {
      let sumAllAmount = 0;
      map(state.partData, (item) => {
        map(item.listItems, (miniItem) => {
          sumAllAmount += miniItem.selectAmount;
        });
      });
      console.log("จำนวนทั้งหมด: ", sumAllAmount);
      state.summations.sumAmount = sumAllAmount;
    },

    //เรื่องราคาเหมารวมจบใน action เดียวเลย
    updateSumPrices: (state, action) => {
      let sumAll_SRP_Prices = 0;
      let sumAllDiscount = 0;
      let sumAllPrices = 0;
      map(state.partData, (item) => {
        map(item.listItems, (miniItem) => {
          sumAllPrices += miniItem.promotionPrice * miniItem.selectAmount;
          sumAllDiscount += (miniItem.srp - miniItem.promotionPrice) * miniItem.selectAmount;
          sumAll_SRP_Prices += miniItem.srp * miniItem.selectAmount;
        });
      });

      console.log("ราคาทั้งหมด: ", sumAllPrices);
      state.summations.sum_SRP = sumAll_SRP_Prices;
      state.summations.sumDiscount = sumAllDiscount;
      state.summations.sumPrice = sumAllPrices;
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
  batchAdd,
} = customizeSlice.actions;
export default customizeSlice.reducer;

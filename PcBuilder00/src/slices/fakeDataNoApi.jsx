import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    items : [
        {
          id: 1,
          title: "sword01",
          category: "sword",
          slot: "2",
          price: 2645,
          discount: 0.8,
        },
        {
          id: 2,
          title: "sword02",
          category: "sword",
          slot: "3",
          price: 9255,
          discount: 0.8,
        },
        {
          id: 3,
          title: "shield01",
          category: "shield",
          price: 7210,
          discount: 0.9,
        },
        {
          id: 4,
          title: "shield02",
          category: "shield",
          price: 14190,
          discount: 0.85,
        },
        {
          id: 5,
          title: "upperHead01",
          category: "upHead",
          price: 10725,
          discount: 0.7,
        },
        {
          id: 6,
          title: "upperHead02",
          category: "upHead",
          price: 3485,
          discount: 0.63,
        },
        { id: 7, title: "card01", category: "card", price: 18045, discount: 0.81 },
        { id: 8, title: "card02", category: "card", price: 10020, discount: 0.68 },
        {
          id: 9,
          title: "CPU01_AMD",
          category: "CPU",
          socket: "AM4",
          img:
            "https://media-cdn.bnn.in.th/263562/730143309936-00-square_medium.jpg",
          price: 19290,
          discount: 0.53,
        },
        {
          id: 11,
          title: "CPU02_AMD",
          category: "CPU",
          socket: "AM4",
          img:
            "https://media-cdn.bnn.in.th/52122/AMD-CPU-Ryzen7-5800X-3.8GHz-8C-16T-AM4-gen5-1-square_medium.jpg",
          price: 5715,
          discount: 0.51,
        },
        {
          id: 12,
          title: "CPU01_intel",
          category: "CPU",
          socket: "1700",
          img:
            "https://media-cdn.bnn.in.th/164968/intel-core-i5-12400-1-square_medium.jpg",
          price: 1250,
          discount: 0.75,
        },
        {
          id: 13,
          title: "CPU02_intel",
          category: "CPU",
          socket: "1700",
          img:
            "https://media-cdn.bnn.in.th/264216/intel-core-i9-13900F-1-square_medium.jpg",
          price: 17270,
          discount: 0.52,
        },
        {
          id: 14,
          title: "Mainboard01_AMD",
          category: "Mainboard",
          socket: "AM4",
          typeRAM: "DDR4",
          slot: 2,
          img:
            "https://media-cdn.bnn.in.th/19033/Asus-Mainboard-PRIME-A320M-K-DDR4-AM4-1-square_medium.jpg",
          price: 10560,
          discount: 0.84,
        },
        {
          id: 15,
          title: "Mainboard02_AMD",
          category: "Mainboard",
          socket: "AM5",
          typeRAM: "DDR5",
          slot: 2,
          img:
            "https://media-cdn.bnn.in.th/257878/gigabyte-b650i-aorus-ultra-1-square_medium.jpg",
          price: 18765,
          discount: 0.54,
        },
        {
          id: 16,
          title: "Mainboard01_intel",
          category: "Mainboard",
          socket: "1700",
          typeRAM: "DDR4",
          slot: 2,
          img:
            "https://media-cdn.bnn.in.th/171658/asrock-b660m-hdv-ddr4-1-square_medium.jpg",
          price: 16455,
          discount: 0.84,
        },
        {
          id: 17,
          title: "Mainboard02_intel",
          category: "Mainboard",
          socket: "1700",
          typeRAM: "DDR5",
          slot: 2,
          img:
            "https://www.jib.co.th/img_master/product/medium/2022110817133356180_1.jpg",
          price: 9100,
          discount: 0.59,
        },
        {
          id: 18,
          title: "Mainboard01_AMD 4slot",
          category: "Mainboard",
          socket: "AM4",
          typeRAM: "DDR4",
          slot: 4,
          img:
            "https://media-cdn.bnn.in.th/17709/AsRock-Mainboard-B550-Steel-Legend-AM4-1-square_medium.jpg",
          price: 10510,
          discount: 0.58,
        },
        {
          id: 19,
          title: "Mainboard02_AMD 4slot",
          category: "Mainboard",
          socket: "AM5",
          typeRAM: "DDR5",
          slot: 4,
          img:
            "https://media-cdn.bnn.in.th/241066/asrock-x670e-pg-lightning-am5-1-square_medium.jpg",
          price: 11400,
          discount: 0.88,
        },
        {
          id: 20,
          title: "Mainboard01_intel 4slot",
          category: "Mainboard",
          socket: "1700",
          typeRAM: "DDR4",
          slot: 4,
          img:
            "https://media-cdn.bnn.in.th/156972/asus-prime-z690-p-d4-csm-1-square_medium.jpg",
          price: 7290,
          discount: 0.7,
        },
        {
          id: 21,
          title: "Mainboard02_intel 4slot",
          category: "Mainboard",
          socket: "1700",
          typeRAM: "DDR5",
          slot: 4,
          img:
            "https://media-cdn.bnn.in.th/258336/msi-mag-z790-tomahawk-wifi-d5-1-square_medium.jpg",
          price: 3790,
          discount: 0.6,
        },
        {
          id: 22,
          title: "RAM01_single",
          category: "RAM",
          count: 1,
          typeRAM: "DDR4",
          img:
            "https://media-cdn.bnn.in.th/106735/zadak-moab-aura2-rgb-ddr4-1-square_medium.jpg",
          price: 7460,
          discount: 0.51,
        },
        {
          id: 23,
          title: "RAM02_single",
          category: "RAM",
          count: 1,
          typeRAM: "DDR5",
          img:
            "https://media-cdn.bnn.in.th/279728/zadak-ddr5-spark-rgb-white-1-square_medium.jpg",
          price: 10780,
          discount: 0.72,
        },
        {
          id: 24,
          title: "RAM01_duo",
          category: "RAM",
          count: 2,
          typeRAM: "DDR4",
          img:
            "https://media-cdn.bnn.in.th/106729/zadak-moab-aura2-rgb-ddr4-1-square_medium.jpg",
          price: 14920,
          discount: 0.52,
        },
        {
          id: 25,
          title: "RAM01_duo",
          category: "RAM",
          count: 2,
          typeRAM: "DDR5",
          img:
            "https://media-cdn.bnn.in.th/277595/consair-vengeance-rgb-ddr5-kit-black-1-square_medium.jpg",
          price: 18745,
          discount: 0.64,
        },
        {
          id: 26,
          title: "CPU03_AMD",
          category: "CPU",
          socket: "AM5",
          img:
            "https://media-cdn.bnn.in.th/280791/amd-ryzen9-7900x3d-1-square_medium.jpg",
          price: 14740,
          discount: 0.92,
        },
        {
          id: 27,
          title: "CPU04_AMD",
          category: "CPU",
          socket: "AM5",
          img:
            "https://media-cdn.bnn.in.th/240481/amd-ryzen9-7950x-1-square_medium.jpg",
          price: 17885,
          discount: 0.7,
        }
      ],
};

export const fakeDataNoApi = createSlice({
    name:"fakeData",
    initialState,

})

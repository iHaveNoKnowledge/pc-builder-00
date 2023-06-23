import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import { queryCache } from "react-query";

//* อันนี้ Fetch จาก JSON server
export const apiSlice = createApi({
  reducerPath: "apiSlice",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/",
  }),
  tagTypes: ["Post"],
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: () => "/items2",
    }),
  }),
});

// // สร้าง WebSocket connection
// const socket = new WebSocket("ws://192.168.0.25:9000/ws");
//* อันนี้ Fetch จาก SQL server 192.168
export const apiSliceDb = createApi({
  reducerPath: "apiSliceDb",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://192.168.0.25:9000/api",
  }),
  endpoints: (builder) => ({
    getDbItem: builder.query({
      query: () => "/testProducts",
    }),
  }),
});

//*
export const updateApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "http://192.168.0.25:9000/api" }),
  endpoints: (builder) => ({
    updateData: builder.mutation({
      query: (data) => ({
        url: "/create-set",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

// // ฟังก์ชันสำหรับอัปเดตข้อมูลในแอปพลิเคชัน
// const updateData = () => {
//   // อัปเดตข้อมูลในแอปพลิเคชันด้วย invalidateQueries
//   queryCache.invalidateQueries("getDbItem");
// };

// // เมื่อมีการเชื่อมต่อ WebSocket
// socket.onopen = () => {
//   console.log("WebSocket connection established");
// };

// // เมื่อมีข้อมูลเข้ามาผ่าน WebSocket
// socket.onmessage = (event) => {
//   console.log("Received data from WebSocket:", event.data);

//   // อัปเดตข้อมูลในแอปพลิเคชันเมื่อมีการเปลี่ยนแปลง
//   updateData();
// };

//** ดึงข้อมูล
export const { useGetPostsQuery } = apiSlice;
export const { useGetDbItemQuery } = apiSliceDb;

//** DB DATA Create and Mutatation
console.log("apiSliceDb", updateApi);
export const { useUpdateDataMutation } = updateApi;

///source
///https://www.positronx.io/react-fetch-data-with-redux-toolkit-rtk-query-tutorial/

// export const subscribeDbItem = (callback) => {
//   const socket = new WebSocket("ws://192.168.0.25:9000/api");

//   socket.addEventListener("open", () => {
//     console.log("WebSocket connected");
//   });

//   socket.addEventListener("close", (e) => {
//     console.log("WebSocket disconnected", e);
//   });

//   socket.addEventListener("message", (event) => {
//     const data = JSON.parse(event.data);
//     callback(data);
//   });

//   return socket;
// };

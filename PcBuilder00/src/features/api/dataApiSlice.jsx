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

//* อันนี้ Get Fetch จาก SQL server 192.168
export const apiSliceDb = createApi({
  reducerPath: "apiSliceDb",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://192.168.0.25:9000/api",
  }),
  endpoints: (builder) => ({
    getDbItem: builder.query({
      query: () => "/testProducts",
    }),
    getSets: builder.query({
      query: () => "/sets",
    }),
  }),
});

//* Post
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

//** ดึงข้อมูล
export const { useGetPostsQuery } = apiSlice;
export const { useGetDbItemQuery, useGetSetsQuery } = apiSliceDb;

//** DB DATA Create and Mutatation
console.log("apiSliceDb", updateApi);
export const { useUpdateDataMutation } = updateApi;

///source
///https://www.positronx.io/react-fetch-data-with-redux-toolkit-rtk-query-tutorial/

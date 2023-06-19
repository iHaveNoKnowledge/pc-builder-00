import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

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

//* อันนี้ Fetch จาก JSON server

export const { useGetPostsQuery } = apiSlice;
export const { useGetDbItemQuery } = apiSliceDb;

///source
///https://www.positronx.io/react-fetch-data-with-redux-toolkit-rtk-query-tutorial/

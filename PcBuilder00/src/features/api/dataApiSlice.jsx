import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import { queryCache } from "react-query";

//* Fetch จาก JSON server
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

const baseUrl = "http://192.168.0.25:9000/api";

//* Get Fetch จาก SQL server 192.168
export const apiSliceDb = createApi({
  reducerPath: "apiSliceDb",
  baseQuery: fetchBaseQuery({
    baseUrl,
  }),
  endpoints: (builder) => ({
    getDbItem: builder.query({
      query: () => "/testProducts",
    }),
    getSets: builder.query({
      query: () => "/sets",
    }),
    deleteResource: builder.mutation({
      query: (resourceID) => ({
        url: `/pop/${resourceID}`,
        method: "DELETE",
      }),
    }),
  }),
});

//* Post
export const updateApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl }),
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

// //* Delete
// export const deleteResource = apiSliceDb.injectEndpoints({
//   endpoints: (builder) => ({
//     deleteResource: builder.mutation({
//       query: (resourceID) => ({
//         url: `/pop/${resourceID}`,
//         method: "DELETE",
//       }),
//     }),
//   }),
// });

//** ดึงข้อมูล
export const { useGetPostsQuery } = apiSlice;
export const { useGetDbItemQuery, useGetSetsQuery, useDeleteResourceMutation } = apiSliceDb;

//** DB DATA Create
export const { useUpdateDataMutation } = updateApi;

//** DB DATA DELETE
// export const { useDeleteResourceMutation } = deleteResource;

///source
///https://www.positronx.io/react-fetch-data-with-redux-toolkit-rtk-query-tutorial/

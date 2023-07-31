import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import { queryCache } from "react-query";

//* Fetch จาก JSON server
export const apiSlice = createApi({
  reducerPath: "apiSlice",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000",
  }),
  tagTypes: ["test"],
  endpoints: (builder) => ({
    getPosts: builder.query({
      // query: () => "/items2",
      query: (args) => {
        const { startPage, pageEnd, perPage, category } = args;
        return `/items2?category=${category}&_limit=${pageEnd}`;
      },
      onSuccess: (data) => {
        console.log("fetch เรียบร้อย", data);
      },
      onError: (err) => {
        console.error(err);
      },
    }),
  }),
});

//* Fetch จาก JSONplaceHolder
export const apiSliceJSONPlaceHolder = createApi({
  reducerPath: "apiSliceJSONPlaceHolder",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://jsonplaceholder.typicode.com",
  }),
  tagTypes: ["placeholder"],
  endpoints: (builder) => ({
    getPhotos: builder.query({
      // query: () => "/items2",
      query: (args) => {
        const { startPage, pageEnd, perPage, category } = args;
        return `/photos?_start=${startPage}&_limit=54`;
      },
      onSuccess: (data) => {
        console.log("fetch เรียบร้อย", data);
      },
      onError: (err) => {
        console.error(err);
      },
    }),
  }),
});

const baseUrl = "http://192.168.0.25:9000/api";

//* Gets and a Delete Fetch จาก SQL server 192.168
export const apiSliceDb = createApi({
  reducerPath: "apiSliceDb",
  baseQuery: fetchBaseQuery({
    baseUrl,
  }),
  endpoints: (builder) => ({
    getDbItem: builder.query({
      query: ({ category }) => `/testProducts?category=${category}`,
      providesTags: ["DbItems"], //Add Tag ให้กับข้อมูล]ที่ fetch มา
    }),

    getDbItem2: builder.query({
      query: (page) => `/testProducts2?page=${page}&limit=6`,
      providesTags: ["DbItems2"], //Add Tag ให้กับข้อมูล]ที่ fetch มา
    }),

    getSets: builder.query({
      query: () => "/sets",
      providesTags: ["Sets"], //Add Tag ให้กับข้อมูล]ที่ fetch มา
    }),

    deleteResource: builder.mutation({
      query: (resourceID) => ({
        url: `/pop/${resourceID}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Sets"], //หากTagที่ระบุมีการเปลี่ยนแปลงจากฟังชั่นนี้ สมาชิกใน cache ตัวใดๆที่มีTagที่ระบุนี้จะถูกสร้างใหม่หากข้อมูลไม่ตรงกัน
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
export const { useGetPostsQuery, useLazyGetPostsQuery } = apiSlice;
export const {
  useGetDbItemQuery,
  useGetDbItem2Query,
  useGetSetsQuery,
  useDeleteResourceMutation,
} = apiSliceDb;

export const { useGetPhotosQuery } = apiSliceJSONPlaceHolder;

//** DB DATA Create
export const { useUpdateDataMutation } = updateApi;

//** DB DATA DELETE
// export const { useDeleteResourceMutation } = deleteResource;

///source
///https://www.positronx.io/react-fetch-data-with-redux-toolkit-rtk-query-tutorial/

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const baseUrl = "http://115.31.167.30:49152/api";
// const baseUrl = "http://192.168.0.25:9000/api";

// Gets and a Delete Fetch จาก SQL server 192.168
export const apiSliceDb = createApi({
  reducerPath: "apiSliceDb",
  baseQuery: fetchBaseQuery({
    baseUrl,
  }),
  tagTypes: ["Sets"],
  endpoints: (builder) => ({
    getDbItem: builder.query({
      query: ({ dbCategory, currentPage }) =>
        `/testProducts?category=${dbCategory}&page=${currentPage}`,
      providesTags: ["DbItems"], //Add Tag ให้กับข้อมูล]ที่ fetch มา
    }),

    getSets: builder.query({
      query: () => "/sets",
      providesTags: ["Sets"], //Add Tag ให้กับข้อมูล]ที่ fetch มา
    }),

    updateData: builder.mutation({
      query: (data) => ({
        url: "/create-set",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Sets"],
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
export const apiPutSets = createApi({
  reducerPath: "putSets",
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

//** ดึงข้อมูล
export const {
  useGetDbItemQuery,
  useGetSetsQuery,
  useLazyGetSetsQuery,
  useDeleteResourceMutation,
} = apiSliceDb;

//** DB DATA Create
export const { useUpdateDataMutation } = apiPutSets;

///source
///https://www.positronx.io/react-fetch-data-with-redux-toolkit-rtk-query-tutorial/

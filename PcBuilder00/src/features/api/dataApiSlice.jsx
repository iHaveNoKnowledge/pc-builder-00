import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const publicApi = import.meta.env.VITE_APP_DB_API_PUBLIC;
const publicTestApi = import.meta.env.VITE_APP_DB_API_PRODUCTION_TEST;
const testApi = import.meta.env.VITE_APP_DB_API_TEST;

const baseUrl = `${publicTestApi}`;

// Gets and a Delete Fetch จาก SQL server 192.168
export const apiSliceDb = createApi({
  reducerPath: "apiSliceDb",
  baseQuery: fetchBaseQuery({
    baseUrl,
  }),
  tagTypes: ["Sets", "DbItems"],
  endpoints: (builder) => ({
    getDbItem: builder.query({
      query: ({ dbCategory, currentPage }) => `/testProducts?category=${dbCategory}&page=${currentPage}`,
      providesTags: ["DbItems"], //Add Tag ให้กับข้อมูล]ที่ fetch มา
    }),

    getSets: builder.query({
      query: () => "/sets",
      providesTags: (result, err, arg) => [{ type: "Sets", id: "all" }], //Add Tag ให้กับข้อมูล]ที่ fetch มา
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
      invalidatesTags: (result, error, arg) => [
        { type: "Sets", id: "all" },
        { type: "Sets", id: arg.id },
      ], //หากTagที่ระบุมีการเปลี่ยนแปลงจากฟังชั่นนี้ สมาชิกใน cache ตัวใดๆที่มีTagที่ระบุนี้จะถูกสร้างใหม่หากข้อมูลไม่ตรงกัน
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
export const { useGetDbItemQuery, useGetSetsQuery, useLazyGetSetsQuery, useDeleteResourceMutation } = apiSliceDb;

//** DB DATA Create
export const { useUpdateDataMutation } = apiPutSets;

///source
///https://www.positronx.io/react-fetch-data-with-redux-toolkit-rtk-query-tutorial/

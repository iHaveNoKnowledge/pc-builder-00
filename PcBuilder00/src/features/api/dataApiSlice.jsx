import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
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

export const { useGetPostsQuery } = apiSlice;

///source
///https://www.positronx.io/react-fetch-data-with-redux-toolkit-rtk-query-tutorial/

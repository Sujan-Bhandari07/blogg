import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const blogApi = createApi({
  reducerPath: "blogApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BACKEND_URI,
    credentials: "include",
  }),
  tagTypes: ['Blog'],

  endpoints: (builder) => ({
    addblog: builder.mutation({
      query: (data) => ({
        url: "/api/blog/createblog",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ['Blog'],
    }),

    getownpost: builder.query({
      query: () => ({
        url: "/api/blog/getownblog",
        method: "GET",
      }),
      providesTags: ['Blog'],
    }),


    getallpost: builder.query({
      query: () => ({
        url: "/api/blog/getallblog",
        method: "GET",
      }),
      providesTags: ['Blog'],
    }),

    getidpost: builder.mutation({
      query: (body) => ({
        url: "/api/blog/getblogbyid",
        method: "POST",
        body:body
      }),
providesTags:["Blog"]

    }),

    sendcomment: builder.mutation({
      query: (body) => ({
        url: "/api/comment/sendcomment",
        method: "POST",
        body:body
      }),
      invalidatesTags:["Blog"]

    }),






    getPostById: builder.query({
      query: (id) => ({
        url: `/api/blog/getblog/${id}`,
        method: "GET",
      }),
      providesTags: ['Blog'],
    }),
  }),
});

export const { useAddblogMutation,useSendcommentMutation,useGetidpostMutation, useGetownpostQuery, useGetPostByIdQuery,useGetallpostQuery} = blogApi;

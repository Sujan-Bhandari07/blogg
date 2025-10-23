import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({
    baseUrl: "https://blogg-sfpb.onrender.com" ,
    credentials:"include" // adjust to your backend URL
  }),

  endpoints: (builder) => ({
    registeruser: builder.mutation({
      query: (data) => ({
        url:"/api/user/register",
        method:"POST",
        body:data
      }),

    }),
    login: builder.mutation({
      query: (data) => ({
        url:"/api/user/login",
        method:"POST",
        body:data
      }),

    }),
    sendresetotp: builder.mutation({
      query: (data) => ({
        url:"/api/user/sendresetotp",
        method:"POST",
        body:data
      }),

    }),

getuser: builder.query({
      query: () => ({
        url:"/api/user/getuser",
        method:"GET",

      }),

    }),



  checkresetotp: builder.mutation({
      query: (data) => ({
        url:"/api/user/checkresetotp",
        method:"POST",
        body:data
      }),

    }),

    sendverifyotp: builder.mutation({
      query: (data) => ({
        url:"/api/user/sendverifyotp",
        method:"POST",
        body:data
      }),

    }),

    checkverifyotp: builder.mutation({
      query: (data) => ({
        url:"/api/user/checkverifyotp",
        method:"POST",
        body:data
      }),

    }),





    

    
    // GET /posts/:id
   
  }),
});

export const {useGetuserQuery, useRegisteruserMutation,useLoginMutation,useCheckresetotpMutation ,useSendresetotpMutation, useSendverifyotpMutation, useCheckverifyotpMutation} = userApi;

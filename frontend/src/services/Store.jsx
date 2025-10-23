import { configureStore } from '@reduxjs/toolkit';
import userReducer from './Userslice';
import blogReducer from './Blogslice';
import { userApi } from './Userapi';
import { blogApi } from './Blogapi';

export const store = configureStore({
  reducer: {
    user: userReducer,
    blog: blogReducer,
    [blogApi.reducerPath]: blogApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(blogApi.middleware, userApi.middleware),
});

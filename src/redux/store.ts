/** @format */

import { configureStore } from "@reduxjs/toolkit";
import postReducer from "./postSlice";
import usersSlice from "./usersSlice";
import themeSlice from "./themeSlice";
import messageSlice from "./messageSlice";
import exploreSlice from "./exploreSlice";

const store = configureStore({
  reducer: {
    posts: postReducer,
    user: usersSlice,
    theme: themeSlice,
    messages: messageSlice,
    explore: exploreSlice,
  },
});

export default store;
export type AppDispatch = typeof store.dispatch;

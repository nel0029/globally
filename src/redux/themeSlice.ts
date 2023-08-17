/** @format */

import { createSlice } from "@reduxjs/toolkit";

const themeSlice = createSlice({
  name: "theme",
  initialState: {
    darkMode: localStorage.getItem("darkMode") === "true",
    isMenuOpen: false,
  },
  reducers: {
    setMode: (state, action) => {
      const darkMode = action.payload;
      state.darkMode = darkMode;
      localStorage.setItem("darkMode", String(darkMode)); // Convert boolean to string
    },
    openMenu: (state, action) => {
      state.isMenuOpen = action.payload;
    },
  },
});

export const { setMode, openMenu } = themeSlice.actions;
export default themeSlice.reducer;

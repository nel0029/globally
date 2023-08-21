/** @format */

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  darkMode: localStorage.getItem("darkMode") === "true",
  isMenuOpen: false,
};
const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setMode: (state, action) => {
      const darkMode = action.payload;
      state.darkMode = darkMode;
      localStorage.setItem("darkMode", String(darkMode)); // Convert boolean to string
    },
    openMenu: (state, action) => {
      state.isMenuOpen = action.payload;
    },
    resetThemeState: (state) => {
      state = initialState;
    },
  },
});

export const { setMode, openMenu, resetThemeState } = themeSlice.actions;
export default themeSlice.reducer;

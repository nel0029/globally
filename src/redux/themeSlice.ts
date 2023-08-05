/** @format */

import { createSlice } from "@reduxjs/toolkit";

const themeSlice = createSlice({
  name: "theme",
  initialState: {
    darkMode: localStorage.getItem("darkMode") === "true",
  },
  reducers: {
    setMode: (state, action) => {
      const darkMode = action.payload;
      state.darkMode = darkMode;
      localStorage.setItem("darkMode", String(darkMode)); // Convert boolean to string
    },
  },
});

export const { setMode } = themeSlice.actions;
export default themeSlice.reducer;

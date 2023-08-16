/** @format */

import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllTrendingHashtags = createAsyncThunk(
  "getAllHashtags",
  async () => {
    try {
      const response = await axios.get("/explore/search/trends");
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const searchPostsByWord = createAsyncThunk(
  "searchPostsByWord",
  async (data: any) => {
    try {
      const { queryWords, userID } = data;

      const response = await axios.get(
        `/explore/search/posts?query=${queryWords}&userID=${userID}`
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

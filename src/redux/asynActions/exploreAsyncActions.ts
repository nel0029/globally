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
      const { query, userID } = data;

      const response = await axios.get(
        `/explore/search/posts?query=${query}&userID=${userID}`
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const searchKeyWords = createAsyncThunk(
  "searchKeyWords",
  async (data: any) => {
    try {
      const { query, userID } = data;
      const response = await axios.get(
        `/explore/search/keywords?query=${encodeURIComponent(
          query
        )}&userID=${userID}`
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const searchWords = createAsyncThunk(
  "searchWords",
  async (data: any) => {
    try {
      const { query, userID } = data;
      const response = await axios.get(
        `/explore/search/word?query=${query}&userID=${userID}`
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const searchUserByKeyWords = createAsyncThunk(
  "searchUsersByWords",
  async (data: any) => {
    try {
      const { query, userID } = data;
      const response = await axios.get(
        `/explore/search/users?query=${query}&userID=${userID}`
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

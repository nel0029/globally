/** @format */

import { createSlice } from "@reduxjs/toolkit";
import {
  getAllTrendingHashtags,
  searchPostsByWord,
  searchKeyWords,
  searchWords,
  searchUserByKeyWords,
} from "./asynActions/exploreAsyncActions";

interface HashtagsProps {
  name: string;
  postsCount: number;
}

interface ExploreSliceInitialStateProps {
  trendingHashtags: HashtagsProps[] | null;
  queryWords: string | null;
  topResults: any | null;
  matchedPosts: any[] | null;
  matchedUsers: any[] | null;
  matchedKeyWords: any[] | null;
}

const initialState: ExploreSliceInitialStateProps = {
  trendingHashtags: null,
  queryWords: null,
  topResults: null,
  matchedPosts: null,
  matchedUsers: null,
  matchedKeyWords: null,
};

const themeSlice = createSlice({
  name: "explore",
  initialState,
  reducers: {
    setQueryWords: (state, action) => {
      const queryWords = action.payload;
      state.queryWords = queryWords;
    },
    resetMatchedPosts: (state) => {
      state.matchedPosts = null;
      state.queryWords = null;
    },
    resetExploreState: (state) => {
      state = initialState;
    },
    resetMatchedKeyWords: (state) => {
      state.matchedKeyWords = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllTrendingHashtags.fulfilled, (state, action) => {
        const trendingHashtags = action.payload;
        state.trendingHashtags = trendingHashtags;
      })
      .addCase(searchPostsByWord.fulfilled, (state, action) => {
        const matchedPosts = action.payload;
        state.matchedPosts = matchedPosts;
      })
      .addCase(searchKeyWords.fulfilled, (state, action) => {
        const response = action.payload;

        state.matchedKeyWords = response;
      })
      .addCase(searchWords.fulfilled, (state, action) => {
        const response = action.payload;

        state.topResults = response;
      })
      .addCase(searchUserByKeyWords.fulfilled, (state, action) => {
        const response = action.payload;

        state.matchedUsers = response;
      });
  },
});

export const {
  setQueryWords,
  resetMatchedPosts,
  resetExploreState,
  resetMatchedKeyWords,
} = themeSlice.actions;
export default themeSlice.reducer;

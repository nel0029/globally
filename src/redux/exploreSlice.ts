/** @format */

import { createSlice } from "@reduxjs/toolkit";
import {
  getAllTrendingHashtags,
  searchPostsByWord,
} from "./asynActions/exploreAsyncActions";

interface HashtagsProps {
  name: string;
  postsCount: number;
}

interface ExploreSliceInitialStateProps {
  trendingHashtags: HashtagsProps[] | null;
  queryWords: string | null;
  matchedPosts: any[] | null;
}

const initialState: ExploreSliceInitialStateProps = {
  trendingHashtags: null,
  queryWords: null,
  matchedPosts: null,
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
      });
  },
});

export const { setQueryWords, resetMatchedPosts, resetExploreState } =
  themeSlice.actions;
export default themeSlice.reducer;

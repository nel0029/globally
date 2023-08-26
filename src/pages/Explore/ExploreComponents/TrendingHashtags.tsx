/** @format */

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { getAllTrendingHashtags } from "../../../redux/asynActions/exploreAsyncActions";
import { AppDispatch } from "../../../redux/store";

const TrendingHashtags = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const trendingHashTags = useSelector(
    (state: any) => state.explore.trendingHashtags
  );

  useEffect(() => {
    if (!trendingHashTags || trendingHashTags.length === 0) {
      dispatch(getAllTrendingHashtags());
    }
  }, [trendingHashTags]);

  const goTo = (word: string) => {
    navigate(`/explore/search/top?q=${encodeURIComponent(`${word}`)}`);
  };
  return (
    <div className="w-full h-full flex flex-col">
      {trendingHashTags?.map((hashtag: any, index: number) => (
        <div
          key={index}
          onClick={() => goTo(hashtag.name)}
          className="w-full flex flex-col hover:bg-black hover:bg-opacity-20 dark:hover:bg-Dark200 py-1 px-2 border-b dark:border-Dark300 cursor-pointer"
        >
          <div className="font-bold text-lg">{hashtag.name}</div>

          <div className="text-sm text-gray-500">
            {hashtag.postsCount > 1
              ? `${hashtag.postsCount} posts`
              : `${hashtag.postsCount} post`}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TrendingHashtags;

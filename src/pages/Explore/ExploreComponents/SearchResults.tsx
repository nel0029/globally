/** @format */

import React, { useEffect } from "react";
import { Outlet, useParams } from "react-router";
import { useDispatch } from "react-redux";

import SearchNavBar from "./SearchNavBar";
import { AppDispatch } from "../../../redux/store";
import { resetMatchedPosts } from "../../../redux/exploreSlice";

const SearchResults = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    return () => {
      dispatch(resetMatchedPosts());
    };
  }, []);
  const searchBar = document.getElementById("search-bar");
  const searchBarHeight = searchBar?.offsetHeight;
  return (
    <div className={`w-full h-auto flex flex-col sticky top-0 left-0 right-0`}>
      <SearchNavBar />
      <div className="flex-1 w-full h-auto px-2 pt-2">
        <Outlet />
      </div>
    </div>
  );
};

export default SearchResults;

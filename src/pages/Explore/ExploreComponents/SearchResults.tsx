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
    <div className={`w-full h-full flex flex-col `}>
      <SearchNavBar />
      <div className="flex-1 w-full h-full p-2">
        <Outlet />
      </div>
    </div>
  );
};

export default SearchResults;

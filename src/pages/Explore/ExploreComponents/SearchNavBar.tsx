/** @format */

import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const SearchNavBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get("q");

  const [activeTab, setActiveTab] = useState(location.pathname);

  useEffect(() => {
    setActiveTab(location.pathname);
  }, [location.pathname]);

  const goToTopResults = () => {
    setActiveTab("/explore/search/top");
    navigate(`/explore/search/top?q=${query}`);
  };

  const goToPostsResults = () => {
    setActiveTab("/explore/search/posts");
    navigate(`/explore/search/posts?q=${query}`);
  };

  const goToUsersResults = () => {
    setActiveTab("/explore/search/users");
    navigate(`/explore/search/users?q=${query}`);
  };
  const searchBar = document.getElementById("search-bar");
  const searchBarHeight = searchBar?.offsetHeight;
  return (
    <div
      className={`z-50 w-full flex flex-row items-center justify-around bg-white dark:bg-Dark200 pt-1 sticky top-[59px] left-0 right-0`}
    >
      <div
        onClick={goToTopResults}
        className="w-full flex justify-center items-center px-2"
      >
        <div
          className={`${
            activeTab === "/explore/search/top"
              ? "border-b-4 border-secondary hover:border-opacity-100"
              : "border-b-4 border-transparent hover:border-secondary hover:border-opacity-60"
          } w-full font-bold flex justify-center items-center px-2 py-3 cursor-pointer`}
        >
          Top
        </div>
      </div>
      <div
        onClick={goToPostsResults}
        className="w-full flex justify-center items-center px-2"
      >
        <div
          className={`${
            activeTab === "/explore/search/posts"
              ? "border-b-4 border-secondary hover:border-opacity-100"
              : "border-b-4 border-transparent hover:border-secondary hover:border-opacity-60"
          } w-full font-bold flex justify-center items-center px-2 py-3 cursor-pointer`}
        >
          Posts
        </div>
      </div>
      <div
        onClick={goToUsersResults}
        className="w-full flex justify-center items-center px-2"
      >
        <div
          className={`${
            activeTab === "/explore/search/users"
              ? "border-b-4 border-secondary hover:border-opacity-100"
              : "border-b-4 border-transparent hover:border-secondary hover:border-opacity-60"
          } w-full font-bold flex justify-center items-center px-2 py-3 cursor-pointer`}
        >
          Users
        </div>
      </div>
    </div>
  );
};

export default SearchNavBar;

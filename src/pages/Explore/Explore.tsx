/** @format */

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import {
  getAllTrendingHashtags,
  searchPostsByWord,
} from "../../redux/asynActions/exploreAsyncActions";
import { AppDispatch } from "../../redux/store";
import { Outlet, useParams } from "react-router";
import Header from "../../common/Header";
import BackButton from "../../common/BackButton";
import SearchBar from "./ExploreComponents/SearchBar";
import { useSearchParams } from "react-router-dom";
import { resetMatchedPosts, setQueryWords } from "../../redux/exploreSlice";

const Explore = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch<AppDispatch>();

  const queryWords = useSelector((state: any) => state.explore.queryWords);
  const user = useSelector((state: any) => state.user.userData);

  const [searchBody, setSearchBody] = useState<string>("");
  const [searchParams, setSearchParams] = useSearchParams();

  const onSubmit = (event: any) => {
    event.preventDefault();

    if (user.userID !== undefined) {
      searchParams.set("q", searchBody);
      setSearchParams(searchParams);

      if (queryWords === null) {
        const data = {
          queryWords: searchBody,
          userID: user.userID,
        };
        dispatch(searchPostsByWord(data)).then((response: any) => {
          if (response.meta.requestStatus === "fulfilled") {
            dispatch(setQueryWords(searchBody));
            navigate(`/explore/search/top?q=${searchBody}`);
          }
        });
      } else {
        if (queryWords !== searchBody) {
          const data = {
            queryWords: searchBody,
            userID: user.userID,
          };
          dispatch(resetMatchedPosts());
          dispatch(searchPostsByWord(data)).then((response: any) => {
            if (response.meta.requestStatus === "fulfilled") {
              dispatch(setQueryWords(searchBody));
              navigate(`/explore/search/top?q=${searchBody}`);
            }
          });
        }
      }
    }
  };

  const goBack = () => {
    if (location.pathname === "/explore") {
      navigate("/");
    } else {
      navigate("/explore");
    }
  };
  const searchBar = document.getElementById("search-bar");
  const searchBarHeight = searchBar?.offsetHeight;
  return (
    <div className="w-full h-full flex flex-col flex-shrink">
      <div id="search-bar" className="w-full sticky top-0 z-50">
        <Header>
          <div className="w-full flex flex-row items-center ">
            <BackButton onClick={goBack} />
            <SearchBar
              onSubmit={(event: any) => onSubmit(event)}
              value={searchBody}
              setValue={setSearchBody}
            />
          </div>
        </Header>
      </div>
      <div className={`w-full h-full flex-1`}>
        <Outlet />
      </div>
    </div>
  );
};

export default Explore;

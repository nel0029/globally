/** @format */

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import {
  getAllTrendingHashtags,
  searchKeyWords,
  searchPostsByWord,
} from "../../redux/asynActions/exploreAsyncActions";
import { AppDispatch } from "../../redux/store";
import { Outlet, useParams } from "react-router";
import Header from "../../common/Header";
import BackButton from "../../common/BackButton";
import SearchBar from "./ExploreComponents/SearchBar";
import { useSearchParams } from "react-router-dom";
import {
  resetMatchedKeyWords,
  resetMatchedPosts,
  setQueryWords,
} from "../../redux/exploreSlice";
import useDebounce from "../Register/Hooks/useDebounce";

const Explore = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch<AppDispatch>();

  const queryWords = useSelector((state: any) => state.explore.queryWords);
  const user = useSelector((state: any) => state.user.userData);
  const matchedKeyWords = useSelector(
    (state: any) => state.explore.matchedKeyWords
  );

  const [searchBody, setSearchBody] = useState<string>("");
  const [searchParams, setSearchParams] = useSearchParams();

  const keyWordsDebounced = useDebounce(searchBody, 1000);

  useEffect(() => {
    const data = {
      query: keyWordsDebounced,
      userID: user?.userID,
    };

    if (searchBody.length > 0) {
      document.body.style.overflowY = "hidden";
      dispatch(searchKeyWords(data));
    } else {
      document.body.style.overflowY = "visible";
      dispatch(resetMatchedKeyWords());
    }
  }, [keyWordsDebounced]);

  const onSubmit = (event: any) => {
    event.preventDefault();
    const searchInput = document.getElementById("search-input");
    searchInput?.blur();

    if (user?.userID !== undefined) {
      searchParams.set("q", searchBody);
      setSearchParams(searchParams);

      if (queryWords === null) {
        const data = {
          queryWords: searchBody,
          userID: user?.userID,
        };
        dispatch(searchPostsByWord(data)).then((response: any) => {
          if (response.meta.requestStatus === "fulfilled") {
            dispatch(setQueryWords(searchBody));
            navigate(`/explore/search/top?q=${encodeURIComponent(searchBody)}`);
            setSearchBody("");
          }
        });
      } else {
        if (queryWords !== searchBody) {
          const data = {
            queryWords: searchBody,
            userID: user?.userID,
          };
          dispatch(resetMatchedPosts());
          dispatch(searchPostsByWord(data)).then((response: any) => {
            if (response.meta.requestStatus === "fulfilled") {
              dispatch(setQueryWords(searchBody));
              navigate(
                `/explore/search/top?q=${encodeURIComponent(searchBody)}`
              );
              setSearchBody("");
            }
          });
        }
      }
    }
  };

  const goToTopResults = (word: string) => {
    navigate(`/explore/search/top?q=${encodeURIComponent(word)}`);
    console.log("NAVIGATED");
    dispatch(resetMatchedKeyWords());
    setSearchBody("");
  };

  const goBack = () => {
    if (location.pathname === "/explore") {
      navigate("/");
    } else {
      navigate("/explore");
    }
  };

  return (
    <div className={`w-full flex-1 flex flex-col flex-shrink relative`}>
      <div id="search-bar" className="w-full sticky top-0 z-50">
        <Header>
          <div className="w-full flex flex-row items-center ">
            {location.pathname === "/explore" ? null : (
              <BackButton onClick={goBack} />
            )}
            <SearchBar
              onSubmit={(event: any) => onSubmit(event)}
              value={searchBody}
              setValue={setSearchBody}
            />
          </div>
        </Header>
      </div>
      {searchBody && (
        <div className="z-[60] absolute top-[58px] w-full text-lg font-semibold flex flex-col dark:bg-black bg-Light100 h-full overflow-y-auto border-t dark:border-Dark400 cursor-pointer">
          {matchedKeyWords?.map((word: any) => (
            <div
              key={word.name}
              onClick={() => goToTopResults(word.name)}
              className="p-2 w-full border-b dark:border-Dark400 bg-white dark:bg-Dark100 hover:bg-black hover:bg-opacity-20"
            >
              {word.name}
            </div>
          ))}
        </div>
      )}

      {!matchedKeyWords && (
        <div className={`w-full flex-1 `}>
          <Outlet />
        </div>
      )}
    </div>
  );
};

export default Explore;

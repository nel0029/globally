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
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [clientHeight, setClientHeight] = useState<number>(0);

  useEffect(() => {
    window.addEventListener("resize", () => {
      setClientHeight(window.innerHeight);
    });
  }, [clientHeight]);

  const keyWordsDebounced = useDebounce(searchBody, 1000);

  useEffect(() => {
    const data = {
      query: keyWordsDebounced,
      userID: user?.userID,
    };
    dispatch(searchKeyWords(data));

    if (searchBody.length > 0) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "visible";
    }

    if (isFocused) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "visible";
    }
  }, [keyWordsDebounced, isFocused]);

  useEffect(() => {
    if (searchBody.length < 1 || location.pathname !== "/explore") {
      dispatch(resetMatchedKeyWords());
    }
  }, [keyWordsDebounced]);

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

  const goToTopResults = (word: string) => {
    if (user.userID !== undefined) {
      searchParams.set("q", word);
      setSearchParams(searchParams);

      if (queryWords === null) {
        const data = {
          queryWords: word,
          userID: user.userID,
        };
        dispatch(searchPostsByWord(data)).then((response: any) => {
          if (response.meta.requestStatus === "fulfilled") {
            dispatch(setQueryWords(word));
            navigate(`/explore/search/top?q=${word}`);
            setSearchBody("");
          }
        });
      } else {
        if (queryWords !== word) {
          const data = {
            queryWords: word,
            userID: user.userID,
          };
          dispatch(resetMatchedPosts());
          dispatch(searchPostsByWord(data)).then((response: any) => {
            if (response.meta.requestStatus === "fulfilled") {
              dispatch(setQueryWords(word));
              navigate(`/explore/search/top?q=${word}`);
              setSearchBody("");
            }
          });
        }
      }
    }
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
    <div className={`w-full h-full flex flex-col flex-shrink relative`}>
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
              isFocused={isFocused}
              setIsFocused={setIsFocused}
            />
          </div>
        </Header>
      </div>
      {searchBody && (
        <div className="z-[60] fixed top-[58px] w-full text-lg font-semibold flex flex-col dark:bg-black bg-slate-100 h-full overflow-y-auto border-t dark:border-Dark400">
          {matchedKeyWords?.map((word: any) => (
            <div
              key={word.name}
              onClick={() => goToTopResults(word.name)}
              className="p-2 w-full border-b dark:border-Dark400 bg-white dark:bg-Dark100"
            >
              {word.name}
            </div>
          ))}
        </div>
      )}
      <div>CLIENT HEIGH IS {clientHeight}</div>
      <div className={`w-full flex-1 `}>
        <Outlet />
      </div>
    </div>
  );
};

export default Explore;

/** @format */

import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../redux/store";
import { searchUserByKeyWords } from "../../../redux/asynActions/exploreAsyncActions";
import { setQueryWords } from "../../../redux/exploreSlice";
import Card, { CardProps } from "../../Home/PostComponents/Card";
import CoverPhoto from "../../Profile/ProfileComponents/CoverPhoto";
import UserCard from "../../Profile/ProfileComponents/UserCard";

const SearchResultsUsers = () => {
  const location = useLocation();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const user = useSelector((state: any) => state.user.userData);
  const matchedUsers = useSelector((state: any) => state.explore.matchedUsers);
  const querWords = useSelector((state: any) => state.explore.querWords);

  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get("q");

  useEffect(() => {
    const data = {
      query: query,
      userID: user?.userID,
    };

    if (matchedUsers === null) {
      dispatch(searchUserByKeyWords(data));
    } else {
      if (querWords !== null && querWords === query) {
        console.log(matchedUsers);
      } else {
        dispatch(setQueryWords(query));
        dispatch(searchUserByKeyWords(data));
      }
    }
  }, [matchedUsers?.length, query]);

  return (
    <div className="w-full flex flex-col items-center gap-y-1 ">
      {matchedUsers?.map((user: any) => (
        <UserCard
          key={user._id}
          userName={user.userName}
          firstName={user.userFirstName}
          middleName={user.userMiddleName}
          lastName={user.userLastName}
          avatarURL={user.avatarURL}
          verified={user.verified}
          bio={user.bio}
          rounded="rounded-lg"
        />
      ))}
    </div>
  );
};

export default SearchResultsUsers;

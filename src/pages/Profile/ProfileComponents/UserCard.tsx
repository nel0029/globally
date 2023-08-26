/** @format */

import React from "react";
import { UserDetails } from "../../../redux/postSlice";
import { useNavigate } from "react-router";
import ConfirmButton from "../../../common/ConfirmButton";
import CancelButton from "../../../common/CancelButton";
import { FollowData, UnfollowData } from "../../../types/PostActionTypes";
import { follow, unfollow } from "../../../redux/asynActions/postAsynActions";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch } from "../../../redux/store";

interface avatarURLProps {
  url: string;
  id: string;
}

export interface UserProps {
  _id?: string;
  avatarURL?: avatarURLProps;
  firstName?: string;
  middleName?: string;
  lastName?: string;
  userName?: string;
  bio?: string;
  isUserFollowed?: boolean;
  followID?: string | null;
  inProfileRoute?: boolean;
  isLoading?: boolean;
  verified: boolean;
  rounded?: string;
}

const UserCard: React.FC<UserProps> = ({
  avatarURL,
  firstName,
  middleName,
  lastName,
  userName,
  bio,
  isUserFollowed,
  followID,
  _id,
  inProfileRoute,
  isLoading,
  verified,
  rounded,
}) => {
  const navigate = useNavigate();
  const goToUserProfile = () => {
    navigate(`/${userName}`);
  };

  const user = useSelector((state: any) => state.user.userData);
  const dispatch = useDispatch<AppDispatch>();

  const fullNameArray = [firstName, middleName, lastName];
  const fullName = fullNameArray?.join(" ");

  const followUser = () => {
    const data: FollowData = {
      userFollowingID: _id ? _id : "",
      userID: user?.userID,
    };

    dispatch(follow(data));
  };

  const unfollowUser = () => {
    const data: UnfollowData = {
      followID: followID || "",
      userID: user?.userID,
    };

    dispatch(unfollow(data));
  };

  return (
    <div
      onClick={goToUserProfile}
      className={`${isLoading && "animate-pulse"} ${
        rounded && rounded
      } w-full flex flex-row justify-around cursor-pointer bg-white dark:bg-Dark200 p-2 border-y dark:border-Dark200`}
    >
      {!avatarURL?.url ? (
        <div className="pr-2 ">
          <div className="w-[40px] h-[40px] rounded-[50%]">
            <svg
              className="w-full h-full bg-gray-100 dark:bg-gray-300 text-gray-200 dark:text-gray-700 rounded-full"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
            </svg>
          </div>
        </div>
      ) : isLoading ? (
        <div className="pr-2">
          <div className="w-[40px] h-[40px] rounded-[50%]">
            <svg
              className="w-full h-full bg-gray-100 dark:bg-gray-300 text-gray-200 dark:text-gray-700 rounded-full"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
            </svg>
          </div>
        </div>
      ) : (
        <div className="pr-2 ">
          <div className="w-[40px] h-[40px] rounded-[50%]">
            <img
              className="w-full h-full object-cover aspect-square rounded-[50%]"
              src={avatarURL.url}
            />
          </div>
        </div>
      )}

      <div className="flex flex-grow flex-col justify-start items-start flex-shrink overflow-x-hidden leading-none gap-y-1">
        <div className="flex flex-row flex-shrink hover:underline hover:text-secondary font-bold overflow-hidden text-ellipsis whitespace-nowrap cursor-pointer gap-x-1">
          {isLoading ? (
            <div className="pt-1">
              <div className=" h-3 w-[200px] bg-gray-200 rounded dark:bg-Dark300"></div>
            </div>
          ) : (
            fullName
          )}
          {verified && (
            <img className="w-[20px] h-[20px]" src="/blue-check.png" />
          )}
        </div>
        <div className="flex-shrink text-gray-400 font-light">
          {isLoading ? (
            <div className="pt-1">
              <div className=" h-3 w-[100px] bg-gray-200 rounded dark:bg-Dark300"></div>
            </div>
          ) : (
            <span>@{userName}</span>
          )}
        </div>
        {isLoading ? (
          <div className="py-1">
            <div className=" h-3 w-[150px] bg-gray-200 rounded dark:bg-Dark300"></div>
          </div>
        ) : bio ? (
          <div className="py-1 line-clamp-1">{bio}</div>
        ) : (
          <div className="py-1">
            <div className=" h-3 w-[150px] "></div>
          </div>
        )}
      </div>

      <div
        className={`${inProfileRoute ? "hidden" : ""}`}
        onClick={(event: any) => event.stopPropagation()}
      >
        {!isLoading &&
          (user?.userID !== _id ? (
            isUserFollowed ? (
              <div
                className="py-1 px-4 border-2 border-slate-400 rounded-full text-sm"
                onClick={unfollowUser}
              >
                Unfollow
              </div>
            ) : (
              <div
                className="py-1 px-4 border-2 border-secondary bg-secondary text-white rounded-full text-sm"
                onClick={followUser}
              >
                Follow
              </div>
            )
          ) : null)}
      </div>
    </div>
  );
};

export default UserCard;

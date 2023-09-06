/** @format */

import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../redux/store";
import UserCard, { UserProps } from "./UserCard";
import { GetUserFollowingData } from "../../../types/PostActionTypes";
import { getUserFollowing } from "../../../redux/asynActions/postAsynActions";

const UserFollowingList = () => {
  const { userName } = useParams<{ userName: string }>();
  const dispatch = useDispatch<AppDispatch>();

  const userDetails = useSelector((state: any) => state.posts.userDetails);
  const user = useSelector((state: any) => state.user.userData);
  const userFollowing = useSelector((state: any) => state.posts.userFollowing);
  const userID = localStorage.getItem("userID");

  const [isLoading, setIsLoading] = useState(false);

  const isInProfileRoute = () => {
    if (user?.userName === userName) {
      return true;
    } else {
      return false;
    }
  };

  useEffect(() => {
    if (userID) {
      const data: GetUserFollowingData = {
        userName: userName || "",
        userID: userID,
      };

      if (userFollowing !== null) {
        if (userFollowing.userName === userName) {
          setIsLoading(false);
        } else {
          setIsLoading(true);
          dispatch(getUserFollowing(data)).then((response: any) => {
            if (response.meta.requestStatus === "fulfilled") {
              setIsLoading(false);
            }
          });
        }
      } else {
        setIsLoading(true);
        dispatch(getUserFollowing(data)).then((response: any) => {
          if (response.meta.requestStatus === "fulfilled") {
            setIsLoading(false);
          }
        });
      }
    }
  }, [userID]);
  return (
    <div className="w-full flex  flex-col justify-center gap-y-2 ">
      {isLoading ? (
        <>
          <UserCard verified={false} isLoading={isLoading} />
        </>
      ) : (
        userFollowing?.userFollowing?.map((users: any) => (
          <UserCard
            key={users._id}
            _id={users._id}
            avatarURL={users.avatarURL}
            firstName={users.userFirstName}
            middleName={users.userMiddleName}
            lastName={users.userLastName}
            userName={users?.userName}
            bio={users.bio}
            isUserFollowed={users.isUserFollowed}
            followID={users.followID}
            inProfileRoute={isInProfileRoute()}
            isLoading={isLoading}
            verified={users.verified}
          />
        ))
      )}
    </div>
  );
};

export default UserFollowingList;

/** @format */

import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../redux/store";
import UserCard, { UserProps } from "./UserCard";
import { GetUserFollowerData } from "../../../types/PostActionTypes";
import { getUserFollowers } from "../../../redux/asynActions/postAsynActions";

const UserFollowerList = () => {
  const { userName } = useParams<{ userName: string }>();
  const user = useSelector((state: any) => state.user.userData);
  const userFollower = useSelector((state: any) => state.posts.userFollowers);
  const dispatch = useDispatch<AppDispatch>();

  const userDetails = useSelector((state: any) => state.posts.userDetails);
  const userID = localStorage.getItem("userID");

  const [isLoading, setIsLoading] = useState(false);

  const isInProfileRoute = () => {
    if (user?.userName === userDetails?.userName) {
      return true;
    } else {
      return false;
    }
  };

  useEffect(() => {
    if (userID) {
      const data: GetUserFollowerData = {
        userName: userName || "",
        userID: userID,
      };

      if (userFollower !== null) {
        if (userFollower.userName === userName) {
          setIsLoading(false);
        } else {
          setIsLoading(true);
          dispatch(getUserFollowers(data)).then((response: any) => {
            if (response.meta.requestStatus === "fulfilled") {
              setIsLoading(false);
            }
          });
        }
      } else {
        setIsLoading(true);
        dispatch(getUserFollowers(data)).then((response: any) => {
          if (response.meta.requestStatus === "fulfilled") {
            setIsLoading(false);
          }
        });
      }
    }
  }, [userID]);
  return (
    <div className="w-full flex flex-col justify-center">
      {isLoading ? (
        <>
          <UserCard verified={false} isLoading={isLoading} />
        </>
      ) : (
        userFollower?.userFollowers?.map((users: any) => (
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

export default UserFollowerList;

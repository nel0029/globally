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

  const [isLoading, setIsLoading] = useState(false);

  const isInProfileRoute = () => {
    if (user.userName === userDetails?.userName) {
      return true;
    } else {
      return false;
    }
  };

  useEffect(() => {
    const data: GetUserFollowerData = {
      userName: userName || "",
      userID: user.userID,
    };

    if (userFollower !== null) {
      if (userFollower[0]?.userFollowingUserName === userName) {
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
  }, []);
  return (
    <div className="w-full flex flex-col justify-center gap-y-2 py-1">
      {userFollower?.map((users: any) => (
        <UserCard
          key={users._id}
          _id={users._id}
          avatarURL={users.avatarURL}
          firstName={users.userFirstName}
          middleName={users.userMiddleName}
          lastName={users.userLastName}
          userName={users.userName}
          bio={users.bio}
          isUserFollowed={users.isUserFollowed}
          followID={users.followID}
          inProfileRoute={isInProfileRoute()}
          isLoading={isLoading}
        />
      ))}
    </div>
  );
};

export default UserFollowerList;

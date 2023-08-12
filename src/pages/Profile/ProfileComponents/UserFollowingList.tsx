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

  const [isLoading, setIsLoading] = useState(false);

  const isInProfileRoute = () => {
    if (user.userName === userName) {
      return true;
    } else {
      return false;
    }
  };

  useEffect(() => {
    const data: GetUserFollowingData = {
      userName: userName || "",
      userID: user.userID,
    };
    if (userDetails) {
      if (userDetails.userName === userName) {
        setIsLoading(false);
      } else {
        if (userFollowing !== null) {
          setIsLoading(false);
        } else {
          setIsLoading(true);
          dispatch(getUserFollowing(data)).then((response: any) => {
            if (response.meta.requestStatus === "fulfilled") {
              setIsLoading(false);
            }
          });
        }
      }
    } else {
      setIsLoading(true);
      dispatch(getUserFollowing(data)).then((response: any) => {
        if (response.meta.requestStatus === "fulfilled") {
          setIsLoading(false);
        }
      });
    }
  }, []);
  return (
    <div className="w-full flex  flex-col justify-center gap-y-2 py-1">
      {userFollowing?.map((users: any) => (
        <UserCard
          key={users._id}
          _id={users._id}
          avatarURL={{
            id: "",
            url: "",
          }}
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

export default UserFollowingList;

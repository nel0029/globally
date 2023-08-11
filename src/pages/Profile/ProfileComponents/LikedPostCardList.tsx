/** @format */

import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../redux/store";
import { getAllLikesByUser } from "../../../redux/asynActions/postAsynActions";
import Card, { CardProps } from "../../Home/PostComponents/Card";
import { GetAllUserLikes } from "../../../types/PostActionTypes";
import LoadingCard from "../../Home/PostComponents/LoadingCard";

const LikedPostCardList = () => {
  const { userName } = useParams<{ userName: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const [isLoading, setIsLoading] = useState(false);
  const user = useSelector((state: any) => state.user.userData);
  const allLikedPosts = useSelector((state: any) => state.posts.userLikesList);

  const data: GetAllUserLikes = {
    userName: userName || "",
    userID: user.userID,
  };

  useEffect(() => {
    if (allLikedPosts !== null) {
      if (
        allLikedPosts.length !== 0 &&
        allLikedPosts[0].userName === userName
      ) {
        setIsLoading(false);
      } else {
        setIsLoading(true);
        dispatch(getAllLikesByUser(data)).then((response: any) => {
          if (response.meta.requestStatus === "fulfilled") {
            setIsLoading(false);
          }
        });
      }
    } else {
      setIsLoading(true);
      dispatch(getAllLikesByUser(data)).then((response: any) => {
        if (response.meta.requestStatus === "fulfilled") {
          setIsLoading(false);
        }
      });
    }
  }, [dispatch, userName, user.userID]);

  return (
    <div className="flex w-full flex-col-reverse justify-center items-center gap-y-4">
      {isLoading ? (
        <React.Fragment>
          <LoadingCard />
          <LoadingCard />
        </React.Fragment>
      ) : (
        allLikedPosts?.map((post: CardProps) => {
          return <Card key={post._id} {...post} />;
        })
      )}
    </div>
  );
};

export default LikedPostCardList;

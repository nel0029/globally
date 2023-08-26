/** @format */

import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../redux/store";
import { getAllLikesByUser } from "../../../redux/asynActions/postAsynActions";
import Card, { CardProps } from "../../Home/PostComponents/Card";
import { GetAllUserLikes } from "../../../types/PostActionTypes";
import LoadingCard from "../../Home/PostComponents/LoadingCard";
import { UserDetails } from "../../../redux/postSlice";

const LikedPostCardList = () => {
  const { userName } = useParams<{ userName: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const [isLoading, setIsLoading] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const user = useSelector((state: any) => state.user.userData);
  const allLikedPosts = useSelector((state: any) => state.posts.userLikesList);
  const userDetails: UserDetails = useSelector(
    (state: any) => state.posts.userDetails
  );
  const userID = localStorage.getItem("userID");

  const data: GetAllUserLikes = {
    userName: userName || "",
    userID: user?.userID,
  };

  useEffect(() => {
    if (userID) {
      if (allLikedPosts !== null) {
        if (allLikedPosts?.userName === userName) {
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
        setIsLoaded(false);
        setIsLoading(true);
        dispatch(getAllLikesByUser(data)).then((response: any) => {
          if (response.meta.requestStatus === "fulfilled") {
            setIsLoading(false);
          }
        });
      }
    }
  }, [userID, dispatch, userName, user?.userID]);

  return (
    <React.Fragment>
      {isLoading && !userDetails ? (
        <React.Fragment>
          <LoadingCard />
          <LoadingCard />
        </React.Fragment>
      ) : (
        <React.Fragment>
          {allLikedPosts?.posts.length > 0 ? (
            <React.Fragment>
              <div className="flex-1">No more posts</div>
              {allLikedPosts?.posts.map((post: CardProps) => (
                <Card key={post._id} {...post} />
              ))}
            </React.Fragment>
          ) : (
            <div className="w-full flex-1 flex justify-center pt-8">
              <div className="font-bold text-xl">
                This user has no liked posts to show
              </div>
            </div>
          )}
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default LikedPostCardList;

/** @format */

import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../redux/store";
import { getAllPostsByUser } from "../../../redux/asynActions/postAsynActions";
import Card, { CardProps } from "../../Home/PostComponents/Card";
import LoadingCard from "../../Home/PostComponents/LoadingCard";
import { UserDetails } from "../../../redux/postSlice";

const PostCardList = () => {
  const { userName } = useParams<{ userName: string }>();
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: any) => state.user.userData);
  const allPosts = useSelector((state: any) => state.posts.userPostsList);
  const userDetails: UserDetails = useSelector(
    (state: any) => state.posts.userDetails
  );
  const userID = localStorage.getItem("userID");

  useEffect(() => {
    if (userID) {
      const data: any = {
        userName: userName || "",
        authorID: userID,
      };
      if (allPosts !== null) {
        if (allPosts?.userName === userName) {
          setIsLoading(false);
        } else {
          setIsLoading(true);
          dispatch(getAllPostsByUser(data)).then((response: any) => {
            if (response.meta.requestStatus === "fulfilled") {
              setIsLoading(false);
            }
          });
        }
      } else {
        setIsLoading(true);
        dispatch(getAllPostsByUser(data)).then((response: any) => {
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
          {allPosts?.posts?.length > 0 ? (
            <React.Fragment>
              <div className="flex-1">No more posts</div>
              {allPosts?.posts?.map((post: CardProps) => (
                <Card key={post._id} {...post} />
              ))}
            </React.Fragment>
          ) : (
            <div className="w-full flex-1 flex justify-center pt-8">
              <div className="font-bold text-xl">
                This user has no posts to show
              </div>
            </div>
          )}
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default PostCardList;

/** @format */

import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../redux/store";
import { getAllPostsByUser } from "../../../redux/asynActions/postAsynActions";
import Card, { CardProps } from "../../Home/PostComponents/Card";
import LoadingCard from "../../Home/PostComponents/LoadingCard";

const PostCardList = () => {
  const { userName } = useParams<{ userName: string }>();
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: any) => state.user.userData);
  const allPosts = useSelector((state: any) => state.posts.userPostsList);

  const data: any = {
    userName: userName || "",
    authorID: user.userID,
  };

  useEffect(() => {
    if (allPosts) {
      setIsLoading(false);
    } else {
      setIsLoading(true);
      dispatch(getAllPostsByUser(data)).then((response: any) => {
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
        allPosts?.map((post: CardProps) => {
          return <Card key={post._id} {...post} />;
        })
      )}
    </div>
  );
};

export default PostCardList;

/** @format */

import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../redux/store";
import { getAllRepliesByUser } from "../../../redux/asynActions/postAsynActions";
import { ReplyDataProps } from "../../../types/PostTypes";
import Card from "../../Home/PostComponents/Card";
import LoadingCard from "../../Home/PostComponents/LoadingCard";

const ReplyCardList = () => {
  const { userName } = useParams<{ userName: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const [isLoading, setIsLoading] = useState(false);
  const user = useSelector((state: any) => state.user.userData);
  const allPosts: ReplyDataProps[] = useSelector(
    (state: any) => state.posts.userRepliesList
  );
  const data: any = {
    userName: userName || "",
    authorID: user.userID,
  };

  useEffect(() => {
    if (allPosts) {
      setIsLoading(false);
    } else {
      setIsLoading(true);
      dispatch(getAllRepliesByUser(data)).then((response: any) => {
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
        allPosts?.map((post: ReplyDataProps) => {
          return <Card key={post._id} {...post} />;
        })
      )}
    </div>
  );
};

export default ReplyCardList;

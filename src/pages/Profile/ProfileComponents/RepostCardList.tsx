/** @format */

import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../redux/store";
import { getAllRepostsByUser } from "../../../redux/asynActions/postAsynActions";
import { RepostDataProps } from "../../../types/PostTypes";
import Card from "../../Home/PostComponents/Card";
import LoadingCard from "../../Home/PostComponents/LoadingCard";

const RepostCardList = () => {
  const { userName } = useParams<{ userName: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const [isLoading, setIsLoading] = useState(false);
  const user = useSelector((state: any) => state.user.userData);
  const allPosts = useSelector((state: any) => state.posts.userRepostsList);

  const data: any = {
    userName: userName || "",
    authorID: user.userID,
  };

  useEffect(() => {
    if (allPosts !== null) {
      if (
        allPosts.length !== 0 &&
        allPosts[0].postAuthorUserName === userName
      ) {
        setIsLoading(false);
      } else {
        setIsLoading(true);
        dispatch(getAllRepostsByUser(data)).then((response: any) => {
          if (response.meta.requestStatus === "fulfilled") {
            setIsLoading(false);
          }
        });
      }
    } else {
      setIsLoading(true);
      dispatch(getAllRepostsByUser(data)).then((response: any) => {
        if (response.meta.requestStatus === "fulfilled") {
          setIsLoading(false);
        }
      });
    }
  }, [userName, user.userID]);

  return (
    <div className="flex w-full flex-col-reverse justify-center items-center gap-y-2">
      {isLoading ? (
        <React.Fragment>
          <LoadingCard />
          <LoadingCard />
        </React.Fragment>
      ) : (
        <React.Fragment>
          {allPosts?.length > 0 ? (
            <React.Fragment>
              <div className="flex-1">No more posts</div>
              {allPosts?.map((post: RepostDataProps) => (
                <Card key={post._id} {...post} />
              ))}
            </React.Fragment>
          ) : (
            <div className="w-full flex-1 flex justify-center pt-8">
              <div className="font-bold text-xl">This user has no reposts</div>
            </div>
          )}
        </React.Fragment>
      )}
    </div>
  );
};

export default RepostCardList;

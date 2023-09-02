/** @format */

import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../redux/store";
import { getAllRepliesByUser } from "../../../redux/asynActions/postAsynActions";
import { ReplyDataProps } from "../../../types/PostTypes";
import Card from "../../Home/PostComponents/Card";
import LoadingCard from "../../Home/PostComponents/LoadingCard";
import { UserDetails } from "../../../redux/postSlice";

const ReplyCardList = () => {
  const { userName } = useParams<{ userName: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const [isLoading, setIsLoading] = useState(false);
  const user = useSelector((state: any) => state.user.userData);
  const allPosts = useSelector((state: any) => state.posts.userRepliesList);
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

      if (allPosts !== null && userDetails !== null) {
        if (allPosts?.userName === userName) {
          setIsLoading(false);
        } else {
          setIsLoading(true);
          dispatch(getAllRepliesByUser(data)).then((response: any) => {
            if (response.meta.requestStatus === "fulfilled") {
              setIsLoading(false);
            }
          });
        }
      } else {
        setIsLoading(true);
        dispatch(getAllRepliesByUser(data)).then((response: any) => {
          if (response.meta.requestStatus === "fulfilled") {
            setIsLoading(false);
          }
        });
      }
    } else {
      setIsLoading(true);
    }
  }, [userID, dispatch, userName, user?.userID]);

  return (
    <React.Fragment>
      {isLoading ? (
        <React.Fragment>
          <LoadingCard />
          <LoadingCard />
        </React.Fragment>
      ) : (
        <React.Fragment>
          {allPosts?.posts?.length > 0 ? (
            <React.Fragment>
              <div className="flex-1">No more posts</div>
              {allPosts?.posts?.map((post: ReplyDataProps) => (
                <Card key={post._id} {...post} />
              ))}
            </React.Fragment>
          ) : (
            <div className="w-full flex-1 flex justify-center pt-8">
              <div className="font-bold text-xl">
                This user has no replies to show
              </div>
            </div>
          )}
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default ReplyCardList;

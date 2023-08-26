/** @format */

import CardRepostDetails, {
  CardRepostDetailsProps,
} from "./PostDetailsComponent/CardRepostDetails";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector, useStore } from "react-redux";
import {
  getRepostDetails,
  getAllRepliesByPostID,
} from "../../redux/asynActions/postAsynActions";
import { AppDispatch } from "../../redux/store";
import { useParams, useNavigate } from "react-router-dom";
import { PostsDataProps, ReplyDataProps } from "../../types/PostTypes";
import {
  PostDetailsData,
  RepliesByPostIDData,
} from "../../types/PostActionTypes";
import Header from "../../common/Header";
import BackButton from "../../common/BackButton";
import Card from "../Home/PostComponents/Card";
import LoadingCard from "../Home/PostComponents/LoadingCard";
import PostNotExistsCard from "./PostDetailsComponent/PostNotExistsCard";

const RepostDetailsContainer = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { userName, postID } = useParams<{
    userName: string;
    postID: string;
  }>();
  const postDetails: CardRepostDetailsProps = useSelector(
    (state: any) => state.posts.postDetails || null
  );
  const postReplies: any = useSelector(
    (state: any) => state.posts.postReplies || null
  );
  const user = useSelector((state: any) => state.user.userData);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isRepliesLoading, setIsRepliesLoading] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInPostDetails, setIsInPostDetails] = useState(false);

  const postData: PostDetailsData = {
    postID: postID || "",
    userName: userName || "",
    authorID: user.userID || "",
  };

  useEffect(() => {
    if (!isLoaded) {
      if (postDetails !== null) {
        setIsLoaded(true);
        setIsLoading(false);
        if (postDetails._id !== postID) {
          setIsLoading(true);
          dispatch(getRepostDetails(postData)).then((response: any) => {
            if (response.meta.requestStatus === "fulfilled") {
              setIsLoaded(true);
              setIsLoading(false);
            }
          });
        }
      } else {
        setIsLoading(true);
        dispatch(getRepostDetails(postData)).then((response: any) => {
          if (response.meta.requestStatus === "fulfilled") {
            setIsLoaded(true);
            setIsLoading(false);
          }
        });
      }
    }
  }, [userName, postID, user.userID, isLoading]);

  const data: RepliesByPostIDData = {
    postID: postID || "",
    userName: userName || "",
    authorID: user.userID || "",
    postType: "reply",
  };

  useEffect(() => {
    if (postDetails !== null) {
      if (postReplies !== null) {
        if (postReplies.postID === postID) {
          setIsRepliesLoading(false);
        } else {
          setIsRepliesLoading(true);
          dispatch(getAllRepliesByPostID(data)).then((response: any) => {
            if (response.meta.requestStatus === "fulfilled") {
              setIsRepliesLoading(false);
            }
          });
        }
      } else {
        setIsRepliesLoading(true);
        dispatch(getAllRepliesByPostID(data)).then((response: any) => {
          if (response.meta.requestStatus === "fulfilled") {
            setIsRepliesLoading(false);
          }
        });
      }
    }
  }, [isLoading, userName, postID, user.userID]);

  useEffect(() => {
    setIsInPostDetails(true);

    return () => {
      setIsInPostDetails(false);
    };
  }, []);

  const goToReply = (userName: string, postID: string) => {
    navigate(`/${userName}/replies/${postID}`);
  };
  const goback = () => {
    setIsInPostDetails(false);
    setTimeout(() => {
      navigate(-1);
    }, 150);
  };
  return (
    <div
      className={`${
        isInPostDetails ? "right-0 xl:right-0" : "-right-full xl:right-0"
      } transition-[right] ease-in-out duration-150 absolute top-0 w-full h-full flex flex-col items-center `}
    >
      <Header>
        <BackButton onClick={goback} />
        <div className="text-lg font-bold">Repost</div>
      </Header>

      <div className="flex-1 w-full flex-grow flex flex-col items-center pb-2">
        {isLoading ? (
          <LoadingCard />
        ) : (
          <React.Fragment>
            {postDetails ? (
              <div className="w-full ">
                <CardRepostDetails {...postDetails} />
              </div>
            ) : (
              <PostNotExistsCard type={"post"} />
            )}
          </React.Fragment>
        )}

        <div className="w-full flex flex-col-reverse items-center ">
          {postDetails !== null ? (
            isRepliesLoading ? (
              <React.Fragment>
                <LoadingCard />
                <LoadingCard />
                <LoadingCard />
              </React.Fragment>
            ) : postReplies !== null && postReplies?.replies.length > 0 ? (
              postReplies.replies.map((reply: ReplyDataProps) => {
                return (
                  <div
                    className="w-full cursor-pointer "
                    key={reply._id}
                    onClick={() =>
                      goToReply(reply.postAuthorUserName, reply._id)
                    }
                  >
                    <Card isInHomeRoute={false} {...reply} />
                  </div>
                );
              })
            ) : (
              <div className="w-full h-[50px] flex flex-col justify-center items-center">
                <div>No replies for this post</div>
              </div>
            )
          ) : (
            <div className="w-full h-[50px] flex flex-col justify-center items-center">
              <div>No replies for this post</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RepostDetailsContainer;

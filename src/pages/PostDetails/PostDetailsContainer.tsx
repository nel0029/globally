/** @format */

import CardDetails from "./PostDetailsComponent/CardDetails";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector, useStore } from "react-redux";
import {
  getPostDetails,
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
import TitleText from "../../common/TitleText";
import Card, { CardProps } from "../Home/PostComponents/Card";
import PostNotExistsCard from "./PostDetailsComponent/PostNotExistsCard";
import LoadingCard from "../Home/PostComponents/LoadingCard";

interface PostDetailsProps extends CardProps {
  exists: boolean;
}

const PostDetailsContainer = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { userName, postID } = useParams<{
    userName: string;
    postID: string;
  }>();

  const [isLoading, setIsLoading] = useState(false);
  const [isRepliesLoading, setIsRepliesLoading] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInPostDetails, setIsInPostDetails] = useState(false);
  const userID = localStorage.getItem("userID");

  const postDetails: PostDetailsProps = useSelector(
    (state: any) => state.posts.postDetails || null
  );
  const postReplies: any = useSelector(
    (state: any) => state.posts.postReplies || null
  );
  const user = useSelector((state: any) => state.user.userData);
  const navigate = useNavigate();

  useEffect(() => {
    setIsInPostDetails(true);

    return () => {
      setIsInPostDetails(false);
    };
  }, []);

  useEffect(() => {
    if (userID) {
      const postData: PostDetailsData = {
        postID: postID || "",
        userName: userName || "",
        authorID: userID,
      };
      if (!isLoaded) {
        if (postDetails !== null) {
          setIsLoaded(true);
          setIsLoading(false);
          if (postDetails._id !== postID) {
            setIsLoading(true);
            dispatch(getPostDetails(postData)).then((response: any) => {
              if (response.meta.requestStatus === "fulfilled") {
                setIsLoaded(true);
                setIsLoading(false);
              }
            });
          }
        } else {
          setIsLoading(true);
          dispatch(getPostDetails(postData)).then((response: any) => {
            if (response.meta.requestStatus === "fulfilled") {
              setIsLoaded(true);
              setIsLoading(false);
            }
          });
        }
      }
    }
  }, [userID, userName, postID, user?.userID, isLoading]);

  const data: RepliesByPostIDData = {
    postID: postID || "",
    userName: userName || "",
    authorID: user?.userID || "",
    postType: "post",
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
  }, [isLoading, userName, postID, user?.userID]);

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
        <TitleText>Post</TitleText>
      </Header>

      <div className="w-full flex-grow flex flex-col items-center ">
        {isLoading ? (
          <LoadingCard />
        ) : (
          <React.Fragment>
            {postDetails ? (
              <div className="w-full">
                <CardDetails
                  fileInputID="postDetailsInputFileID"
                  {...postDetails}
                />
              </div>
            ) : (
              <PostNotExistsCard type={"post"} />
            )}
          </React.Fragment>
        )}

        <div className="w-full flex flex-col-reverse items-center gap-y-2">
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
                    className="w-full cursor-pointer"
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

export default PostDetailsContainer;

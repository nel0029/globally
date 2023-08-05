/** @format */

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createReply,
  like,
  unlike,
  createRepost,
} from "../../../redux/asynActions/postAsynActions";
import { AppDispatch } from "../../../redux/store";
import {
  NewReply,
  NewRepost,
  UnlikeData,
  NewLike,
} from "../../../types/PostActionTypes";
import CardInteractions from "./CardInteractions";
import CardReplyModal from "./CardReplyModal";
import CardRepostModal from "./CardRepostModal";
import { CardProps } from "./Card";

const PostInteractions = (post: CardProps) => {
  const user = useSelector((state: any) => state.user.userData);
  const dispatch = useDispatch<AppDispatch>();
  const [replyModal, setReplyModal] = useState(false);
  const [replyCaption, setReplyCaption] = useState("");
  const [repostModal, setRepostModal] = useState(false);
  const [repostCaption, setRepostCaption] = useState("");
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const openRepostModal = () => {
    setRepostModal(!repostModal);
  };

  const createNewRepost = () => {
    const newRepost: NewRepost = {
      postID: post._id,
      parentType: post.type,
      authorID: user.userID,
      caption: repostCaption,
    };

    dispatch(createRepost(newRepost));
  };

  const openReplyModal = () => {
    setReplyModal(!replyModal);
  };

  const createNewReply = () => {
    const newReply: NewReply = {
      postID: post._id,
      parentType: post.type,
      authorID: user.userID,
      caption: replyCaption,
      files: selectedFiles,
    };
    dispatch(createReply(newReply));
    openReplyModal();
  };
  const likeButton = () => {
    const likeData: NewLike = {
      postID: post._id,
      parentType: post.type,
      authorID: user.userID,
      parentAuthorID: post.authorID,
    };
    dispatch(like(likeData));
  };

  const unlikeButton = () => {
    const likeData: UnlikeData = {
      likeID: post.likeID !== null ? post.likeID : "",
      authorID: user.userID,
    };
    dispatch(unlike(likeData));
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const filesArray = Array.from(files);
      setSelectedFiles(filesArray);
    }
  };

  const removeSelectedFile = (index: number) => {
    const updatedFiles = [...selectedFiles];
    updatedFiles.splice(index, 1);
    setSelectedFiles(updatedFiles);
  };

  return (
    <div
      className="w-full flex flex-col border-t dark:border-Dark300"
      onClick={(event: any) => event.stopPropagation()}
    >
      <CardInteractions
        isLiked={post.isLiked}
        likeButton={likeButton}
        unlikeButton={unlikeButton}
        likesCount={post.likesCount}
        repliesCount={post.repliesCount}
        repostsCount={post.repostsCount}
        openReplyModal={openReplyModal}
        openRepostModal={openRepostModal}
      />
      {replyModal && (
        <CardReplyModal
          setModal={setReplyModal}
          authorUserName={post.postAuthorUserName}
          avatarURL={user.avatarURL}
          firstName={user.userFirstName}
          middleName={user.userMiddleName}
          lastName={user.userLastName}
          userName={user.userName}
          replyCaption={replyCaption}
          handleFileChange={handleFileChange}
          selectedFiles={selectedFiles}
          fileInputID={post._id}
          removeSelectedFile={removeSelectedFile}
          setReplyCaption={setReplyCaption}
          confirmButtonFunctions={[createNewReply, openReplyModal]}
          cancelButtonFunctions={[openReplyModal]}
        />
      )}

      {repostModal && (
        <CardRepostModal
          setModal={setRepostModal}
          avatarURL={user.avatarURL}
          authorAvatarURL={post.postAuthorAvatarURL}
          firstName={user.userFirstName}
          middleName={user.userMiddleName}
          lastName={user.userLastName}
          userName={user.userName}
          repostCaption={repostCaption}
          postAuthorFirstName={post.postAuthorFirstName}
          postAuthorMiddleName={post.postAuthorMiddleName}
          postAuthorLastName={post.postAuthorLastName}
          postAuthorUserName={post.postAuthorUserName}
          parentCaption={post.caption}
          setRepostCaption={setRepostCaption}
          parentMediaURL={post.mediaURL}
          confirmButtonFunctions={[createNewRepost, openRepostModal]}
          cancelButtonFunctions={[openRepostModal]}
          parentBGColor={post.parentBGColor}
        />
      )}
    </div>
  );
};

export default PostInteractions;

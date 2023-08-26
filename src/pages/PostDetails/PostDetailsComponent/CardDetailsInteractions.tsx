/** @format */

import React, { useState } from "react";
import { PostsDataProps } from "../../../types/PostTypes";
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
} from "../../../types/PostActionTypes";
import CardInteractions from "../../Home/PostComponents/CardInteractions";
import CardReplyModal from "../../Home/PostComponents/CardReplyModal";
import CardRepostModal from "../../Home/PostComponents/CardRepostModal";
import { CardDetailsProps } from "./CardDetails";
import DetailsInteractions from "./DetailsInteractions";
import socket from "../../../sockets/socket";

const CardDetailsInteractions = (details: CardDetailsProps) => {
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
      postID: details._id,
      parentType: details.type,
      authorID: user?.userID,
      caption: repostCaption,
    };

    dispatch(createRepost(newRepost)).then((response: any) =>
      socket.emit("newRepost", {
        postID: details._id,
        actorID: user?.userID,
        targetID: details.authorID,
        actionID: response.payload._id,
        actionType: "repost",
        postType: details.type,
      })
    );
    setRepostCaption("");
    openRepostModal();
  };

  const openReplyModal = () => {
    setReplyModal(!replyModal);
  };

  const createNewReply = () => {
    const newReply: NewReply = {
      postID: details._id,
      parentType: details.type,
      authorID: user?.userID,
      caption: replyCaption,
      file: selectedFiles[0],
    };
    dispatch(createReply(newReply)).then((response: any) =>
      socket.emit("newReply", {
        postID: details._id,
        actorID: user?.userID,
        targetID: details.authorID,
        actionID: response.payload._id,
        actionType: "reply",
        postType: details.type,
      })
    );

    setReplyCaption("");
    openReplyModal();
  };
  const likeButton = () => {
    const likeData = {
      actionType: "like",
      postID: details._id,
      parentType: details.type,
      authorID: user?.userID,
      parentAuthorID: details.authorID,
    };
    dispatch(like(likeData)).then((response: any) =>
      socket.emit("newLike", {
        postID: details._id,
        actorID: user?.userID,
        targetID: details.authorID,
        actionID: response.payload._id,
        actionType: "like",
        postType: details.type,
      })
    );
  };

  const unlikeButton = () => {
    const likeData: UnlikeData = {
      likeID: details.likeID !== null ? details.likeID : "",
      authorID: user?.userID,
    };
    socket.emit("unlike", {
      actionID: details.likeID,
      actorID: user?.userID,
      targetID: details.authorID,
    });
    dispatch(unlike(likeData));
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if (files && files.length > 0) {
      const file = files[0];

      if (selectedFiles.length + 1 > 10) {
        event.preventDefault();
        alert("Cannot upload more than 10 files");
        return;
      }

      setSelectedFiles((prevFiles) => [...prevFiles, file]);
    }
  };

  const removeSelectedFile = (index: number) => {
    const updatedFiles = [...selectedFiles];
    updatedFiles.splice(index, 1);
    setSelectedFiles(updatedFiles);
  };

  return (
    <div
      className="w-full flex flex-col transition-all ease-in duration-1000 "
      onClick={(event: any) => event.stopPropagation()}
    >
      <DetailsInteractions
        isLiked={details.isLiked}
        likeButton={likeButton}
        unlikeButton={unlikeButton}
        openReplyModal={openReplyModal}
        openRepostModal={openRepostModal}
      />

      {replyModal && (
        <CardReplyModal
          setModal={setReplyModal}
          authorUserName={details.postAuthorUserName}
          avatarURL={user.avatarURL}
          firstName={user.userFirstName}
          middleName={user.userMiddleName}
          lastName={user.userLastName}
          userName={user?.userName}
          replyCaption={replyCaption}
          setReplyCaption={setReplyCaption}
          handleFileChange={handleFileChange}
          fileInputID={details._id}
          removeSelectedFile={removeSelectedFile}
          selectedFiles={selectedFiles}
          confirmButtonFunctions={[createNewReply, openReplyModal]}
          cancelButtonFunctions={[openReplyModal]}
        />
      )}

      {repostModal && (
        <CardRepostModal
          setModal={setRepostModal}
          avatarURL={user.avatarURL}
          authorAvatarURL={details.postAuthorAvatarURL}
          firstName={user.userFirstName}
          middleName={user.userMiddleName}
          lastName={user.userLastName}
          userName={user?.userName}
          repostCaption={repostCaption}
          postAuthorFirstName={details.postAuthorFirstName}
          postAuthorMiddleName={details.postAuthorMiddleName}
          postAuthorLastName={details.postAuthorLastName}
          postAuthorUserName={details.postAuthorUserName}
          parentCaption={details.caption}
          setRepostCaption={setRepostCaption}
          parentMediaURL={details.mediaURL}
          confirmButtonFunctions={[createNewRepost]}
          cancelButtonFunctions={[openRepostModal]}
        />
      )}
    </div>
  );
};

export default CardDetailsInteractions;

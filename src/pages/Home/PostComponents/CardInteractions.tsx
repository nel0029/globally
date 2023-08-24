/** @format */

import React from "react";
import { IonIcon } from "@ionic/react";
import {
  heart,
  heartOutline,
  chatboxOutline,
  arrowRedoOutline,
} from "ionicons/icons";

interface CardInteractionsProps {
  isLiked: boolean;
  unlikeButton: () => void;
  likeButton: () => void;
  likesCount: number;
  repliesCount: number;
  repostsCount: number;
  openReplyModal: () => void;
  openRepostModal: () => void;
}

const CardInteractions: React.FC<CardInteractionsProps> = ({
  isLiked,
  unlikeButton,
  likeButton,
  likesCount,
  repliesCount,
  repostsCount,
  openReplyModal,
  openRepostModal,
}) => {
  return (
    <div className={`flex-1 text-xl flex flex-row w-full py-1`}>
      <div
        onClick={isLiked ? unlikeButton : likeButton}
        className={`post_interactions ${
          isLiked ? "text-primary" : ""
        } hover:text-primary`}
      >
        <IonIcon icon={`${isLiked ? heart : heartOutline}`}></IonIcon>
        <h5 className="post_interactions_numbers">{likesCount}</h5>
      </div>
      <div
        onClick={openReplyModal}
        className="post_interactions hover:text-secondary1"
      >
        <IonIcon icon={chatboxOutline}></IonIcon>
        <h5 className="post_interactions_numbers">{repliesCount}</h5>
      </div>
      <div
        onClick={openRepostModal}
        className="post_interactions hover:text-secondary"
      >
        <IonIcon icon={arrowRedoOutline}></IonIcon>
        <h5 className="post_interactions_numbers">{repostsCount}</h5>
      </div>
    </div>
  );
};

export default CardInteractions;

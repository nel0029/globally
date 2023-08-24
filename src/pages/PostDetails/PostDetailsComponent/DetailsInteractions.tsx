/** @format */

import React from "react";
import { IonIcon } from "@ionic/react";
import {
  heart,
  heartOutline,
  chatboxOutline,
  arrowRedoOutline,
} from "ionicons/icons";

interface DetailsInteractionsProps {
  isLiked: boolean;
  unlikeButton: () => void;
  likeButton: () => void;
  openReplyModal: () => void;
  openRepostModal: () => void;
}
const DetailsInteractions: React.FC<DetailsInteractionsProps> = ({
  isLiked,
  unlikeButton,
  likeButton,
  openReplyModal,
  openRepostModal,
}) => {
  return (
    <div className="w-full flex flex-row text-2xl justify-around py-2">
      <div
        onClick={isLiked ? unlikeButton : likeButton}
        className={`flex justify-center items-center p-2 rounded-full hover:bg-Light100 dark:hover:bg-Dark300 ${
          isLiked ? "text-primary" : ""
        } hover:text-primary cursor-pointer`}
      >
        <IonIcon icon={`${isLiked ? heart : heartOutline}`} />
      </div>
      <div
        onClick={openReplyModal}
        className={`flex justify-center items-center p-2 rounded-full hover:bg-Light100 dark:hover:bg-Dark300 hover:text-secondary1 cursor-pointer`}
      >
        <IonIcon icon={chatboxOutline} />
      </div>
      <div
        onClick={openRepostModal}
        className={`flex justify-center items-center p-2 rounded-full hover:bg-Light100 dark:hover:bg-Dark300 hover:text-secondary cursor-pointer`}
      >
        <IonIcon icon={arrowRedoOutline} />
      </div>
    </div>
  );
};

export default DetailsInteractions;

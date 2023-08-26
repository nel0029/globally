/** @format */

import { useState } from "react";
import { NavLink } from "react-router-dom";
import { IonIcon } from "@ionic/react";
import { chatbox } from "ionicons/icons";
import { useNavigate } from "react-router-dom";
import CardAvatar from "./CardAvatar";
import RepostParentCard from "./RepostParentCard";
import CardCaption from "./CardCaption";
import CardMedia from "./CardMedia";
import { useSelector } from "react-redux";
import CardInteractionsContainer from "./CardInteractionsContainer";
import PollOptionsCard from "./PollOptionsCard";
import CardHeaderContainer from "./CardHeaderContainer";

interface OptionProps {
  _id?: string;
  body?: string;
  count?: number;
}

interface MediaProps {
  id: string;
  url: string;
}
export interface CardProps {
  parentPostID?: string;
  parentType?: string;
  parentAuthorID?: string;
  parentUserName?: string;
  parentAuthorFirstName?: string;
  parentAuthorMiddleName?: string;
  parentAuthorLastName?: string;
  parentAvatarURL?: MediaProps;
  parentCaption?: string;
  parentMediaURL?: MediaProps[];
  parentLikesCount?: number;
  parentRepliesCount?: number;
  parentRepostCount?: number;
  type: string;
  _id: string;
  postAuthorAvatarURL: MediaProps;
  postAuthorFirstName: string;
  postAuthorMiddleName: string;
  postAuthorLastName: string;
  postAuthorUserName: string;
  authorID: string;
  createdAt: string;
  caption: string;
  mediaURL: MediaProps[];
  isLiked: boolean;
  likeID: string | null;
  likesCount: number;
  repliesCount: number;
  repostsCount: number;
  bgColor?: string;
  isFollowedAuthor: boolean;
  followID: string | null;
  hasPoll?: boolean;
  pollOptions?: OptionProps[];
  hasChoosed?: boolean;
  optionChoosedID?: string;
  pollRespondentsCount?: number;
  parentBGColor?: string;
  parentHasPoll?: boolean;
  parentPollRespondentsCount?: number;
  parentPollOptions?: OptionProps[];
  verified?: boolean;
  parentAuthorVerified?: boolean;
}

interface MainCardProps extends CardProps {
  isInHomeRoute?: boolean;
}

const Card = (card: MainCardProps) => {
  const user = useSelector((state: any) => state.user.userData);
  const isReply = card.type === "reply";
  const isRepost = card.type === "repost";
  const authorized = card.authorID === user?.userID;
  const [isFullView, setIsFullView] = useState(false);

  const navigate = useNavigate();
  const route = () => {
    if (card.type === "post") {
      return "posts";
    } else if (card.type === "reply") {
      return "replies";
    } else if (card.type === "repost") {
      return "reposts";
    } else {
      return "";
    }
  };
  const replyRoute = () => {
    if (card.parentType === "post") {
      return "posts";
    } else if (card.parentType === "reply") {
      return "replies";
    } else if (card.parentType === "repost") {
      return "reposts";
    } else {
      return "";
    }
  };

  const handlePostDetail = (event: any) => {
    navigate(`/${card.postAuthorUserName}/${route()}/${card._id}`);

    event.stopPropagation();
  };

  return (
    <div
      className={`w-full flex flex-col border-y-[0.5px] dark:border-Dark300 overflow-hidden`}
    >
      {card.isInHomeRoute && isReply && (
        <div className=" w-full flex-grow flex flex-row items-center text-sm whitespace-nowrap truncate gap-x-1 text-gray-500 px-1 pt-1 overflow-hidden">
          <span className="flex justify-center items-center text-secondary1">
            <IonIcon icon={chatbox} />
          </span>
          <NavLink
            className="hover:underline cursor-pointer hover:text-secondary font-semibold text-black dark:text-white dark:text-opacity-[87%]"
            to={`/${card.postAuthorUserName}`}
          >
            {card.postAuthorUserName}
          </NavLink>

          <span> replied to </span>
          <NavLink
            className=" hover:underline cursor-pointer hover:text-secondary font-semibold text-black dark:text-white dark:text-opacity-[87%]"
            to={`/${card.parentUserName}/${replyRoute()}/${card.parentPostID}`}
          >
            this {card.parentType}
          </NavLink>
        </div>
      )}

      <div
        className={`${
          isFullView ? "" : "cursor-pointer"
        } w-full flex flex-col justify-center items-center rounded-lg py-2 gap-y-2`}
      >
        <div className="w-full flex flex-row justify-center items-start gap-x-2">
          <div className="pt-1 pl-2">
            <CardAvatar
              userName={card.postAuthorUserName}
              avatarURL={card.postAuthorAvatarURL.url}
            />
          </div>
          <div
            onClick={handlePostDetail}
            className="w-full flex-shrink flex-grow flex flex-col gap-y-2 pr-2"
          >
            <CardHeaderContainer post={card} authorized={authorized} />
            <CardCaption
              onClick={
                !isFullView
                  ? handlePostDetail
                  : (event: any) => {
                      event.stopPropagation();
                    }
              }
              bgColor={card.bgColor}
              caption={card.caption}
            />
            {card.mediaURL?.length > 0 && (
              <CardMedia
                isFullView={isFullView}
                setIsFullView={setIsFullView}
                mediaURL={card.mediaURL}
              />
            )}
            {isRepost && (
              <RepostParentCard
                parentUserName={card.parentUserName}
                parentAuthorAvatarURL={card.parentAvatarURL}
                parentAuthorFirstName={card.parentAuthorFirstName}
                parentAuthorMiddleName={card.parentAuthorMiddleName}
                parentAuthorLastName={card.parentAuthorLastName}
                parentCaption={card.parentCaption}
                parentMediaURL={card.parentMediaURL}
                parentType={card.parentType}
                parentPostID={card.parentPostID}
                parentBGColor={card.parentBGColor}
                hasPoll={card.parentHasPoll}
                pollOptions={card.parentPollOptions}
                hasChoosed={card.hasChoosed}
                pollRespondentsCount={card.parentPollRespondentsCount}
                optionChoosedID={card.optionChoosedID}
                parentAuthorVerified={card.parentAuthorVerified}
              />
            )}
            {card.hasPoll && (
              <PollOptionsCard
                postID={card._id}
                options={card.pollOptions}
                hasChoosed={card.hasChoosed}
                pollRespondentsCount={card.pollRespondentsCount}
                optionChoosedID={card.optionChoosedID}
              />
            )}
            <CardInteractionsContainer {...card} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;

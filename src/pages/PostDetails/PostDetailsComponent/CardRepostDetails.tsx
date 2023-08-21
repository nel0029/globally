/** @format */

import React from "react";
import { useNavigate } from "react-router";
import CardAvatar from "../../Home/PostComponents/CardAvatar";
import CardCaption from "../../Home/PostComponents/CardCaption";
import CardMedia from "../../Home/PostComponents/CardMedia";
import CardDetailsInteractions from "./CardDetailsInteractions";
import CardDetailsHeader from "./CardDetailsHeader";
import CardDetailsHeaderMenu from "./CardDetailsHeaderMenu";
import RepostParentCard from "../../Home/PostComponents/RepostParentCard";

interface MediaProps {
  id: string;
  url: string;
}

interface OptionProps {
  _id?: string;
  body?: string;
  count?: number;
}
export interface CardRepostDetailsProps {
  parentPostID: string;
  parentType: string;
  parentUserID: string;
  parentUserName: string;
  parentAuthorFirstName: string;
  parentAuthorMiddleName: string;
  parentAuthorLastName: string;
  parentAvatarURL: MediaProps;
  parentCaption: string;
  parentMediaURL: MediaProps[];
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
  isFollowedAuthor: boolean;
  followID: string | null;
  parentBGColor?: string;
  optionChoosedID?: string;
  parentHasPoll?: boolean;
  parentPollRespondentsCount?: number;
  parentPollOptions?: OptionProps[];
  verified: boolean;
  parentAuthorVerified: boolean;
}

const CardRepostDetails = (details: CardRepostDetailsProps) => {
  const navigate = useNavigate();
  const dateAndTime = new Date(details.createdAt);
  const formattedDateAndTime = `${dateAndTime.toLocaleTimeString("en-us", {
    timeZone: "Asia/Manila",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  })} • ${dateAndTime.toLocaleDateString("en-us", {
    timeZone: "Asia/Manila",
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
  })}`;

  const repostParent = details.type === "repost";
  return (
    <div className="w-full max-w-[700px] flex flex-col p-2 border dark:border-Dark300 rounded-lg bg-white dark:bg-Dark200">
      <div className="flex flex-col justify-center">
        <div className="flex flex-row items-center gap-x-2">
          <div className="w-[40px]">
            <CardAvatar
              userName={details.postAuthorUserName}
              avatarURL={details.postAuthorAvatarURL.url}
            />
          </div>
          <div className="flex flex-row h-auto justify-center items-center py-1 w-full">
            <CardDetailsHeader
              firstName={details.postAuthorFirstName}
              middleName={details.postAuthorMiddleName}
              lastName={details.postAuthorLastName}
              userName={details.postAuthorUserName}
              verified={details.verified}
            />
            <CardDetailsHeaderMenu
              {...details}
              followID={details.followID}
              updateAction={details.type}
              deleteAction={details.type}
            />
          </div>
        </div>
        <div className="w-full flex flex-col gap-y-2 py-2">
          <CardCaption caption={details.caption} />
          {details.mediaURL.length > 0 ? (
            <CardMedia mediaURL={details.mediaURL} />
          ) : null}
          {repostParent && (
            <RepostParentCard
              parentUserName={details.parentUserName}
              parentAuthorFirstName={details.parentAuthorFirstName}
              parentAuthorMiddleName={details.parentAuthorMiddleName}
              parentAuthorLastName={details.parentAuthorLastName}
              parentAuthorAvatarURL={details.parentAvatarURL}
              parentCaption={details.parentCaption}
              parentMediaURL={details.parentMediaURL}
              parentType={details.parentType}
              parentPostID={details.parentPostID}
              parentBGColor={details.parentBGColor}
              optionChoosedID={details.optionChoosedID}
              hasChoosed={details.parentHasPoll}
              pollOptions={details.parentPollOptions}
              pollRespondentsCount={details.parentPollRespondentsCount}
              hasPoll={details.parentHasPoll}
              parentAuthorVerified={details.parentAuthorVerified}
            />
          )}
          <div className="flex items-center text-xs xl:text-sm text-gray-400">
            {formattedDateAndTime}
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <div className="w-full flex flex-row gap-x-2 py-1 border-y dark:border-Dark300">
          <div className="flex flex-row items-center flex-grow text-base gap-x-2">
            <div className="flex flex-row items-center gap-x-2">
              <span className="font-bold ">{details.likesCount}</span>
              <span className="">Likes</span>
            </div>
            <div className="flex flex-row items-center gap-x-2">
              <span className="font-bold ">{details.repliesCount}</span>
              <span className="">Replies</span>
            </div>
            <div className="flex flex-row items-center gap-x-2">
              <span className="font-bold ">{details.repostsCount}</span>
              <span className="">Reposts</span>
            </div>
          </div>
        </div>
        <CardDetailsInteractions fileInputID={details._id} {...details} />
      </div>
    </div>
  );
};

export default CardRepostDetails;

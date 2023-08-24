/** @format */

import React from "react";
import CardAvatar from "./CardAvatar";
import CardCaption from "./CardCaption";
import CardMedia from "./CardMedia";
import { useNavigate } from "react-router-dom";
import PollOptionsCard from "./PollOptionsCard";

interface OptionProps {
  _id?: string;
  body?: string;
  count?: number;
}

interface MediaProps {
  id: string;
  url: string;
}

interface RepostParentCardProps {
  parentUserName?: string;
  parentAuthorAvatarURL?: MediaProps;
  parentAuthorFirstName?: string;
  parentAuthorMiddleName?: string;
  parentAuthorLastName?: string;
  parentCaption?: string;
  parentMediaURL?: MediaProps[];
  parentType?: string;
  parentPostID?: string;
  parentBGColor?: string;
  options?: OptionProps[];
  hasPoll?: boolean;
  pollOptions?: OptionProps[];
  hasChoosed?: boolean;
  optionChoosedID?: string;
  pollRespondentsCount?: number;
  parentAuthorVerified?: boolean;
}

const RepostParentCard: React.FC<RepostParentCardProps> = ({
  parentUserName,
  parentAuthorAvatarURL,
  parentAuthorFirstName,
  parentAuthorMiddleName,
  parentAuthorLastName,
  parentCaption,
  parentMediaURL,
  parentType,
  parentPostID,
  parentBGColor,
  hasPoll,
  hasChoosed,
  optionChoosedID,
  pollRespondentsCount,
  pollOptions,
  parentAuthorVerified,
}) => {
  const navigate = useNavigate();
  const route = () => {
    if (parentType === "post") {
      return "posts";
    } else if (parentType === "reply") {
      return "replies";
    } else if (parentType === "repost") {
      return "reposts";
    } else {
      return "";
    }
  };
  const goToParentPost = (event: any) => {
    navigate(`/${parentUserName}/${route()}/${parentPostID}`);
    event.stopPropagation();
  };

  const userProfile = (event: any) => {
    navigate(`/${parentUserName}`);
    event.stopPropagation();
  };

  const fullNameArray = [
    parentAuthorFirstName,
    parentAuthorMiddleName,
    parentAuthorLastName,
  ];
  const fullName = fullNameArray.join(" ");
  return (
    <div
      onClick={goToParentPost}
      className="w-full rounded-lg cursor-pointer overflow-x-hidden"
    >
      <div className="w-full dark:border-Dark300 border rounded-lg flex flex-row items-start p-2 gap-x-2">
        <div className="w-[40px] pt-1">
          <CardAvatar
            userName={parentUserName}
            avatarURL={parentAuthorAvatarURL?.url}
          />
        </div>
        <div className="w-full flex flex-col gap-y-2">
          <div className="w-full flex flex-col flex-shrink max-w-[calc(100%-8px)] line-clamp-1 gap-x-1 overflow-x-hidden ">
            <div
              onClick={userProfile}
              className="flex flex-row flex-shrink hover:underline hover:text-secondary font-bold whitespace-nowrap"
            >
              <span>{fullName} </span>
              {parentAuthorVerified && (
                <img className="w-[20px] h-[20px]" src="/blue-check.png" />
              )}
            </div>

            <div className="flex flex-shrink font-light overflow-hidden text-ellipsis whitespace-nowrap bg-transparent">
              @{parentUserName}
            </div>
          </div>
          {parentCaption || parentMediaURL || hasPoll ? (
            <React.Fragment>
              <CardCaption
                parentBGColor={parentBGColor}
                caption={parentCaption}
              />
              {parentMediaURL ? <CardMedia mediaURL={parentMediaURL} /> : null}
              {hasPoll && (
                <PollOptionsCard
                  postID={parentPostID}
                  options={pollOptions}
                  hasChoosed={hasChoosed}
                  pollRespondentsCount={pollRespondentsCount}
                  optionChoosedID={optionChoosedID}
                />
              )}
            </React.Fragment>
          ) : (
            <div className="w-full min-h-[250px] flex justify-center items-center">
              <span>This post is not existed</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RepostParentCard;

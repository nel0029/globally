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
  return (
    <div
      onClick={goToParentPost}
      className="w-full rounded-lg cursor-pointer overflow-hidden"
    >
      <div className="dark:border-Dark300 border rounded-lg flex flex-row items-start w-full p-2 gap-x-2">
        <div className="w-[40px] pt-1">
          <CardAvatar
            userName={parentUserName}
            avatarURL={parentAuthorAvatarURL?.url}
          />
        </div>
        <div className="w-full flex flex-col gap-y-2">
          <div className="flex flex-col flex-shrink max-w-[calc(100%-8px)] overflow-x-hidden ">
            <div
              onClick={userProfile}
              className="max-w-[calc(100%-10px)] flex flex-shrink hover:underline hover:text-secondary font-bold overflow-hidden text-ellipsis whitespace-nowrap"
            >
              {parentAuthorFirstName} {parentAuthorMiddleName}{" "}
              {parentAuthorLastName}
            </div>
            <div className="flex flex-shrink font-light overflow-hidden text-ellipsis whitespace-nowrap bg-transparent">
              @{parentUserName}
            </div>
          </div>
          <CardCaption parentBGColor={parentBGColor} caption={parentCaption} />
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
        </div>
      </div>
    </div>
  );
};

export default RepostParentCard;

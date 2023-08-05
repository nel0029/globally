/** @format */

import React from "react";
import { RepostDataProps } from "../../../types/PostTypes";
import RepostHeader from "./RepostHeader";
import RepostInteractions from "./RepostInteractions";
import CardAvatar from "./CardAvatar";
import CardCaption from "./CardCaption";
import RepostParentCard from "./RepostParentCard";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";

const RepostCard = (repost: RepostDataProps) => {
  const navigate = useNavigate();
  const goToRepostDetails = () => {
    navigate(`/${repost.postAuthorUserName}/reposts/${repost._id}`);
  };

  const user = useSelector((state: any) => state.user.userData);

  const authorized = repost.authorID === user.userID;
  return (
    <div
      onClick={goToRepostDetails}
      className="w-full flex flex-col justify-center items-center rounded-lg border p-2 cursor-pointer bg-white dark:bg-Dark200"
    >
      <div className="w-full flex flex-row justify-center items-start gap-x-3 ">
        <CardAvatar
          userName={repost.postAuthorUserName}
          avatarURL={repost.postAuthorAvatarURL.url}
        />
        <div className="flex-shrink flex-1 max-w-[calc(100%-58px)]">
          <RepostHeader repost={repost} authorized={authorized} />
          <CardCaption
            parentBGColor={repost.parentBGColor}
            caption={repost.caption}
          />
          <RepostParentCard
            parentUserName={repost.parentUserName}
            parentAuthorAvatarURL={repost.parentAvatarURL}
            parentAuthorFirstName={repost.parentAuthorFirstName}
            parentAuthorMiddleName={repost.parentAuthorMiddleName}
            parentAuthorLastName={repost.parentAuthorLastName}
            parentCaption={repost.parentCaption}
            parentMediaURL={repost.parentMediaURL}
            parentType={repost.parentType}
            parentPostID={repost.parentPostID}
            parentBGColor={repost.parentBGColor}
          />
        </div>
      </div>
      <RepostInteractions {...repost} />
    </div>
  );
};

export default RepostCard;

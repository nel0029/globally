/** @format */

import React from "react";
import Modal from "../../../common/Modal";
import CardAvatar from "./CardAvatar";
import CardCaption from "./CardCaption";
import CancelButton from "../../../common/CancelButton";
import ConfirmButton from "../../../common/ConfirmButton";
import CardMedia from "./CardMedia";
import CircularProgress from "../../../common/CircularProgress";

interface MediaProps {
  id: string;
  url: string;
}

interface CardRepostModalProps {
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
  avatarURL: string;
  authorAvatarURL: MediaProps;
  firstName: string;
  middleName: string;
  lastName: string;
  userName: string;
  repostCaption: string;
  setRepostCaption: React.Dispatch<React.SetStateAction<string>>;
  postAuthorFirstName: string;
  postAuthorMiddleName: string;
  postAuthorLastName: string;
  postAuthorUserName: string;
  parentMediaURL: MediaProps[];
  confirmButtonFunctions: (() => void)[];
  cancelButtonFunctions: (() => void)[];
  parentCaption: string;
  parentBGColor?: string;
}

const CardRepostModal: React.FC<CardRepostModalProps> = ({
  setModal,
  avatarURL,
  authorAvatarURL,
  firstName,
  middleName,
  lastName,
  userName,
  repostCaption,
  setRepostCaption,
  postAuthorFirstName,
  postAuthorMiddleName,
  postAuthorLastName,
  postAuthorUserName,
  parentMediaURL,
  confirmButtonFunctions,
  cancelButtonFunctions,
  parentCaption,
  parentBGColor,
}) => {
  const fullNameArray = [firstName, middleName, lastName];
  const fullName = fullNameArray?.join(" ");
  const handleConfirmButtonClick = () => {
    confirmButtonFunctions.forEach((func) => {
      if (typeof func === "function") {
        func();
      }
    });
  };

  const handleCancelButtonClick = () => {
    cancelButtonFunctions.forEach((func) => {
      if (typeof func === "function") {
        func();
      }
    });
  };
  return (
    <Modal setModal={setModal}>
      <div className="w-full flex flex-row justify-center items-start p-2 gap-x-2">
        <div>
          <CardAvatar userName={userName} avatarURL={avatarURL} />
        </div>
        <div className="flex flex-col flex-1 flex-shrink">
          <div className="leading-4 p-1">
            <div className="flex flex-row gap-x-1 font-bold">{fullName}</div>
            <div className="text-xs">@{userName}</div>
          </div>
          <div className="w-full rounded-lg">
            <textarea
              maxLength={99}
              value={repostCaption}
              onChange={(event) => setRepostCaption(event.target.value)}
              className="w-full min-h-[50px] bg-transparent resize-none outline-none border-none p-1"
              placeholder="Add a caption"
            />
            <div className="border rounded-lg flex flex-row w-full p-2 gap-x-1">
              <div>
                <CardAvatar
                  userName={postAuthorUserName}
                  avatarURL={authorAvatarURL.url}
                />
              </div>
              <div className="">
                <div className="leading-5 py-1 ">
                  <div className="flex flex-row gap-x-1 font-bold">
                    {postAuthorFirstName} {postAuthorMiddleName}{" "}
                    {postAuthorLastName}
                  </div>
                  <div className="text-xs">@{postAuthorUserName}</div>
                </div>
                <CardCaption
                  parentBGColor={parentBGColor}
                  caption={parentCaption}
                />
                <div className="min-w-full max-w-[300px]">
                  <CardMedia mediaURL={parentMediaURL} />
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-row justify-end items-center">
            <CircularProgress
              percentage={repostCaption.length}
              max={99}
              width={32}
            />
            <CancelButton onClick={[handleCancelButtonClick]}>
              Cancel
            </CancelButton>
            <ConfirmButton onClick={[handleConfirmButtonClick]}>
              Repost
            </ConfirmButton>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default CardRepostModal;

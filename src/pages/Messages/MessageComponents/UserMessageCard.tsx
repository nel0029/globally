/** @format */

import React from "react";

interface UserProps {
  _id: string;
  avatarURL: string;
  firstName: string;
  middleName: string;
  lastName: string;
  userName: string;
}

const UserMessageCard: React.FC<UserProps> = ({
  _id,
  avatarURL,
  firstName,
  middleName,
  lastName,
  userName,
}) => {
  const fullNameArray = [firstName, middleName, lastName];
  const fullName = fullNameArray.join(" ");
  return (
    <div className="w-full flex flex-row justify-between items-center cursor-pointer p-2">
      <div className="px-2 ">
        <div className="w-[40px] h-[40px] rounded-[50%]">
          <img
            className="w-full h-full object-cover aspect-square rounded-[50%]"
            src={avatarURL}
          />
        </div>
      </div>
      <div className="flex flex-grow flex-col justify-start items-start flex-shrink overflow-x-hidden text-[16px] gap-y-1">
        <div className="z-10 flex flex-row flex-shrink hover:underline hover:text-secondary font-bold overflow-hidden text-ellipsis whitespace-nowrap cursor-pointer gap-x-1">
          {fullName}
        </div>
        <div className="flex-shrink text-gray-400 font-light overflow-hidden text-ellipsis whitespace-nowrap text-sm">
          @{userName}
        </div>
      </div>
    </div>
  );
};

export default UserMessageCard;

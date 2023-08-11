/** @format */

import React, { ReactNode } from "react";
import { useNavigate } from "react-router";

interface CardHeaderProps {
  firstName: string;
  middleName: string;
  lastName: string;
  userName: string;
  createdAt: string;
  children?: ReactNode;
}

const CardHeader: React.FC<CardHeaderProps> = ({
  firstName,
  middleName,
  lastName,
  userName,
  createdAt,
  children,
}) => {
  const dateAndTime = new Date(createdAt);
  const formattedDateAndTime = `${dateAndTime.toLocaleTimeString("en-us", {
    timeZone: "Asia/Manila",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  })} | ${dateAndTime.toLocaleDateString("en-us", {
    timeZone: "Asia/Manila",
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
  })}`;

  const navigate = useNavigate();
  const fullNameArray = [firstName, middleName, lastName];
  const fullName = fullNameArray?.join(" ");

  const userProfile = (event: any) => {
    navigate(`/${userName}`);
    event.stopPropagation();
  };
  return (
    <div className="w-full flex flex-row flex-shrink h-auto justify-stretch items-center py-1 overflow-hidden">
      <div className="flex flex-col justify-start gap-x-2 leading-none flex-1 flex-shrink ">
        <div className="flex flex-row items-center gap-x-2 text-[1rem] leading-[1.25rem] cursor-pointer flex-shrink flex-wrap max-w-[calc(100%-8px)] overflow-x-hidden">
          <div
            onClick={userProfile}
            className="flex-shrink hover:underline hover:text-secondary font-bold overflow-hidden text-ellipsis whitespace-nowrap "
          >
            {fullName}
          </div>
          <div className="flex-shrink font-light overflow-hidden text-ellipsis whitespace-nowrap ">
            @{userName}
          </div>
        </div>
        <div className="flex-1 text-xs xl:text-sm text-gray-500">
          ● {formattedDateAndTime}
        </div>
      </div>
      {children}
    </div>
  );
};

export default CardHeader;

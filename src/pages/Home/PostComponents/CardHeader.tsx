/** @format */

import React, { ReactNode } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { resetUserDetails } from "../../../redux/postSlice";
import { AppDispatch } from "../../../redux/store";

interface CardHeaderProps {
  firstName: string;
  middleName: string;
  lastName: string;
  userName: string;
  createdAt: string;
  children?: ReactNode;
  verified?: boolean;
}

const CardHeader: React.FC<CardHeaderProps> = ({
  firstName,
  middleName,
  lastName,
  userName,
  createdAt,
  children,
  verified,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const userDetails = useSelector((state: any) => state.posts.userDetails);

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

  const formatDate = (createdAt: Date) => {
    const now: Date = new Date();
    const diff: number = (now.getTime() - createdAt.getTime()) / 1000; // Get time difference in seconds

    if (diff < 10) {
      return "just now";
    } else if (diff < 60) {
      return `${Math.floor(diff)} second${
        Math.floor(diff) === 1 ? "" : "s"
      } ago`;
    } else if (diff < 3600) {
      return `${Math.floor(diff / 60)} minute${
        Math.floor(diff / 60) === 1 ? "" : "s"
      } ago`;
    } else if (diff < 86400) {
      return `${Math.floor(diff / 3600)} hour${
        Math.floor(diff / 3600) === 1 ? "" : "s"
      } ago`;
    } else if (diff < 2592000) {
      return `${Math.floor(diff / 86400)} day${
        Math.floor(diff / 86400) === 1 ? "" : "s"
      } ago`;
    } else {
      return formattedDateAndTime;
    }
  };

  const navigate = useNavigate();
  const fullNameArray = [firstName, middleName, lastName];
  const fullName = fullNameArray?.join(" ");

  const userProfile = (event: any) => {
    if (userDetails) {
      if (userDetails.userName === userName) {
        navigate(`/${userName}`);
      } else {
        dispatch(resetUserDetails());
        navigate(`/${userName}`);
      }
    } else {
      navigate(`/${userName}`);
    }

    event.stopPropagation();
  };
  return (
    <div className="flex-1 flex flex-row h-auto justify-stretch items-center py-1 overflow-hidden">
      <div className="w-full flex flex-col justify-start gap-x-2 leading-none flex-1">
        <div className="w-full flex flex-row items-center gap-x-1 text-[1rem] leading-[1.25rem] flex-wrap cursor-pointer">
          <div
            onClick={userProfile}
            className="w-full flex flex-row hover:underline hover:text-secondary font-bold whitespace-nowrap flex-nowrap"
          >
            {fullName}
            {verified && (
              <img className="w-[20px] h-[20px]" src="/blue-check.png" />
            )}
          </div>

          <div className="font-light">@{userName}</div>
        </div>
        <div className="flex-1 text-xs xl:text-sm text-gray-500">
          ● {formatDate(dateAndTime)}
        </div>
      </div>
      {children}
    </div>
  );
};

export default CardHeader;

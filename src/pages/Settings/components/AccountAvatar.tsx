/** @format */

import React from "react";

interface AvatarURL {
  avatarURL?: string;
  isLoading?: boolean;
}

const AccountAvatar: React.FC<AvatarURL> = ({ avatarURL, isLoading }) => {
  return (
    <div className="absolute w-[100px] h-[100px] -translate-y-1/2">
      {isLoading ? (
        <div className="w-full h-full animate-pulse">
          <svg
            className="w-full h-full bg-gray-100 dark:bg-gray-300 text-gray-200 dark:text-gray-700 rounded-full"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
          </svg>
        </div>
      ) : avatarURL ? (
        <div className="w-full h-full flex justify-center items-center rounded-full aspect-square border-[3px] lg:border-[5px] border-slate-100 dark:border-Dark100">
          <img
            className="object-cover w-full h-full rounded-full "
            src={avatarURL}
          />
        </div>
      ) : (
        <div className="w-full h-full">
          <svg
            className="w-full h-full bg-gray-100 dark:bg-gray-300 text-gray-200 dark:text-gray-700 rounded-full"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
          </svg>
        </div>
      )}
    </div>
  );
};

export default AccountAvatar;

/** @format */

import React from "react";

interface MediaProps {
  id: string;
  url: string;
}

interface AvatarURL {
  avatarURL?: MediaProps;
}

const UserDetailsAvatar: React.FC<AvatarURL> = ({ avatarURL }) => {
  return (
    <div className="absolute top-0 transform translate-y-[-75%] w-full ">
      {avatarURL ? (
        <div className=" flex justify-center items-center min-w-[60px] max-w-[150px] h-full rounded-full aspect-square border-[3px] lg:border-[5px] border-slate-100 dark:border-Dark200">
          <img
            className="object-cover w-full h-full rounded-full "
            src={avatarURL && avatarURL.url}
          />
        </div>
      ) : (
        <div className="absolute top-0 transform translate-y-[-75%] w-full ">
          <svg
            className="min-w-[60px] max-w-[150px] min-h-[60px] max-h-[150px] bg-gray-100 dark:bg-gray-300 text-gray-200 dark:text-gray-700 rounded-full"
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

export default UserDetailsAvatar;

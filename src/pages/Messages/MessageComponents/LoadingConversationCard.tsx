/** @format */

import React from "react";

const LoadingConversationCard = () => {
  return (
    <div className="w-full flex flex-row p-2 animate-pulse gap-x-2 border-y dark:border-Dark200">
      <svg
        className="w-10 h-10 text-gray-200 dark:text-gray-700"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
      </svg>
      <div className="flex-1 flex flex-col">
        <div className="w-[200px] h-[16px] my-1 bg-gray-200 rounded-full dark:bg-gray-700 "></div>
        <div className="w-[100px] h-[12px] my-1 bg-gray-200 rounded-full dark:bg-gray-700"></div>
        <div className="w-[150px] h-[16px] my-1 bg-gray-200 rounded-full dark:bg-gray-700"></div>
      </div>
    </div>
  );
};

export default LoadingConversationCard;

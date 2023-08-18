/** @format */

import React from "react";

interface CoverPhotoProps {
  coverPhotoURL?: string;
  isLoading?: boolean;
}

const AccountCoverPhoto: React.FC<CoverPhotoProps> = ({
  coverPhotoURL,
  isLoading,
}) => {
  return (
    <div className="relative w-full aspect-3/1">
      {isLoading ? (
        <div className="w-full h-full flex items-center justify-center bg-gray-300 dark:bg-gray-700 animate-pulse"></div>
      ) : coverPhotoURL ? (
        <img
          className="absolute object-cover w-full h-full"
          src={coverPhotoURL}
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-gray-300 dark:bg-gray-700"></div>
      )}
    </div>
  );
};

export default AccountCoverPhoto;

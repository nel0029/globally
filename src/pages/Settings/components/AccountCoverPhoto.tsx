/** @format */

import React from "react";

interface CoverPhotoProps {
  coverPhotoURL?: string;
}

const AccountCoverPhoto: React.FC<CoverPhotoProps> = ({ coverPhotoURL }) => {
  return (
    <div className="relative w-full aspect-3/1">
      {coverPhotoURL ? (
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

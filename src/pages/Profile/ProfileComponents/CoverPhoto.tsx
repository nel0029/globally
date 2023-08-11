/** @format */

import React from "react";

interface CoverPhotoProps {
  coverPhotoURL?: string;
}

const CoverPhoto: React.FC<CoverPhotoProps> = ({ coverPhotoURL }) => {
  return (
    <div className="relative w-full aspect-3/1">
      {coverPhotoURL ? (
        <img
          className="absolute object-cover w-full h-full"
          src={coverPhotoURL}
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center mt-4 bg-gray-300 rounded dark:bg-gray-700"></div>
      )}
    </div>
  );
};

export default CoverPhoto;

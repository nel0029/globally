/** @format */

import React, { useEffect, useRef, useState } from "react";
import Carousel from "../../../common/Carousel";
import { IonIcon } from "@ionic/react";
import { close } from "ionicons/icons";

interface MediaProps {
  id: string;
  url: string;
}

interface CardMediaProps {
  mediaURL: MediaProps[];
}

const CardMedia: React.FC<CardMediaProps> = ({ mediaURL }) => {
  const [isFullView, setIsFullView] = useState(false);

  if (isFullView === true) {
    document.body.style.overflowY = "hidden";
  } else {
    document.body.style.overflowY = "visible";
  }
  const handleFullView = (event: any) => {
    event.stopPropagation();
    setIsFullView(!isFullView);
  };
  const postImgDisplay = (mediaURL: MediaProps[]) => {
    switch (true) {
      case mediaURL && mediaURL.length === 1:
        return (
          <div
            className={`${
              isFullView
                ? "w-full max-w-[700px] h-full flex justify-center"
                : `w-full h-auto aspect-3/4 border dark:border-Dark200`
            }  rounded-lg  relative`}
          >
            <img
              className="absolute w-full h-full object-cover rounded-lg"
              src={mediaURL[0]?.url}
              alt="Post"
            />
          </div>
        );

      case mediaURL && mediaURL.length > 1:
        return (
          <Carousel>
            {mediaURL?.map((img: MediaProps, index: number) => (
              <div className="w-full flex-img">
                <img
                  key={index}
                  className="h-full w-auto object-cover aspect-3/2"
                  src={img.url}
                />
              </div>
            ))}
          </Carousel>
        );
      default:
        return null;
    }
  };

  return (
    <div
      onClick={(event: any) => handleFullView(event)}
      className={`${
        isFullView
          ? "fixed w-full h-full top-0 left-0 bottom-0 right-0 z-50 flex justify-center items-center bg-black backdrop-blur-md"
          : " w-full max-w-[500px] h-auto"
      }`}
    >
      <div className="relative w-full h-full flex justify-center items-center">
        {isFullView && (
          <div
            onClick={(event: any) => handleFullView(event)}
            className="z-50 absolute top-6 right-6 bg-Dark200 p-2 text-3xl text-Dark400 rounded-full flex justify-center items-center"
          >
            <IonIcon icon={close} />
          </div>
        )}
        {postImgDisplay(mediaURL)}
      </div>
    </div>
  );
};

export default CardMedia;

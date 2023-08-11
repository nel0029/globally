/** @format */

import React from "react";

interface CardCaptionProps {
  caption?: string;
  bgColor?: string;
  parentBGColor?: string;
}

const CardCaption: React.FC<CardCaptionProps> = ({
  caption,
  bgColor,
  parentBGColor,
}) => {
  const captionLines = caption?.split("\n");
  return (
    <div
      style={{ background: bgColor ? bgColor : parentBGColor }}
      className={`${
        bgColor
          ? "min-h-[150px] flex flex-col justify-center text-center rounded-lg font-bold p-4 text-white text-opacity-[87%]"
          : parentBGColor
          ? "min-h-[150px] flex flex-col justify-center text-center rounded-lg font-bold p-4 text-white text-opacity-[87%]"
          : ""
      }`}
    >
      {captionLines?.map((line, index) => (
        <p key={index} className=" lg:text-xl leading-5 break-words">
          {line}
        </p>
      ))}
    </div>
  );
};

export default CardCaption;

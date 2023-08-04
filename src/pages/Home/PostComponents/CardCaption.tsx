/** @format */

import React from "react";

interface CardCaptionProps {
  caption?: string;
  bgColor?: string;
}

const CardCaption: React.FC<CardCaptionProps> = ({ caption, bgColor }) => {
  const captionLines = caption?.split("\n");
  return (
    <div
      style={{ background: bgColor }}
      className={`${
        bgColor
          ? "min-h-[100px] flex flex-col justify-center text-center rounded-lg font-bold"
          : ""
      }`}
    >
      {captionLines?.map((line, index) => (
        <p key={index} className="text-[1rem] leading-5 break-words">
          {line}
        </p>
      ))}
    </div>
  );
};

export default CardCaption;

/** @format */

import React from "react";
import { useNavigate } from "react-router";

interface CardCaptionProps {
  caption?: string;
  bgColor?: string;
  parentBGColor?: string;
  onClick?: (val: any) => void | undefined;
}

const CardCaption: React.FC<CardCaptionProps> = ({
  caption,
  bgColor,
  parentBGColor,
  onClick,
}) => {
  const navigate = useNavigate();
  const captionLines = caption?.split("\n");

  const gotTo = (word: string, event: any) => {
    event.stopPropagation();
    navigate(`/explore/search/top?q=${encodeURIComponent(word)}`);
  };

  const wrapWordsWithSpan = (text: string) => {
    const parts = text.split(/(#[A-Za-z0-9]+)/g);

    return parts.map((part, index) => {
      if (part.match(/#[A-Za-z0-9]+/)) {
        const hashtag = part.trim();
        return (
          <span
            onClick={(event: any) => gotTo(hashtag, event)}
            className="text-secondary"
            key={index}
          >
            {part}
          </span>
        );
      }
      return part;
    });
  };

  return (
    <div
      onClick={onClick}
      style={{ background: bgColor ? bgColor : parentBGColor }}
      className={`${
        bgColor
          ? `${
              bgColor === "#ffd166" ? "text-black" : "text-white"
            } min-h-[150px] flex flex-col justify-center text-center rounded-lg font-bold p-4 text-opacity-[87%]`
          : parentBGColor
          ? `${
              parentBGColor === "#ffd166" ? "text-black" : "text-white"
            } min-h-[150px] flex flex-col justify-center text-center rounded-lg font-bold p-4 text-opacity-[87%]`
          : ""
      } w-full`}
    >
      {captionLines?.map((line, index) => (
        <p key={index} className=" break-words text-[16px] leading-[16px]">
          {wrapWordsWithSpan(line)}
        </p>
      ))}
    </div>
  );
};

export default CardCaption;

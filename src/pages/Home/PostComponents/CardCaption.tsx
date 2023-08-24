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
    navigate(`/explore/search/top?q=${word.slice(1, word.length)}`);
  };
  const wrapWordsWithSpan = (text: string) => {
    const words = text.split(" ");
    return words.map((word, index) => {
      if (word.match(/^#[^\W_]+$/)) {
        return (
          <span
            onClick={(event: any) => gotTo(word, event)} // Assuming you have a function 'gotTo' defined elsewhere
            className="text-secondary"
            key={index}
          >
            {word}{" "}
          </span>
        );
      } else {
        return word + " ";
      }
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
        <p key={index} className=" break-words">
          {wrapWordsWithSpan(line)}
        </p>
      ))}
    </div>
  );
};

export default CardCaption;

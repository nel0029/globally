/** @format */

import React from "react";

interface TextAreaInputProps {
  body: string;
  setBody: React.Dispatch<React.SetStateAction<string>>;
  placeholder: string;
  bgColor?: string;
  maxLength: number;
}

const TextAreaInput: React.FC<TextAreaInputProps> = ({
  body,
  setBody,
  placeholder,
  bgColor,
  maxLength,
}) => {
  const handleChange = (event: any) => {
    const newValue = event.target.value;
    if (newValue.length > maxLength) {
      setBody(newValue.slice(0, maxLength - 1));
    } else {
      setBody(newValue);
    }
  };
  return (
    <textarea
      style={{ background: bgColor }}
      maxLength={maxLength}
      value={body}
      onChange={(event: any) => handleChange(event)}
      className={`${
        bgColor
          ? "text-white placeholder:text-white"
          : "bg-transparent dark:bg-Dark200"
      } dark:bg-Dark200 border dark:border-Dark300 outline-none w-full h-[75px] resize-none py-1 px-2`}
      placeholder={placeholder}
    />
  );
};

export default TextAreaInput;

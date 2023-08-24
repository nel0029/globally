/** @format */

import React, { useState } from "react";

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
  const [isFocused, setIsFocused] = useState(false);
  const handleChange = (event: any) => {
    const newValue = event.target.value;
    if (newValue.length > maxLength) {
      setBody(newValue.slice(0, maxLength));
    } else {
      setBody(newValue);
    }
  };
  const handleMaxRow = () => {
    const bodyLines = body.split("\n");

    if (bodyLines.length < 3) {
      return undefined;
    } else if (bodyLines.length <= 10) {
      return bodyLines.length;
    } else {
      return 10;
    }
  };

  return (
    <textarea
      style={{ background: bgColor }}
      maxLength={maxLength}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      rows={handleMaxRow()}
      value={body}
      onChange={(event: any) => handleChange(event)}
      className={`${
        bgColor ? "text-white placeholder:text-white" : "bg-transparent"
      } ${
        isFocused ? "border border-secondary" : "border dark:border-Dark300"
      }  outline-none w-full min-h-[75px] resize-none py-1 px-2 `}
      placeholder={placeholder}
    />
  );
};

export default TextAreaInput;

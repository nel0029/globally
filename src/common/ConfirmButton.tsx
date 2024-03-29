/** @format */

import React, { ReactNode } from "react";

interface ConfirmButtonProps {
  onClick: (() => void)[];
  children: ReactNode;
  className?: string;
  disabled?: boolean;
}

const ConfirmButton: React.FC<ConfirmButtonProps> = ({
  onClick,
  children,
  className,
  disabled,
}) => {
  const handleOnClick = () => {
    onClick.forEach((func) => {
      if (typeof func === "function") {
        func();
      }
    });
  };

  return (
    <button
      onClick={handleOnClick}
      disabled={disabled}
      className={`${
        className
          ? className
          : "rounded-lg  px-5 py-1 flex flex-row items-center gap-x-1"
      } ${
        disabled
          ? "bg-opacity-60 border-opacity-60 cursor-not-allowed"
          : "bg-opacity-100"
      } border border-secondary bg-secondary text-white`}
    >
      {children}
    </button>
  );
};

export default ConfirmButton;

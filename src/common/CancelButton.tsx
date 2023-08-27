/** @format */

import React, { ReactNode } from "react";

interface CancelButtonProps {
  onClick?: ((val?: any) => void)[];
  children: ReactNode;
  className?: string;
  disabled?: boolean;
}

const CancelButton: React.FC<CancelButtonProps> = ({
  onClick,
  children,
  className,
  disabled,
}) => {
  const handleOnClick = () => {
    onClick?.forEach((func) => {
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
        className ? className : "rounded-lg  px-5 py-1 border border-slate-400"
      } `}
    >
      {children}
    </button>
  );
};

export default CancelButton;

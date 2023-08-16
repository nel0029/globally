/** @format */

import React, { ReactNode } from "react";

interface TitleTextProps {
  children: ReactNode;
}

const TitleText: React.FC<TitleTextProps> = ({ children }) => {
  return (
    <div className="flex justify-center items-center font-bold text-2xl">
      {children}
    </div>
  );
};

export default TitleText;

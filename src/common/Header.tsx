/** @format */

import React, { ReactNode } from "react";

interface HeaderProps {
  children: ReactNode;
}

const Header: React.FC<HeaderProps> = ({ children }) => {
  return (
    <div className="z-30 w-full flex flex-row items-center bg-slate-50 dark:bg-Dark300 sticky top-0 gap-x-2 p-2 ">
      {children}
    </div>
  );
};

export default Header;

/** @format */

import React, { ReactNode } from "react";

interface HeaderProps {
  children: ReactNode;
  headerRef?: React.Ref<HTMLDivElement>;
}

const Header: React.FC<HeaderProps> = ({ children, headerRef }) => {
  return (
    <div
      ref={headerRef}
      className="z-30 w-full flex flex-row items-center bg-white border-b dark:border-Dark400 dark:bg-Dark300 sticky top-0 gap-x-2 p-2 "
    >
      {children}
    </div>
  );
};

export default Header;

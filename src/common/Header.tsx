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
      className="z-30 w-full flex flex-row items-center bg-white border-y dark:border-Dark300 dark:bg-Dark200 sticky top-0 gap-x-2 p-2 "
    >
      {children}
    </div>
  );
};

export default Header;

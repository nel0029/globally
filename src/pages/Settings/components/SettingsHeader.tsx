/** @format */

import React, { ReactNode } from "react";

interface HeaderProps {
  children: ReactNode;
  headerRef?: React.Ref<HTMLDivElement>;
}

const SettingsHeader: React.FC<HeaderProps> = ({ children, headerRef }) => {
  return (
    <div
      ref={headerRef}
      className="z-30 w-full flex flex-row items-center sticky top-0 right-0 left-0 gap-x-2 p-2 "
    >
      {children}
    </div>
  );
};

export default SettingsHeader;

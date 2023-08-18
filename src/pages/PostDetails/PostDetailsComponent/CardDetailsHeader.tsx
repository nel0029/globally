/** @format */

import React, { ReactNode } from "react";
import { useNavigate } from "react-router";
import { NavLink } from "react-router-dom";

interface CardDetailsHeaderProps {
  userName: string;
  firstName: string;
  middleName: string;
  lastName: string;
  verified: boolean;
}

const CardDetailsHeader: React.FC<CardDetailsHeaderProps> = ({
  userName,
  firstName,
  middleName,
  lastName,
  verified,
}) => {
  const fullNameArray = [firstName, middleName, lastName];
  const fullName = fullNameArray.join(" ");
  return (
    <div className="flex flex-col justify-center gap-x-2 leading-none flex-1 flex-shrink overflow-x-hidden">
      <div className="flex flex-col justify-center-center gap-x-2 text-[1rem] leading-[1.25rem] max-w-full flex-shrink">
        <NavLink
          className="flex flex-row items-center gap-x-1 flex-shrink hover:underline hover:text-secondary font-bold overflow-hidden text-ellipsis whitespace-nowrap cursor-pointer"
          to={`/${userName}`}
        >
          {fullName}
          {verified && (
            <img className="w-[20px] h-[20px]" src="/blue-check.png" />
          )}
        </NavLink>
        <div className="flex-shrink font-light overflow-hidden text-ellipsis whitespace-nowrap">
          @{userName}
        </div>
      </div>
    </div>
  );
};

export default CardDetailsHeader;

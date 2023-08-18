/** @format */

import { IonIcon } from "@ionic/react";
import { person } from "ionicons/icons";
import React from "react";
import { useNavigate } from "react-router";

interface MediaProps {
  id: string;
  url: string;
}

interface AvatarURLProps {
  avatarURL?: string;
  userName?: string;
  width?: string;
  height?: string;
  fontSize?: string;
  verified: boolean;
}

const NotificationAvatar: React.FC<AvatarURLProps> = ({
  avatarURL,
  userName,
  width,
  height,
  fontSize,
  verified,
}) => {
  const navigate = useNavigate();
  const userProfile = (event: any) => {
    navigate(`/${userName}`);
    event.stopPropagation();
  };
  return (
    <div
      onClick={userName ? userProfile : () => {}}
      className={`flex justify-center items-center relative`}
      style={{
        width: width ? width : "45px",
        height: height ? height : "45px",
      }}
    >
      {avatarURL ? (
        <img
          className={`${
            userName ? "hover:ring-secondary hover:ring-2" : ""
          } w-full h-full rounded-full `}
          src={avatarURL}
        />
      ) : (
        <div
          style={{ fontSize: fontSize ? fontSize : "20px" }}
          className={`w-full h-full bg-secondary rounded-full hover:ring-secondary hover:outline-1 flex justify-center items-center text-white`}
        >
          <IonIcon name="person" />
        </div>
      )}
      {verified && (
        <img
          className="w-[20px] h-[20px] absolute  -bottom-[2.5px] -right-[2.5px]"
          src="/blue-check.png"
        />
      )}
    </div>
  );
};

export default NotificationAvatar;

/** @format */

import React from "react";
import { useNavigate } from "react-router";
import { IonIcon } from "@ionic/react";
import { arrowBackOutline } from "ionicons/icons";

interface BackButtonProps {
  onClick?: (val: any) => void;
  icon?: string;
}

const BackButton: React.FC<BackButtonProps> = ({ onClick, icon }) => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };
  return (
    <div
      onClick={onClick ? onClick : goBack}
      className="flex justify-center items-center p-2 rounded-full hover:bg-slate-200 dark:hover:bg-Dark300 cursor-pointer"
    >
      <IonIcon icon={icon ? icon : arrowBackOutline} />
    </div>
  );
};

export default BackButton;

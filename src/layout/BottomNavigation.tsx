/** @format */

import React, { useState } from "react";
import { IonIcon } from "@ionic/react";
import {
  homeOutline,
  personOutline,
  mailOutline,
  notificationsOutline,
  home,
  person,
  mail,
  notifications,
} from "ionicons/icons";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../redux/store";
import { useLocation } from "react-router";
import { useNavigate } from "react-router";
import { resetNotificationsCount } from "../redux/messageSlice";
import socket from "../sockets/socket";

const BottomNavigation = () => {
  const user = useSelector((state: any) => state.user.userData);
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(location.pathname);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const goToHome = () => {
    navigate("/");
    setActiveTab("/");
  };

  const goToUserProfile = () => {
    navigate(`/${user.userName}`);
    setActiveTab(`/${user.userName}`);
  };

  const goToMessages = () => {
    navigate(`/messages`);
    setActiveTab(`/messages`);
  };

  const goToNotifications = () => {
    navigate(`/notifications`);
    setActiveTab(`/notifications`);
    dispatch(resetNotificationsCount());

    const data = {
      userID: user.userID,
    };
    socket.emit("resetNotificationsCount", data);
  };

  const goToAccountSettings = () => {
    navigate("/account/setting");
    setActiveTab("/account/setting");
  };

  return (
    <div
      id="bottom-nav"
      className="fixed bottom-0 w-full flex lg:hidden flex-row items-center justify-around py-2 bg-white dark:bg-Dark300 text-3xl"
    >
      <div
        className={`${activeTab === "/" ? "text-secondary" : ""}`}
        onClick={goToHome}
      >
        <IonIcon icon={activeTab === "/" ? home : homeOutline} />
      </div>
      <div
        className={`${
          activeTab === `/${user.userName}` ? " text-secondary" : ""
        }`}
        onClick={goToUserProfile}
      >
        <IonIcon
          icon={activeTab === `/${user.userName}` ? person : personOutline}
        />
      </div>
      <div
        className={`${activeTab === "/messages" ? "text-secondary" : ""}`}
        onClick={goToMessages}
      >
        <IonIcon icon={activeTab === "/messages" ? mail : mailOutline} />
      </div>
      <div
        className={`${activeTab === "/" ? "text-secondary" : ""}`}
        onClick={goToNotifications}
      >
        <IonIcon
          icon={
            activeTab === "/notifications"
              ? notifications
              : notificationsOutline
          }
        />
      </div>
      <div
        onClick={goToAccountSettings}
        className={`${
          activeTab === "/account/setting" ? "border-2 border-secondary" : ""
        } w-[30px] h-[30px] rounded-full flex justify-center items-center`}
      >
        <img
          className="w-full h-full object-cover rounded-full"
          src={user.avatarURL}
        />
      </div>
    </div>
  );
};

export default BottomNavigation;

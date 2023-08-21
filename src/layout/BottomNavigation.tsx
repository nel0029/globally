/** @format */

import React, { useState, useEffect } from "react";
import { IonIcon } from "@ionic/react";
import {
  homeOutline,
  mailOutline,
  notificationsOutline,
  home,
  mail,
  notifications,
  search,
  searchOutline,
  menuOutline,
} from "ionicons/icons";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../redux/store";
import { useLocation } from "react-router";
import { useNavigate } from "react-router";
import { resetNotificationsCount } from "../redux/messageSlice";
import socket from "../sockets/socket";
import { openMenu } from "../redux/themeSlice";

const BottomNavigation = () => {
  const userID = localStorage.getItem("userID");

  const location = useLocation();
  const [activeTab, setActiveTab] = useState(location.pathname);

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    setActiveTab(location.pathname);
  }, [location.pathname]);

  const goToHome = () => {
    navigate("/");
    setActiveTab("/");
  };

  const goToExplore = () => {
    navigate("/explore");
    setActiveTab("/explore");
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
      userID: userID,
    };
    socket.emit("resetNotificationsCount", data);
  };

  const handleOpenMenu = () => {
    //dispatch(openMenu(true));
    navigate("/settings");
  };

  return (
    <div
      id="bottom-nav"
      className="z-20 fixed bottom-0 w-full flex lg:hidden flex-row items-center justify-around py-4 bg-white dark:bg-Dark300 text-3xl"
    >
      <div
        className={`${
          activeTab === "/" ? "text-secondary" : ""
        } flex justify-center items-center text-4xl`}
        onClick={goToHome}
      >
        <IonIcon icon={activeTab === "/" ? home : homeOutline} />
      </div>
      <div
        className={`${
          activeTab.includes("/explore") ? "text-secondary" : ""
        } flex justify-center items-center text-4xl`}
        onClick={goToExplore}
      >
        <IonIcon
          icon={activeTab.includes("/explore") ? search : searchOutline}
        />
      </div>

      <div
        className={`${
          activeTab === "/messages" ? "text-secondary" : ""
        } flex justify-center items-center text-4xl`}
        onClick={goToMessages}
      >
        <IonIcon icon={activeTab === "/messages" ? mail : mailOutline} />
      </div>
      <div
        className={`${
          activeTab === "/notifications" ? "text-secondary" : ""
        } flex justify-center items-center text-4xl`}
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
        className={` flex justify-center items-center text-4xl`}
        onClick={handleOpenMenu}
      >
        <IonIcon icon={menuOutline} />
      </div>
    </div>
  );
};

export default BottomNavigation;

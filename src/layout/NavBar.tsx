/** @format */

import React, { useState, useEffect } from "react";
import ConfirmButton from "../common/ConfirmButton";
import { useNavigate, useLocation } from "react-router";
import MenuItem from "../common/MenuItem";
import { IonIcon } from "@ionic/react";
import {
  homeOutline,
  personOutline,
  mailOutline,
  notificationsOutline,
  moonOutline,
  powerOutline,
  enterOutline,
  sunnyOutline,
  earthOutline,
} from "ionicons/icons";
import Header from "../common/Header";
import TitleText from "../common/TitleText";
import NavItems from "../common/NavItems";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import { setMode } from "../redux/themeSlice";
import { getUnseenNotifications } from "../redux/asynActions/messageAsyncActions";
import {
  addNewNotifcation,
  resetNotificationsCount,
} from "../redux/messageSlice";
import socket from "../sockets/socket";
import { logOut } from "../redux/usersSlice";

const NavBar = () => {
  const user = useSelector((state: any) => state.user.userData);
  const mode = useSelector((state: any) => state.theme.darkMode);
  const notificationCount = useSelector(
    (state: any) => state.messages.unseenNotification
  );
  const messageNotif = useSelector(
    (state: any) => state.messages.unseenMessagesCount
  );

  const location = useLocation();
  const [activeTab, setActiveTab] = useState(location.pathname);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [darkMode, setDarkMode] = useState(false);

  const isAuthenticated = localStorage.getItem("token");

  useEffect(() => {
    const data = {
      userID: user.userID,
    };
    if (localStorage.getItem("userID")) {
      dispatch(getUnseenNotifications(data));
    }
  }, []);

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

  const setThemeMode = () => {
    setDarkMode(!darkMode);
    dispatch(setMode());
  };

  const handleLogOut = () => {
    dispatch(setMode());
    dispatch(logOut());
    navigate("/");
  };

  return (
    <div className="lg:max-w-[300px] h-screen flex-grow-0 sticky hidden sm:flex flex-col items-center justify-center left-0 top-0 bottom-0 border-r dark:border-Dark300">
      <Header>
        <div className="flex justify-center items-center text-[32px] rounded-full text-secondary">
          <IonIcon icon={earthOutline} />
        </div>
        <div className="w-full hidden lg:flex items-center justify-center lg:justify-start flex-row">
          <TitleText>Globally</TitleText>
        </div>
      </Header>

      <div className="w-full flex flex-col flex-grow justify-between items-center p-2 gap-y-2">
        <div className="sticky top-0 w-full flex flex-col items-center lg:items-start text-2xl gap-y-2">
          <div
            onClick={goToHome}
            className={`${
              activeTab === "/" ? " text-secondary " : ""
            } flex flex-row items-center gap-x-2 p-2 lg:pl-4 lg:pr-6 py-1 cursor-pointer hover:text-secondary hover:scale-110`}
          >
            <IonIcon icon={homeOutline} />
            <div className="hidden lg:flex items-center">Home</div>
          </div>

          <div
            onClick={goToUserProfile}
            className={` ${
              activeTab === `/${user.userName}` ? " text-secondary" : ""
            } flex flex-row items-center gap-x-2 p-2 lg:pl-4 lg:pr-6 py-1 cursor-pointer hover:text-secondary hover:scale-110`}
          >
            <IonIcon icon={personOutline} />
            <div className="hidden lg:flex items-center">Profile</div>
          </div>

          <div
            onClick={goToMessages}
            className={`${
              activeTab === "/messages" ? " text-secondary " : ""
            }  flex flex-row items-center gap-x-2 p-2 lg:pl-4 lg:pr-6 py-1 cursor-pointer hover:text-secondary hover:scale-110`}
          >
            <div className="flex justify-center items-center relative">
              <IonIcon icon={mailOutline} />
              {messageNotif?.unseenMessagesCount > 0 ? (
                <div className="w-2 h-2 bg-primary rounded-full absolute top-0 right-0" />
              ) : null}
            </div>
            <div className="hidden lg:flex items-center">Messages</div>
          </div>

          <div
            onClick={goToNotifications}
            className={`${
              activeTab === "/notifications" ? " text-secondary " : ""
            } flex flex-row items-center gap-x-2 p-2 lg:pl-4 lg:pr-6 py-1 cursor-pointer hover:text-secondary hover:scale-110`}
          >
            <div className="flex justify-center items-center relative">
              <IonIcon icon={notificationsOutline} />
              {notificationCount &&
              notificationCount.unseenNotificationsCount > 0 ? (
                <div className="w-2 h-2 bg-primary rounded-full absolute top-0 right-0" />
              ) : null}
            </div>
            <div className="hidden lg:flex items-center">Notifications</div>
          </div>
        </div>

        <div className="w-full flex flex-col items-center lg:items-start gap-y-2">
          <div
            onClick={goToAccountSettings}
            className={`${
              activeTab === "/account/setting" ? " text-secondary " : ""
            } flex flex-row items-center text-xl gap-x-2 p-2 lg:pl-4 lg:pr-6 py-1 cursor-pointer hover:text-secondary hover:scale-110`}
          >
            <div className=" w-7 h-7 flex justify-center items-center rounded-full">
              <img
                className="w-full h-full object-contain aspect-square rounded-full"
                src={user.avatarURL}
              />
            </div>
            <div className="hidden lg:flex items-center whitespace-nowrap">
              Account Settings
            </div>
          </div>

          <div
            onClick={setThemeMode}
            className={`${
              darkMode ? " text-secondary " : ""
            } flex flex-row items-center text-xl gap-x-2 p-2 lg:pl-4 lg:pr-6 py-1 cursor-pointer hover:text-secondary hover:scale-110`}
          >
            <IonIcon icon={darkMode ? moonOutline : sunnyOutline} />
            <div className="hidden lg:flex items-center">
              {darkMode ? "Dark Mode" : "Light Mode"}
            </div>
          </div>

          {isAuthenticated ? (
            <div
              onClick={handleLogOut}
              className={` flex flex-row items-center text-xl gap-x-2 p-2 lg:pl-4 lg:pr-6 py-1 cursor-pointer hover:text-secondary hover:scale-110`}
            >
              <IonIcon icon={powerOutline} />
              <div className="hidden lg:flex items-center">Log Out</div>
            </div>
          ) : (
            <div
              className={`${
                activeTab === "/login" ? " text-secondary " : ""
              } flex flex-row items-center text-xl gap-x-2 p-2 lg:pl-4 lg:pr-6 py-1 cursor-pointer hover:text-secondary hover:scale-110`}
            >
              <IonIcon icon={enterOutline} />
              <div className="hidden lg:flex items-center">Log In</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavBar;

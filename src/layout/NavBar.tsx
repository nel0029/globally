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
  sunnyOutline,
  search,
  settings,
  settingsOutline,
  chevronDown,
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
import { logOut, resetAccountData } from "../redux/usersSlice";

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
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const data = {
      userID: user.userID,
    };
    if (localStorage.getItem("userID")) {
      dispatch(getUnseenNotifications(data));
    }

    setActiveTab(location.pathname);
  }, [location.pathname]);

  const isAuthenticated = localStorage.getItem("token");

  const goToHome = () => {
    navigate("/");
    setActiveTab("/");
  };

  const goToExplore = () => {
    navigate("/explore");
    setActiveTab("/explore");
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

  const openSettings = () => {
    setIsSettingsOpen(!isSettingsOpen);
  };

  const goToAccountSettings = () => {
    navigate("/account/setting");
    setActiveTab("/account/setting");
  };

  const setThemeMode = () => {
    dispatch(setMode(!mode));
  };

  const handleLogOut = () => {
    dispatch(setMode(false));
    dispatch(logOut());
    dispatch(resetAccountData());
    navigate("/login");
  };

  return (
    <nav className="lg:max-w-[300px] h-full flex-grow-0 sticky hidden lg:flex flex-col items-center justify-center left-0 top-0 bottom-0 border-r dark:border-Dark300">
      <Header>
        <div className="flex justify-center items-center w-[32px] rounded-full text-secondary">
          <img
            className="w-[32px] rounded-full object-cover"
            src="/icon-512x512.png"
          />
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
            } w-full flex flex-row items-center gap-x-2 px-2 py-1 cursor-pointer hover:text-secondary`}
          >
            <div className="text-2xl flex justify-center items-center">
              <IonIcon icon={homeOutline} />
            </div>
            <div className="hidden lg:flex items-center">Home</div>
          </div>

          <div
            onClick={goToExplore}
            className={`${
              activeTab.includes("explore") ? " text-secondary " : ""
            } w-full flex flex-row items-center gap-x-2 px-2 py-1 cursor-pointer hover:text-secondary`}
          >
            <div className="text-2xl flex justify-center items-center">
              <IonIcon icon={search} />
            </div>
            <div className="hidden lg:flex items-center">Explore</div>
          </div>

          <div
            onClick={goToUserProfile}
            className={` ${
              activeTab === `/${user.userName}` ? " text-secondary" : ""
            } w-full flex flex-row items-center gap-x-2 px-2 py-1 cursor-pointer hover:text-secondary`}
          >
            <div className="text-2xl flex justify-center items-center">
              <IonIcon icon={personOutline} />
            </div>
            <div className="hidden lg:flex items-center">Profile</div>
          </div>

          <div
            onClick={goToMessages}
            className={`${
              activeTab.includes("/messages") ? " text-secondary " : ""
            } w-full flex flex-row items-center gap-x-2 px-2 py-1 cursor-pointer hover:text-secondary`}
          >
            <div className="flex justify-center items-center relative">
              <div className="text-2xl flex justify-center items-center">
                <IonIcon icon={mailOutline} />
              </div>
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
            }  w-full flex flex-row items-center gap-x-2 px-2 py-1 cursor-pointer hover:text-secondary`}
          >
            <div className="flex justify-center items-center relative">
              <div className="text-2xl flex justify-center items-center">
                <IonIcon icon={notificationsOutline} />
              </div>
              {notificationCount &&
              notificationCount.unseenNotificationsCount > 0 ? (
                <div className="w-2 h-2 bg-primary rounded-full absolute top-0 right-0" />
              ) : null}
            </div>
            <div className="hidden lg:flex items-center">Notifications</div>
          </div>

          <div
            className={`${
              isSettingsOpen ? "h-[168px]" : "[38px]"
            } relative w-full flex flex-col items-center lg:items-start transition-all ease-in-out duration-200 overflow-hidden`}
          >
            <div
              onClick={openSettings}
              className={`z-50 dark:bg-Dark100 bg-slate-100 w-full flex flex-row items-center justify-between text-xl gap-x-2 p-2 py-1 cursor-pointer hover:text-secondary`}
            >
              <div className="flex flex-row items-center gap-x-2">
                <div className=" text-2xl flex justify-center items-center">
                  <IonIcon icon={settingsOutline} />
                </div>
                <div className="hidden lg:flex items-center">Settings</div>
              </div>
              <div
                className={`${
                  isSettingsOpen ? " -rotate-180" : ""
                } transition-transform ease-in-out duration-300 flex justify-center items-center `}
              >
                <IonIcon icon={chevronDown} />
              </div>
            </div>

            <div
              className={`absolute ${
                isSettingsOpen ? "top-[42px]" : "top-0"
              } left-0 right-0 overflow-hidden flex flex-col gap-y-2 transition-all ease-in-out duration-100`}
            >
              {isSettingsOpen && (
                <div
                  onClick={goToAccountSettings}
                  className={`${
                    activeTab === "/account/setting" ? " text-secondary " : ""
                  } ${
                    isSettingsOpen ? "max-h-[38px] flex" : " max-h-[0px] hidden"
                  } flex-row items-center text-xl gap-x-2 px-2 py-1 cursor-pointer hover:text-secondary`}
                >
                  <div className=" w-6 h-6 flex justify-center items-center rounded-full">
                    <img
                      className="w-full h-full object-contain aspect-square rounded-full"
                      src={user.avatarURL}
                    />
                  </div>
                  <div className="hidden lg:flex items-center whitespace-nowrap">
                    Account
                  </div>
                </div>
              )}

              <div
                onClick={setThemeMode}
                className={`${
                  isSettingsOpen ? " max-h-[38px] flex" : " max-h-[0px] hidden"
                } flex-row items-center text-xl gap-x-2 px-2 py-1 cursor-pointer hover:text-secondary`}
              >
                <div className="text-2xl flex justify-center items-center">
                  <IonIcon icon={mode ? sunnyOutline : moonOutline} />
                </div>
                <div className="hidden lg:flex items-center">
                  {mode ? "Light Mode" : "Dark Mode"}
                </div>
              </div>

              {isSettingsOpen && (
                <div
                  onClick={handleLogOut}
                  className={` ${
                    isSettingsOpen ? "max-h-[38px] flex" : " max-h-[0px] hidden"
                  } flex-row items-center text-xl gap-x-2 px-2 py-1 cursor-pointer hover:text-secondary `}
                >
                  <div className="text-2xl flex justify-center items-center">
                    <IonIcon icon={powerOutline} />
                  </div>
                  <div className="hidden lg:flex items-center">Log Out</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;

/** @format */

import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "../../redux/store";
import { resetThemeState, setMode } from "../../redux/themeSlice";
import { IonIcon } from "@ionic/react";
import {
  person,
  moon,
  power,
  sunny,
  settings,
  closeOutline,
} from "ionicons/icons";
import SettingsHeader from "./components/SettingsHeader";
import AccountAvatar from "./components/AccountAvatar";
import {
  getAccountData,
  logout,
} from "../../redux/asynActions/userAsyncActions";
import {
  logOut,
  resetAccountData,
  resetUserState,
} from "../../redux/usersSlice";
import AccountCoverPhoto from "./components/AccountCoverPhoto";
import CircleLoader from "../../common/CircleLoader";
import {
  resetConversationList,
  resetMessageState,
  resetNotificationList,
} from "../../redux/messageSlice";
import { resetExploreState } from "../../redux/exploreSlice";
import { resetPostsState } from "../../redux/postSlice";
import { CSSTransition, TransitionGroup } from "react-transition-group";

const Settings = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const user = useSelector((state: any) => state.user.userData);
  const account = useSelector((state: any) => state.user.accountData);
  const mode = useSelector((state: any) => state.theme.darkMode);
  const userID = localStorage.getItem("userID");
  const userName = localStorage.getItem("userName");
  const firstName = localStorage.getItem("userFirstName");
  const middleName = localStorage.getItem("userMiddleName");
  const lastName = localStorage.getItem("userLastName");
  const avatarURL = localStorage.getItem("avatarURL");
  const coverPhotoURL = localStorage.getItem("coverPhotoURL");
  const verified = localStorage.getItem("verified");

  const [isLoading, setIsLoading] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLogOutLoading, setIsLogOutLoading] = useState(false);

  const fullNameArray = [firstName, middleName, lastName];
  const fullName = fullNameArray?.join(" ");

  useEffect(() => {
    const data = {
      userID: userID,
    };
    if (account !== null) {
      setIsLoading(false);
    } else {
      setIsLoading(true);
      dispatch(getAccountData(data)).then((response: any) => {
        if (response.meta.requestStatus === "fulfilled") {
          setIsLoading(false);
        }
      });
    }
  }, [isLoading]);

  useEffect(() => {
    setIsMenuOpen(true);
  }, []);

  const handleCloseMenu = () => {
    setIsMenuOpen(false);
    setTimeout(() => {
      navigate(-1);
    }, 150);
  };

  const goToUserProfile = () => {
    if (userName) {
      navigate(`/${userName}`, { replace: true });
    }
  };

  const goToAccountSettings = () => {
    if (userName) {
      navigate("/account/setting", { replace: true });
    }
  };

  const setThemeMode = () => {
    dispatch(setMode(!mode));
  };

  const handleLogOut = () => {
    setIsLogOutLoading(true);

    dispatch(logout()).then((response: any) => {
      if (response.meta.requestStatus === "fulfilled") {
        dispatch(resetAccountData());
        dispatch(setMode(false));
        dispatch(logOut());
        dispatch(resetConversationList());
        dispatch(resetNotificationList());
        dispatch(resetExploreState());
        dispatch(resetMessageState());
        dispatch(resetPostsState());
        dispatch(resetThemeState());
        dispatch(resetUserState());
        setIsLogOutLoading(false);
        navigate("/login");
      }
    });
  };
  const bioLines = account?.bio?.split("\n");
  return (
    <div
      className={`${
        isMenuOpen ? "right-0" : "-right-full"
      } transition-[right] ease-in-out duration-150 z-50 fixed w-full h-full top-0 flex flex-col dark:bg-Dark100 bg-Light100 `}
    >
      <div className="w-full h-full flex flex-col overflow-y-auto">
        <SettingsHeader>
          {isMenuOpen && (
            <div
              onClick={handleCloseMenu}
              className="flex justify-center items-center p-2 rounded-full text-2xl bg-white dark:bg-Dark200"
            >
              <IonIcon icon={closeOutline} />
            </div>
          )}
        </SettingsHeader>
        <div className="w-full flex flex-col border-b dark:border-Dark300">
          <AccountCoverPhoto
            isLoading={isLoading}
            coverPhotoURL={coverPhotoURL ? coverPhotoURL : ""}
          />
          <div className=" w-full flex flex-row px-2">
            <div className="w-[100px] relative">
              <AccountAvatar
                isLoading={isLoading}
                avatarURL={avatarURL ? avatarURL : ""}
              />
            </div>
            <div className="flex-1 flex flex-col p-2 overflow-hidden">
              {isLoading ? (
                <React.Fragment>
                  <div className="mb-[2px] h-[18px] w-[150px] rounded-full bg-gray-300 dark:bg-gray-600 animate-pulse"></div>
                  <div className="mt-[2px] h-[14px] w-[100px] rounded-full bg-gray-300 dark:bg-gray-600 animate-pulse"></div>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <div className="w-full flex flex-row items-center gap-x-1">
                    <span className="min-h-[20px] text-[20px] font-bold">
                      {fullName}
                    </span>
                    {verified === "true" && (
                      <img
                        className="w-[20px] h-[20px]"
                        src="/blue-check.png"
                      />
                    )}
                  </div>
                  <span className="min-h-[16px] text-[16px] text-gray-500">
                    @{account?.userName}
                  </span>
                </React.Fragment>
              )}
            </div>
          </div>
          <div className="w-full text-[20px] min-h-[44px] p-2 line-clamp-3 break-words">
            {isLoading ? (
              <div className=" h-[20px] w-[150px] rounded-full bg-gray-300 dark:bg-gray-600 animate-pulse"></div>
            ) : (
              bioLines?.map((line: string, index: number) => (
                <p key={index}>{line}</p>
              ))
            )}
          </div>
        </div>
        <div className="w-full flex-1 gap-y-2 flex flex-col text-2xl p-2">
          <div
            onClick={goToUserProfile}
            className={` w-full flex flex-row items-center gap-x-2 px-2 py-3 rounded-lg cursor-pointer hover:text-secondary bg-slate-100 dark:bg-Dark200`}
          >
            <div className="text-2xl flex justify-center items-center text-secondary">
              <IonIcon icon={person} />
            </div>
            <div className="flex items-center ">View Profile</div>
          </div>
          <div
            onClick={goToAccountSettings}
            className={` w-full flex flex-row items-center gap-x-2 px-2 py-3 rounded-lg cursor-pointer hover:text-secondary bg-slate-100 dark:bg-Dark200`}
          >
            <div className="text-2xl flex justify-center items-center text-secondary">
              <IonIcon icon={settings} />
            </div>
            <div className="flex items-center ">Account Settings</div>
          </div>
          <div
            onClick={setThemeMode}
            className={` w-full flex flex-row items-center gap-x-2 px-2 py-3 rounded-lg cursor-pointer hover:text-secondary bg-slate-100 dark:bg-Dark200`}
          >
            <div className="text-2xl flex justify-center items-center text-secondary">
              <IonIcon icon={mode ? sunny : moon} />
            </div>
            <div className="flex items-center ">
              {mode ? "Light Mode" : "Dark Mode"}
            </div>
          </div>
          <div
            onClick={handleLogOut}
            className={` w-full flex flex-row items-center gap-x-2 px-2 py-3 rounded-lg cursor-pointer hover:text-secondary bg-slate-100 dark:bg-Dark200`}
          >
            <div className="text-2xl flex justify-center items-center text-secondary">
              <IonIcon icon={power} />
            </div>
            <div className="flex items-center ">Log Out</div>
            {isLogOutLoading && <CircleLoader />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;

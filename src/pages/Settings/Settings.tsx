/** @format */

import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "../../redux/store";
import { openMenu, setMode } from "../../redux/themeSlice";
import { IonIcon } from "@ionic/react";
import {
  person,
  moon,
  power,
  sunny,
  search,
  settings,
  chevronDown,
  closeOutline,
} from "ionicons/icons";
import BackButton from "../../common/BackButton";

import SettingsHeader from "./components/SettingsHeader";

import AccountAvatar from "./components/AccountAvatar";
import { getAccountData } from "../../redux/asynActions/userAsyncActions";
import { logOut, resetAccountData } from "../../redux/usersSlice";
import AccountCoverPhoto from "./components/AccountCoverPhoto";

const Settings = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  // const isMenuOpen = useSelector((state: any) => state.theme.isMenuOpen);
  const user = useSelector((state: any) => state.user.userData);
  const account = useSelector((state: any) => state.user.accountData);
  const mode = useSelector((state: any) => state.theme.darkMode);

  const [isLoading, setIsLoading] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const fullNameArray = [
    account?.userFirstName,
    account?.userMiddleName,
    account?.userLastName,
  ];
  const fullName = fullNameArray?.join(" ");

  useEffect(() => {
    const data = {
      userID: user.userID,
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
      console.log(isLoading);
    }

    if (location.pathname === "/settings") {
      document.body.style.overflowY = "hidden";
      setIsMenuOpen(true);
    }
  }, [isLoading]);

  useEffect(() => {
    if (location.pathname === "/settings") {
      setIsMenuOpen(true);
    } else {
      setIsMenuOpen(false);
    }
  }, [location.pathname]);

  const handleCloseMenu = () => {
    setIsMenuOpen(false);
    navigate(-1);
  };

  const goToUserProfile = () => {
    navigate(`/${user?.userName}`, { replace: true });
  };

  const goToAccountSettings = () => {
    navigate("/account/setting", { replace: true });
  };

  const setThemeMode = () => {
    dispatch(setMode(!mode));
  };

  const handleLogOut = () => {
    dispatch(setMode(false));
    dispatch(logOut());
    dispatch(resetAccountData());
    navigate("/");
  };
  const bioLines = account?.bio?.split("\n");
  return (
    <div
      className={`z-50 fixed w-full h-screen top-0 bottom-0 -right-full ${
        isMenuOpen ? " -translate-x-full" : " translate-x-0"
      } transition-transform ease-in-out duration-300 flex flex-col dark:bg-Dark100 bg-slate-100 overflow-hidden`}
    >
      <div className="w-full flex flex-col relative">
        <SettingsHeader>
          <div
            onClick={handleCloseMenu}
            className="flex justify-center items-center p-2 rounded-full text-2xl"
          >
            <IonIcon icon={closeOutline} />
          </div>
        </SettingsHeader>
        <div className="w-full flex flex-col border-b dark:border-Dark300">
          <AccountCoverPhoto
            isLoading={isLoading}
            coverPhotoURL={account?.coverPhotoURL?.url}
          />
          <div className=" w-full flex flex-row px-2">
            <div className="w-[100px] relative">
              <AccountAvatar
                isLoading={isLoading}
                avatarURL={account?.avatarURL}
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
                    {account?.verified && (
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
            className={` w-full flex flex-row items-center gap-x-2 px-2 py-3 rounded-lg cursor-pointer hover:text-secondary bg-white dark:bg-Dark200`}
          >
            <div className="text-2xl flex justify-center items-center text-secondary">
              <IonIcon icon={person} />
            </div>
            <div className="flex items-center ">View Profile</div>
          </div>
          <div
            onClick={goToAccountSettings}
            className={` w-full flex flex-row items-center gap-x-2 px-2 py-3 rounded-lg cursor-pointer hover:text-secondary bg-white dark:bg-Dark200`}
          >
            <div className="text-2xl flex justify-center items-center text-secondary">
              <IonIcon icon={settings} />
            </div>
            <div className="flex items-center ">Account Settings</div>
          </div>
          <div
            onClick={setThemeMode}
            className={` w-full flex flex-row items-center gap-x-2 px-2 py-3 rounded-lg cursor-pointer hover:text-secondary bg-white dark:bg-Dark200`}
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
            className={` w-full flex flex-row items-center gap-x-2 px-2 py-3 rounded-lg cursor-pointer hover:text-secondary bg-white dark:bg-Dark200`}
          >
            <div className="text-2xl flex justify-center items-center text-secondary">
              <IonIcon icon={power} />
            </div>
            <div className="flex items-center ">Log Out</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;

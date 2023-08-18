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
    if (account) {
      setIsLoading(false);
    } else {
      setIsLoading(true);
      dispatch(getAccountData(data)).then((response: any) => {
        if (response.meta.requestStatus === "fulfilled") {
          setIsLoading(false);
        }
      });
    }

    if (location.pathname === "/settings") {
      document.body.style.overflowY = "hidden";
      setIsMenuOpen(true);
    }
  }, []);

  useEffect(() => {
    if (location.pathname === "/settings") {
      setIsMenuOpen(true);
    } else {
      setIsMenuOpen(false);
    }
  }, [location.pathname]);

  const handleCloseMenu = () => {
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
          <AccountCoverPhoto coverPhotoURL={account?.coverPhotoURL?.url} />
          <div className=" w-full flex flex-row px-2">
            <div className="w-[100px] relative">
              <AccountAvatar avatarURL={account?.avatarURL} />
            </div>
            <div className="flex-1 flex flex-col px-2 overflow-hidden">
              <span className="text-[20px] font-bold">{fullName}</span>
              <span className="text-base text-gray-500">
                @{account?.userName}
              </span>
            </div>
          </div>
          <div className="w-full text-xl min-h-[44divx] p-2 line-clamp-3 break-words">
            {bioLines?.map((line: string, index: number) => (
              <p key={index}>{line}</p>
            ))}
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

/** @format */

import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "../../redux/store";
import { openMenu } from "../../redux/themeSlice";
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

const Settings = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const isMenuOpen = useSelector((state: any) => state.theme.isMenuOpen);
  const user = useSelector((state: any) => state.user.userData);
  const account = useSelector((state: any) => state.user.accountData);

  const [isLoading, setIsLoading] = useState(false);

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
    if (isMenuOpen === true) {
      document.body.style.overflowY = "hidden";
    }
  }, [isMenuOpen]);

  const handleCloseMenu = () => {
    dispatch(openMenu(false));
  };

  const goToUserProfile = () => {
    dispatch(openMenu(false));
    setTimeout(() => {
      navigate(`/${user?.userName}`);
    }, 300);
  };

  return (
    <div
      className={`z-50 fixed w-full h-screen top-0 bottom-0 -right-full ${
        isMenuOpen ? " -translate-x-full" : " translate-x-0"
      } transition-transform ease-in-out duration-300 flex flex-col dark:bg-Dark100 bg-slate-100`}
    >
      <div className="w-full flex flex-col relative">
        <SettingsHeader>
          <div
            onClick={handleCloseMenu}
            className="flex justify-center items-center p-2 rounded-full hover:bg-slate-200 dark:hover:bg-Dark300 cursor-pointer text-2xl"
          >
            <IonIcon icon={closeOutline} />
          </div>
        </SettingsHeader>
        <div className="w-full flex flex-col border-b px-2">
          <div className="w-full flex flex-row">
            <AccountAvatar avatarURL={account?.avatarURL} />
            <div className="w-full flex flex-col px-2">
              <span className="text-[20px] font-bold">{fullName}</span>
              <span className="text-base text-gray-500">
                @{account?.userName}
              </span>
              <div className="text-xl min-h-[44px] py-2 line-clamp-3">
                {account?.bio}
              </div>
            </div>
          </div>
        </div>
        <div className="w-full flex-1  flex flex-col text-2xl px-2">
          <div
            onClick={goToUserProfile}
            className={` w-full flex flex-row items-center gap-x-2 p-2 cursor-pointer hover:text-secondary`}
          >
            <div className="text-2xl flex justify-center items-center text-secondary">
              <IonIcon icon={person} />
            </div>
            <div className="flex items-center ">View Profile</div>
          </div>
          <div
            className={` w-full flex flex-row items-center gap-x-2 p-2 cursor-pointer hover:text-secondary`}
          >
            <div className="text-2xl flex justify-center items-center text-secondary">
              <IonIcon icon={settings} />
            </div>
            <div className="flex items-center ">Account Settings</div>
          </div>
          <div
            className={` w-full flex flex-row items-center gap-x-2 p-2 cursor-pointer hover:text-secondary`}
          >
            <div className="text-2xl flex justify-center items-center text-secondary">
              <IonIcon icon={moon} />
            </div>
            <div className="flex items-center ">Dark Mode</div>
          </div>
          <div
            className={` w-full flex flex-row items-center gap-x-2 p-2 cursor-pointer hover:text-secondary`}
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

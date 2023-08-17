/** @format */

import React, { useEffect, useState, ChangeEvent } from "react";
import Header from "../../common/Header";
import TitleText from "../../common/TitleText";
import CardAvatar from "../Home/PostComponents/CardAvatar";
import { IonIcon } from "@ionic/react";
import {
  brush,
  eyeOutline,
  eyeOffOutline,
  moonOutline,
  powerOutline,
  sunnyOutline,
} from "ionicons/icons";
import CoverPhoto from "../Profile/ProfileComponents/CoverPhoto";
import ConfirmButton from "../../common/ConfirmButton";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../redux/store";
import {
  getAccountData,
  updateProfilePicture,
  updateUserAccount,
} from "../../redux/asynActions/userAsyncActions";
import CancelButton from "../../common/CancelButton";
import { setMode } from "../../redux/themeSlice";
import { logOut, resetAccountData } from "../../redux/usersSlice";
import { useNavigate } from "react-router";
import BackButton from "../../common/BackButton";

const AccountSettings = () => {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: any) => state.user.userData);
  const account = useSelector((state: any) => state.user.accountData);
  const [userFirstName, setUserFirstName] = useState("");
  const [userMiddleName, setUserMiddleName] = useState("");
  const [userLastName, setUserLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [bio, setBio] = useState("");
  const [email, setEmail] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);
  const [coverPhoto, setCoverPhoto] = useState(null);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [matchedPassword, setMatchedPassword] = useState("");
  const [changePassWord, setChangePassWord] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);
  const authMessage = useSelector((state: any) => state.user.authMessage);
  const mode = useSelector((state: any) => state.theme.darkMode);
  const navigate = useNavigate();

  useEffect(() => {
    const data = {
      userID: user.userID,
    };

    dispatch(getAccountData(data));
    setCurrentPassword("");
  }, []);

  useEffect(() => {
    if (account) {
      setUserName(account?.userName);
      setUserFirstName(account?.userFirstName);
      setUserMiddleName(account?.userMiddleName);
      setUserLastName(account?.userLastName);
      setBio(account?.bio);
      setEmail(account?.email);
    }
  }, [account?.userID]);

  const openChangePasswordForm = () => {
    setChangePassWord(true);
  };

  const handleShowCurrentPassword = () => {
    setShowCurrentPassword(!showCurrentPassword);
  };

  const handleShowNewPassword = () => {
    setShowNewPassword(!showNewPassword);
  };

  const handleShowConfirmNewPassword = () => {
    setShowConfirmNewPassword(!showConfirmNewPassword);
  };

  const handleSaveChanges = () => {
    if (newPassword && matchedPassword) {
      const data = {
        userID: user.userID,
        userName: userName,
        userFirstName: userFirstName,
        userMiddleName: userMiddleName,
        userLastName: userLastName,
        email: email,
        bio: bio,
        currentPassword: currentPassword,
        newPassword: matchedPassword,
        avatarURL: profilePicture,
        coverPhotoURL: coverPhoto,
      };

      dispatch(updateUserAccount(data));
    } else {
      const data = {
        userID: user.userID,
        userName: userName,
        userFirstName: userFirstName,
        userMiddleName: userMiddleName,
        userLastName: userLastName,
        email: email,
        bio: bio,
        currentPassword: currentPassword,

        avatarURL: profilePicture,
        coverPhotoURL: coverPhoto,
      };
      setCurrentPassword("");
      dispatch(updateUserAccount(data));
    }
  };

  useEffect(() => {
    if (newPassword === confirmNewPassword) {
      setMatchedPassword(newPassword);
    }
  }, [confirmNewPassword, newPassword]);

  const setThemeMode = () => {
    dispatch(setMode(!mode));
  };

  const handleLogOut = () => {
    dispatch(setMode(false));
    dispatch(logOut());
    dispatch(resetAccountData());
    navigate("/");
  };

  return (
    <div className=" w-full flex-grow flex flex-col items-center gap-y-2">
      <Header>
        <div className="block xl:hidden">
          <BackButton />
        </div>
        <TitleText>
          <div className="py-0.5">Account Settings</div>
        </TitleText>
      </Header>
      <div className="w-full flex flex-col items-center flex-grow px-2 gap-y-4">
        <div className="w-full flex flex-col">
          <div className="font-bold text-lg">Profile Info</div>
          <div className="w-full flex flex-col gap-y-2">
            <div className="py-1">
              <div className="text-sm text-gray-500">First Name</div>
              <input
                className="w-full border dark:border-Dark300 rounded-lg bg-transparent outline-none p-2"
                name="userFirstName"
                value={userFirstName}
                onChange={(event: any) => setUserFirstName(event.target.value)}
              />
            </div>

            <div>
              <div className="text-sm text-gray-500">Middle Name</div>
              <input
                className="w-full border dark:border-Dark300 rounded-lg bg-transparent outline-none p-2"
                name="userMiddleName"
                value={userMiddleName}
                onChange={(event: any) => setUserMiddleName(event.target.value)}
              />
            </div>

            <div>
              <div className="text-sm text-gray-500">Last Name</div>
              <input
                className="w-full border dark:border-Dark300 rounded-lg bg-transparent outline-none p-2"
                name="userLastName"
                value={userLastName}
                onChange={(event: any) => setUserLastName(event.target.value)}
              />
            </div>

            <div>
              <div className="text-sm text-gray-500">Bio</div>
              <textarea
                className="w-full border dark:border-Dark300 rounded-lg bg-transparent outline-none p-2 resize-none h-[100px]"
                name="bio"
                value={bio}
                onChange={(event: any) => setBio(event.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="w-full flex flex-col">
          <div className="font-bold text-lg">Account Info</div>
          <div className="w-full flex flex-col gap-y-2">
            <div>
              <div className="text-sm text-gray-500">UserName</div>
              <input
                className="w-full border dark:border-Dark300 rounded-lg bg-transparent outline-none p-2"
                name="userName"
                value={userName}
                onChange={(event: any) => setUserName(event.target.value)}
              />
            </div>
            <div>
              <div className="text-sm text-gray-500">Email Address</div>
              <input
                className="w-full border dark:border-Dark300 rounded-lg bg-transparent outline-none p-2"
                name="email"
                value={email}
                onChange={(event: any) => setEmail(event.target.value)}
              />
            </div>

            <div className="w-full flex flex-row items-center border dark:border-Dark300 rounded-lg p-2">
              <input
                value={currentPassword}
                onChange={(event: any) =>
                  setCurrentPassword(event.target.value)
                }
                type={`${showCurrentPassword ? "text" : "password"}`}
                placeholder="Current Password"
                className="flex-grow  bg-transparent outline-none "
              />
              <button onClick={handleShowCurrentPassword}>
                <IonIcon
                  icon={`${showCurrentPassword ? eyeOutline : eyeOffOutline}`}
                />
              </button>
            </div>

            {changePassWord && (
              <div className="flex flex-col gap-y-2">
                <div className="w-full flex flex-row items-center border dark:border-Dark300 rounded-lg p-2">
                  <input
                    value={newPassword}
                    onChange={(event: any) =>
                      setNewPassword(event.target.value)
                    }
                    type={`${showNewPassword ? "text" : "password"}`}
                    placeholder="New Password"
                    className="flex-grow  bg-transparent outline-none "
                  />
                  <button onClick={handleShowNewPassword}>
                    <IonIcon
                      icon={`${showNewPassword ? eyeOutline : eyeOffOutline}`}
                    />
                  </button>
                </div>
                <div className="w-full flex flex-row items-center border dark:border-Dark300 rounded-lg p-2">
                  <input
                    value={confirmNewPassword}
                    onChange={(event: any) =>
                      setConfirmNewPassword(event.target.value)
                    }
                    type={`${showConfirmNewPassword ? "text" : "password"}`}
                    placeholder="Confirm New Password"
                    className="flex-grow  bg-transparent outline-none "
                  />
                  <button onClick={handleShowConfirmNewPassword}>
                    <IonIcon
                      icon={`${
                        showConfirmNewPassword ? { eyeOutline } : eyeOffOutline
                      }`}
                    />
                  </button>
                </div>
              </div>
            )}
            {!changePassWord ? (
              <div>
                <CancelButton onClick={[openChangePasswordForm]}>
                  Change Password
                </CancelButton>
              </div>
            ) : null}
          </div>

          {authMessage && <div>{authMessage}</div>}
        </div>
        <div className="w-full flex flex-row items-center py-5">
          <ConfirmButton onClick={[handleSaveChanges]}>
            Save Changes
          </ConfirmButton>
        </div>
      </div>
      <div className="w-full flex lg:hidden flex-col p-2 border dark:border-Dark300 mx-1 rounded-lg gap-y-2">
        <div
          onClick={setThemeMode}
          className="flex flex-row items-center gap-x-1 text-xl cursor-pointer"
        >
          <IonIcon icon={mode ? moonOutline : sunnyOutline} />
          <div>{mode ? "Dark Mode" : "Light Mode"}</div>
        </div>
        <div
          onClick={handleLogOut}
          className="flex flex-row items-center gap-x-1 text-xl"
        >
          <IonIcon icon={powerOutline} />
          <div>Log Out</div>
        </div>
      </div>
    </div>
  );
};

export default AccountSettings;

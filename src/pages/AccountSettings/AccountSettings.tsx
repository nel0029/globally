/** @format */

import React, { useEffect, useState } from "react";
import Header from "../../common/Header";
import TitleText from "../../common/TitleText";
import { IonIcon } from "@ionic/react";
import {
  eyeOutline,
  eyeOffOutline,
  checkmarkCircle,
  closeCircle,
} from "ionicons/icons";
import ConfirmButton from "../../common/ConfirmButton";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../redux/store";
import {
  getAccountData,
  updateUserAccount,
  verifyUserName,
} from "../../redux/asynActions/userAsyncActions";
import CancelButton from "../../common/CancelButton";
import useDebounce from "../Register/Hooks/useDebounce";
import { useNavigate, useLocation } from "react-router";
import BackButton from "../../common/BackButton";
import { resetValid } from "../../redux/usersSlice";

const AccountSettings = () => {
  const dispatch = useDispatch<AppDispatch>();
  const location = useLocation();
  const user = useSelector((state: any) => state.user.userData);
  const account = useSelector((state: any) => state.user.accountData);
  const valid = useSelector((state: any) => state.user.valid);
  const [userFirstName, setUserFirstName] = useState("");
  const [userMiddleName, setUserMiddleName] = useState("");
  const [userLastName, setUserLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [editUserName, setEditUserName] = useState(false);
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
  const [userNameError, setUserNameError] = useState("");
  const authMessage = useSelector((state: any) => state.user.authMessage);
  const navigate = useNavigate();

  const [isInAccountSettings, setIsInAccountSettings] = useState(false);
  const debouncedUserName = useDebounce(userName, 500);

  useEffect(() => {
    if (editUserName && userName) {
      dispatch(verifyUserName(debouncedUserName));
    }
  }, [debouncedUserName]);

  useEffect(() => {
    setIsInAccountSettings(true);

    return () => {
      setIsInAccountSettings(false);
    };
  }, [location.pathname]);

  useEffect(() => {
    const data = {
      userID: user?.userID,
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

  const closeChangePasswordForm = () => {
    setChangePassWord(false);
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
    const data = {
      userID: user?.userID,
      userName: userName !== account?.userName ? userName : "",
      userFirstName: userFirstName,
      userMiddleName: userMiddleName,
      userLastName: userLastName,
      email: email !== account?.email ? email : "",
      bio: bio,
      currentPassword: currentPassword,
      newPassword: matchedPassword,
      avatarURL: profilePicture,
      coverPhotoURL: coverPhoto,
    };

    dispatch(updateUserAccount(data));

    setCurrentPassword("");
    dispatch(updateUserAccount(data));

    dispatch(resetValid());
  };

  useEffect(() => {
    if (newPassword === confirmNewPassword) {
      setMatchedPassword(newPassword);
    }
  }, [confirmNewPassword, newPassword]);

  const goBack = () => {
    setIsInAccountSettings(false);
    dispatch(resetValid());
    setTimeout(() => {
      navigate(-1);
    }, 150);
  };

  return (
    <div
      className={`${
        isInAccountSettings ? " right-0 xl:right-0" : " -right-full xl:right-0"
      } z-50 absolute overflow-y-auto xl:overflow-y-visible top-0 h-screen xl:h-auto w-full flex-grow flex flex-col items-center gap-y-2 dark:bg-Dark100 bg-Light100 transition-[right] ease-in-out duration-150`}
    >
      <Header>
        <div className="block xl:hidden">
          <BackButton onClick={goBack} />
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
                className="w-full border dark:border-Dark300 rounded-lg bg-transparent outline-none p-2 focus:border-secondary"
                name="userFirstName"
                value={userFirstName}
                onChange={(event: any) => setUserFirstName(event.target.value)}
              />
            </div>

            <div>
              <div className="text-sm text-gray-500">Middle Name</div>
              <input
                className="w-full border dark:border-Dark300 rounded-lg bg-transparent outline-none p-2 focus:border-secondary"
                name="userMiddleName"
                value={userMiddleName}
                onChange={(event: any) => setUserMiddleName(event.target.value)}
              />
            </div>

            <div>
              <div className="text-sm text-gray-500">Last Name</div>
              <input
                className="w-full border dark:border-Dark300 rounded-lg bg-transparent outline-none p-2 focus:border-secondary"
                name="userLastName"
                value={userLastName}
                onChange={(event: any) => setUserLastName(event.target.value)}
              />
            </div>

            <div>
              <div className="text-sm text-gray-500">Bio</div>
              <textarea
                className="w-full border dark:border-Dark300 rounded-lg bg-transparent outline-none p-2 focus:border-secondary resize-none h-[100px]"
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
            <div className="w-full flex flex-row items-center gap-x-1">
              <div className="text-sm text-gray-500">UserName</div>
              {userName !== account?.userName && authMessage && (
                <span
                  className={`text-sm ${
                    !valid ? "text-primary" : "text-secondary1"
                  }`}
                >
                  {authMessage}
                </span>
              )}
            </div>
            <input
              className="w-full border dark:border-Dark300 rounded-lg bg-transparent outline-none p-2 focus:border-secondary"
              onFocus={() => setEditUserName(true)}
              onBlur={() => {
                setEditUserName(false);
              }}
              name="userName"
              value={userName}
              onChange={(event: any) => setUserName(event.target.value)}
            />

            <div>
              <div className="text-sm text-gray-500">Email Address</div>
              <input
                className="w-full border dark:border-Dark300 rounded-lg bg-transparent outline-none p-2 focus:border-secondary"
                name="email"
                value={email}
                onChange={(event: any) => setEmail(event.target.value)}
              />
            </div>

            {changePassWord && (
              <div className="flex flex-col gap-y-2">
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
                      icon={`${
                        showCurrentPassword ? eyeOutline : eyeOffOutline
                      }`}
                    />
                  </button>
                </div>
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
                        showConfirmNewPassword ? eyeOutline : eyeOffOutline
                      }`}
                    />
                  </button>
                </div>
                {newPassword && newPassword !== confirmNewPassword ? (
                  <span className="text-sm text-primary flex flex-row items-center gap-x-1">
                    <IonIcon icon={closeCircle} />
                    Password don't match
                  </span>
                ) : (
                  <span className="text-sm text-secondary1 flex flex-row items-center gap-x-1">
                    <IonIcon icon={checkmarkCircle} />
                    Password match
                  </span>
                )}
              </div>
            )}
            {!changePassWord ? (
              <div>
                <CancelButton onClick={[openChangePasswordForm]}>
                  Change Password
                </CancelButton>
              </div>
            ) : (
              <div>
                <CancelButton onClick={[closeChangePasswordForm]}>
                  Cancel Change Password
                </CancelButton>
              </div>
            )}
          </div>
        </div>
        <div className="w-full flex flex-row items-center py-5">
          <ConfirmButton
            disabled={
              (editUserName && userName && !valid) ||
              (newPassword && newPassword !== confirmNewPassword)
                ? true
                : false
            }
            onClick={[handleSaveChanges]}
          >
            Save Changes
          </ConfirmButton>
        </div>
      </div>
    </div>
  );
};

export default AccountSettings;

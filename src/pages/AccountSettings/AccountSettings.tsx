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
  camera,
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
import CoverPhoto from "../Profile/ProfileComponents/CoverPhoto";
import CircleLoader from "../../common/CircleLoader";

const AccountSettings = () => {
  const dispatch = useDispatch<AppDispatch>();
  const location = useLocation();
  const userID = localStorage.getItem("userID");
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
  const [isSavingLoading, setIsSavingLoading] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
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
    if (userID) {
      const data = {
        userID: userID,
      };

      dispatch(getAccountData(data));
    }

    setCurrentPassword("");
  }, [user?.userID, userID]);

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

  const handleAvatarOnChange = (event: any) => {
    const file = event.target.files[0];

    setProfilePicture(file);
  };

  const handleCoverPhotoOnChange = (event: any) => {
    const file = event.target.files[0];

    setCoverPhoto(file);
  };

  const handleSaveChanges = () => {
    if (userID) {
      const data = {
        userID: userID,
        userName: userName !== account?.userName ? userName : "",
        userFirstName: userFirstName,
        userMiddleName: userMiddleName,
        userLastName: userLastName,
        email: email !== account?.email ? email : "",
        bio: bio ? bio : "",
        currentPassword: currentPassword,
        newPassword: matchedPassword,

        avatarURL: profilePicture ? profilePicture : "",
        coverPhotoURL: coverPhoto ? coverPhoto : "",
      };
      setIsSavingLoading(true);
      dispatch(updateUserAccount(data)).then((response) => {
        if (response.meta.requestStatus === "fulfilled") {
          setIsSavingLoading(false);
        } else {
          setIsSavingLoading(false);
        }
      });

      setCurrentPassword("");

      dispatch(resetValid());
    }
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

  const discardChanges = () => {
    setUserName(account?.userName);
    setUserFirstName(account?.userFirstName);
    setUserMiddleName(account?.userMiddleName);
    setUserLastName(account?.userLastName);
    setBio(account?.bio);
    setEmail(account?.email);
    setProfilePicture(null);
    setCoverPhoto(null);
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
        <div className="w-full flex flex-col items-center">
          <div className="w-full relative">
            <CoverPhoto
              coverPhotoURL={
                coverPhoto
                  ? URL.createObjectURL(coverPhoto)
                  : account?.coverPhotoURL?.url
                  ? account?.coverPhotoURL?.url
                  : ""
              }
            />
            <div className="absolute bottom-2 right-2 rounded-full bg-white dark:bg-Dark200 flex justify-center items-center ">
              <label
                className="p-1 text-2xl rounded-full flex justify-center items-center cursor-pointer"
                htmlFor="fileInputCoverPhoto"
              >
                <IonIcon icon={camera} />
              </label>
              <input
                type="file"
                id="fileInputCoverPhoto"
                name="coverPhoto"
                accept="image/*"
                className="hidden"
                onChange={handleCoverPhotoOnChange}
              />
            </div>
          </div>
          <div className="w-full min-h-[40px]  relative px-2">
            <div className="absolute top-0 transform translate-y-[-75%] w-[75px] h-[75px]">
              <div className="relative flex justify-center items-center w-[100px] h-[100px] rounded-full aspect-square border-[3px] lg:border-[5px] border-slate-100 dark:border-Dark200">
                <img
                  className="object-cover w-full h-full rounded-full "
                  src={
                    profilePicture
                      ? URL.createObjectURL(profilePicture)
                      : account?.avatarURL?.url
                      ? account?.avatarURL.url
                      : ""
                  }
                />

                <div className="absolute -bottom-1 -right-1 rounded-full bg-white dark:bg-Dark200 flex justify-center items-center ">
                  <label
                    className="p-1 text-2xl rounded-full flex justify-center items-center cursor-pointer"
                    htmlFor="fileInput"
                  >
                    <IonIcon icon={camera} />
                  </label>
                  <input
                    type="file"
                    id="fileInput"
                    name="profilePicture"
                    accept="image/*"
                    className="hidden"
                    onChange={handleAvatarOnChange}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
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
        <div className="w-full flex flex-row items-center py-5 gap-x-2">
          <CancelButton
            className={` rounded-lg  px-5 py-1 border border-primary bg-primary text-white `}
            onClick={[discardChanges]}
          >
            Discard
          </CancelButton>
          <ConfirmButton
            disabled={
              (editUserName && userName && !valid) ||
              (newPassword && newPassword !== confirmNewPassword) ||
              isSavingLoading === true
                ? true
                : false
            }
            onClick={[handleSaveChanges]}
          >
            Save Changes {isSavingLoading && <CircleLoader />}
          </ConfirmButton>
        </div>
      </div>
    </div>
  );
};

export default AccountSettings;

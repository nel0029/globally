/** @format */

import { IonIcon } from "@ionic/react";
import { cogOutline } from "ionicons/icons";
import React, { useEffect, useState, useRef } from "react";
import { Outlet, useParams } from "react-router";
import Header from "../../common/Header";
import BackButton from "../../common/BackButton";
import TitleText from "../../common/TitleText";
import ConfirmButton from "../../common/ConfirmButton";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import {
  getUserDetails,
  deleteUserPosts,
} from "../../redux/asynActions/postAsynActions";
import { useLocation, useNavigate } from "react-router";
import CoverPhoto from "./ProfileComponents/CoverPhoto";
import { UserDetails } from "../../redux/postSlice";
import UserDetailsAvatar from "./ProfileComponents/UserDetailsAvatar";
import FollowBlockContainer from "./ProfileComponents/FollowBlockContainer";
import CancelButton from "../../common/CancelButton";

const Profile = () => {
  const { userName } = useParams<{ userName: string }>();
  const user = useSelector((state: any) => state.user.userData);
  const userDetails: UserDetails = useSelector(
    (state: any) => state.posts.userDetails
  );
  const dispatch = useDispatch<AppDispatch>();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(location.pathname);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isInUserProfile, setIsInUserProfile] = useState(false);
  const userID = localStorage.getItem("userID");

  const fullNameArray = [
    userDetails?.userFirstName,
    userDetails?.userMiddleName,
    userDetails?.userLastName,
  ];
  const fullName = fullNameArray?.join(" ");

  useEffect(() => {
    if (userID) {
      const data = {
        userName: userName || "",
        authorID: userID,
      };
      if (userDetails) {
        if (userDetails?.userName === userName) {
          navigate(`/${userDetails?.userName}`, { replace: true });
          handleTabChange(activeTab);
          setActiveTab(`/${userDetails?.userName}`);
          setIsLoading(false);
        } else {
          setIsLoading(true);
          dispatch(getUserDetails(data)).then((response: any) => {
            if (response.meta.requestStatus === "fulfilled") {
              setIsLoading(false);
            }
          });
        }
      } else {
        setIsLoading(true);
        dispatch(getUserDetails(data)).then((response: any) => {
          if (response.meta.requestStatus === "fulfilled") {
            setIsLoading(false);
          }
        });
      }
    }
  }, [userID, userName, dispatch, user?.userID]);

  const handleTabChange = (tabUrl: string) => {
    setActiveTab(tabUrl);
  };

  const goToUserPosts = () => {
    navigate(`/${userDetails?.userName}`, { replace: true });
    handleTabChange(activeTab);
    setActiveTab(`/${userDetails?.userName}`);
  };

  const goToUserReplies = () => {
    navigate(`/${userDetails?.userName}/replies`, { replace: true });
    handleTabChange(activeTab);
    setActiveTab(`/${userDetails?.userName}/replies`);
  };

  const goToUserReposts = () => {
    navigate(`/${userDetails?.userName}/reposts`, { replace: true });
    handleTabChange(activeTab);
    setActiveTab(`/${userDetails?.userName}/reposts`);
  };

  const goToUserLikes = () => {
    navigate(`/${userDetails?.userName}/likes`, { replace: true });
    handleTabChange(activeTab);
    setActiveTab(`/${userDetails?.userName}/likes`);
  };

  const goToUserFollowing = () => {
    navigate(`/${userDetails?.userName}/following`, { replace: true });
  };

  const goToUserFollowers = () => {
    navigate(`/${userDetails?.userName}/followers`, { replace: true });
  };

  const goBack = () => {
    setIsInUserProfile(false);
    setTimeout(() => {
      navigate(-1);
    }, 150);
  };

  useEffect(() => {
    setActiveTab(location.pathname);
    setIsInUserProfile(true);

    return () => setIsInUserProfile(false);
  }, []);

  const deletePosts = () => {
    const data = {
      userName: userName,
      adminID: userID,
    };
    dispatch(deleteUserPosts(data));
  };

  return (
    <div
      id="profile-route"
      className={`${
        isInUserProfile ? "right-0 xl:right-0" : "-right-full xl:right-0"
      } z-50 dark:bg-Dark100 bg-Light100 fixed xl:absolute top-0 w-full max-h-full xl:h-auto transition-[right] ease-in-out duration-150 overflow-y-auto xl:overflow-visible`}
    >
      <div className="w-full h-auto">
        <Header>
          <BackButton onClick={goBack} />
          <div className="flex flex-col leading-6">
            <TitleText>
              <div className="w-full flex flex-row items-center gap-x-1">
                {isLoading ? (
                  <div className=" h-[24px] w-[100px]"> </div>
                ) : (
                  fullName
                )}
                {userDetails?.verified && (
                  <img className="w-[20px] h-[20px]" src="/blue-check.png" />
                )}
              </div>
            </TitleText>
            <div className="flex items-center text-xs xl:text-sm text-gray-400">
              {userDetails?.allPostsCount} Posts
            </div>
          </div>
        </Header>

        <div
          id="user-details"
          className=" bg-white dark:bg-Dark200 flex-grow w-full flex flex-col gap-y-2 flex-shrink "
        >
          <div className="w-full">
            {isLoading ? (
              <div className="relative w-full aspect-3/1">
                <div className="w-full h-full flex items-center justify-center bg-gray-300 dark bg-gray-200:dark:bg-gray-700"></div>
              </div>
            ) : (
              <CoverPhoto coverPhotoURL={userDetails?.coverPhotoURL.url} />
            )}
          </div>
          <div className="w-full flex flex-col p-2">
            <div className="relative max-h-[60px] w-1/4 h-full">
              {isLoading ? (
                <div className="absolute top-0 transform translate-y-[-75%] w-full">
                  <svg
                    className="min-w-[60px] max-w-[150px] min-h-[60px] max-h-[150px] bg-gray-100 dark:bg-gray-300 text-gray-200 dark:text-gray-700 rounded-full"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
                  </svg>
                </div>
              ) : (
                <UserDetailsAvatar avatarURL={userDetails?.avatarURL} />
              )}
            </div>
            <div className="w-full flex flex-row items-center justify-end ">
              {user?.role === "admin" && (
                <ConfirmButton onClick={[deletePosts]}>
                  Delete User Posts
                </ConfirmButton>
              )}
              {isLoading ? (
                <CancelButton>Unfollow</CancelButton>
              ) : user?.userID === userDetails?._id ? (
                <ConfirmButton
                  className="pl-4 pr-6 py-1 rounded-full"
                  onClick={[() => navigate("/account/setting")]}
                >
                  <div className="text-sm sm:text-base flex flex-row items-center gap-x-2">
                    <IonIcon icon={cogOutline} />
                    <span className="">Edit Profile</span>
                  </div>
                </ConfirmButton>
              ) : (
                <FollowBlockContainer
                  isFollowedUser={userDetails?.isFollowedUser}
                  followID={userDetails?.followID}
                  userFollowingID={userDetails?._id}
                />
              )}
            </div>

            <div
              className={`w-full flex flex-col px-2 justify-start ${
                isLoading ? "animate-pulse" : ""
              }`}
            >
              <div className="w-full flex flex-row items-center gap-x-1 text-[18px] font-bold">
                {isLoading ? (
                  <div className="h-[14px] w-[200px] my-[2px] bg-gray-200 dark:bg-gray-700 rounded-full " />
                ) : (
                  fullName
                )}
                {userDetails?.verified && (
                  <img className="w-[20px] h-[20px]" src="/blue-check.png" />
                )}
              </div>
              {isLoading ? (
                <div className="h-[12px] w-[100px] my-[2px] bg-gray-200 dark:bg-gray-700 rounded-full " />
              ) : (
                <div className="text-gray-500 text-[16px]">
                  @{userDetails?.userName}
                </div>
              )}
              {isLoading ? (
                <div className="h-[16px] w-[150px] my-1 bg-gray-200 dark:bg-gray-700 rounded-full " />
              ) : (
                <div className="w-full text-[16px] leading-[16px] py-1">
                  {userDetails?.bio ? (
                    userDetails.bio
                      .split("\n")
                      .map((line: string, index: number) => (
                        <p key={index}>{line}</p>
                      ))
                  ) : (
                    <div className="h-[16px] py-1" />
                  )}
                </div>
              )}
              <div className="w-full flex flex-row items-center gap-x-2 flex-wrap ">
                {isLoading ? (
                  <div className="h-[16px] w-[75px] my-[2px] bg-gray-200 dark:bg-gray-700 rounded-full " />
                ) : (
                  <div
                    onClick={goToUserFollowing}
                    className="text-sm flex flex-row items-center gap-x-1 group relative cursor-pointer"
                  >
                    <span className="font-semibold ">
                      {userDetails?.followingsCount}
                    </span>
                    <span className="font-semibold text-gray-400 ">
                      Following
                    </span>
                    <div className="hidden group-hover:flex absolute left-0 right-0 bottom-[2px] border-b-2 border-gray-400"></div>
                  </div>
                )}
                {isLoading ? (
                  <div className="h-[16px] w-[75px] my-[2px] bg-gray-200 dark:bg-gray-700 rounded-full " />
                ) : (
                  <div
                    onClick={goToUserFollowers}
                    className="text-sm flex flex-row items-center gap-x-1 group relative cursor-pointer"
                  >
                    <span className="font-semibold">
                      {userDetails?.followersCount}
                    </span>
                    <span className="font-semibold text-gray-400">
                      Followers
                    </span>
                    <div className="hidden group-hover:flex absolute left-0 right-0 bottom-[2px] border-b-2 border-gray-400"></div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div
          className={`bg-white dark:bg-Dark200 sticky top-[60px] left-0 right-0 z-50 w-full overflow-x-auto flex flex-row`}
        >
          {userDetails ? (
            <React.Fragment>
              <div
                onClick={goToUserPosts}
                className={`${
                  activeTab === `/${userDetails?.userName}`
                    ? "border-b-4 border-secondary font-bold"
                    : ""
                } flex justify-center items-center py-3 px-3 hover:bg-opacity-20 cursor-pointer`}
              >
                Posts
              </div>
              <div
                onClick={goToUserReplies}
                className={`${
                  activeTab === `/${userDetails?.userName}/replies`
                    ? "border-b-4 border-secondary font-bold"
                    : ""
                } flex justify-center items-center py-3 px-3 hover:bg-opacity-20 cursor-pointer`}
              >
                Replies
              </div>
              <div
                onClick={goToUserReposts}
                className={`${
                  activeTab === `/${userDetails?.userName}/reposts`
                    ? "border-b-4 border-secondary font-bold"
                    : ""
                } flex justify-center items-center py-3 px-3 hover:bg-opacity-20 cursor-pointer`}
              >
                Reposts
              </div>
              <div
                onClick={goToUserLikes}
                className={`${
                  activeTab === `/${userDetails?.userName}/likes`
                    ? "border-b-4 border-secondary font-bold"
                    : ""
                } flex justify-center items-center py-3 px-3 hover:bg-opacity-20 cursor-pointer`}
              >
                Likes
              </div>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <div
                onClick={goToUserPosts}
                className={`flex justify-center items-center py-3 px-3 hover:bg-opacity-20 cursor-pointer`}
              >
                Posts
              </div>
              <div
                onClick={goToUserReplies}
                className={`flex justify-center items-center py-3 px-3 hover:bg-opacity-20 cursor-pointer`}
              >
                Replies
              </div>
              <div
                onClick={goToUserReposts}
                className={`flex justify-center items-center py-3 px-3 hover:bg-opacity-20 cursor-pointer`}
              >
                Reposts
              </div>
              <div
                onClick={goToUserLikes}
                className={`flex justify-center items-center py-3 px-3 hover:bg-opacity-20 cursor-pointer`}
              >
                Likes
              </div>
            </React.Fragment>
          )}
        </div>
        <div
          id="tabs"
          className="w-full min-h-[calc(100vh-180px)] xl:h-auto dark:bg-Dark100 bg-Light100 flex flex-col-reverse justify-center items-center"
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Profile;

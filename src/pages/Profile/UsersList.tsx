/** @format */

import React, { useEffect, useState } from "react";
import Header from "../../common/Header";
import { Outlet } from "react-router";
import { IonIcon } from "@ionic/react";
import TitleText from "../../common/TitleText";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { getUserDetails } from "../../redux/asynActions/postAsynActions";
import { useLocation, useNavigate, useParams } from "react-router";
import { arrowBackOutline } from "ionicons/icons";

const UsersList = () => {
  const { userName } = useParams();
  const userDetails = useSelector((state: any) => state.posts.userDetails);
  const user = useSelector((state: any) => state.user.userData);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(location.pathname);

  const data = {
    userName: userName || "",
    authorID: user.userID || "",
  };

  useEffect(() => {
    dispatch(getUserDetails(data));
  }, [dispatch, userName]);

  const goToUserFollowing = () => {
    navigate(`/${userDetails?.userName}/following`);
    setActiveTab(`/${userDetails?.userName}/following`);
  };

  const goToUserFollowers = () => {
    navigate(`/${userDetails?.userName}/followers`);
    setActiveTab(`/${userDetails?.userName}/followers`);
  };

  const goToUserDetails = () => {
    navigate(`/${userDetails?.userName}`);
  };

  return (
    <div className="w-full flex flex-col gap-y-2">
      <Header>
        <div
          onClick={goToUserDetails}
          className="flex justify-center items-center p-2 rounded-full hover:bg-slate-200 dark:hover:bg-Dark300 cursor-pointer"
        >
          <IonIcon icon={arrowBackOutline} />
        </div>
        <div className="flex flex-col leading-6">
          <TitleText>
            <div className="w-full flex flex-row items-center">
              <span>{userDetails?.userFirstName}</span>
              <span>{userDetails?.userMiddleName}</span>
              <span>{userDetails?.userLastName}</span>
            </div>
          </TitleText>
          <div className="flex items-center text-xs xl:text-sm text-gray-400">
            @{userDetails?.userName}
          </div>
        </div>
      </Header>

      <div className="w-full p-2 flex flex-row items-center justify-start gap-x-2 overflow-x-auto flex-nowrap flex-shrink snap-mandatory scroll-px-9 transform-gpu no-scrollbar">
        <div
          onClick={goToUserFollowing}
          className={`${
            activeTab === `/${userDetails?.userName}/following`
              ? "border-b-4 border-secondary font-bold"
              : ""
          } py-1 px-5 flex-shrink-0 flex-1 flex flex-row justify-center items-center cursor-pointer`}
        >
          Following
        </div>
        <div
          onClick={goToUserFollowers}
          className={`${
            activeTab === `/${userDetails?.userName}/followers`
              ? "border-b-4 border-secondary font-bold"
              : ""
          } py-1 px-5 flex-shrink-0 flex-1 flex flex-row justify-center items-center cursor-pointer`}
        >
          Followers
        </div>
      </div>

      <Outlet />
    </div>
  );
};

export default UsersList;

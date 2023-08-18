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

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const location = useLocation();

  const userDetails = useSelector((state: any) => state.posts.userDetails);
  const user = useSelector((state: any) => state.user.userData);

  const [activeTab, setActiveTab] = useState(location.pathname);
  const [isLoading, setIsLoading] = useState(false);

  const fullNameArray = [
    userDetails?.userFirstName,
    userDetails?.userMiddleName,
    userDetails?.userLastName,
  ];
  const fullName = fullNameArray?.join(" ");
  const data = {
    userName: userName || "",
    authorID: user.userID || "",
  };

  useEffect(() => {
    if (userDetails) {
      if (userDetails.userName === userName) {
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
  }, [dispatch, userName]);

  const goToUserFollowing = () => {
    navigate(`/${userDetails?.userName}/following`, { replace: true });
    setActiveTab(`/${userDetails?.userName}/following`);
  };

  const goToUserFollowers = () => {
    navigate(`/${userDetails?.userName}/followers`, { replace: true });
    setActiveTab(`/${userDetails?.userName}/followers`);
  };

  const goToUserDetails = () => {
    navigate(-1);
  };

  return (
    <div className="w-full z-50 fixed top-0 bottom-0 left-0 right-0 lg:static flex flex-col dark:bg-Dark100 bg-slate-100">
      <Header>
        <div
          onClick={goToUserDetails}
          className="flex justify-center items-center p-2 rounded-full hover:bg-slate-200 dark:hover:bg-Dark300 cursor-pointer"
        >
          <IonIcon icon={arrowBackOutline} />
        </div>
        <div className="flex flex-col ">
          <TitleText>
            <div className="w-full flex flex-row items-center gap-y-1">
              {isLoading ? (
                <div className=" h-[28px] w-[100px]"> </div>
              ) : (
                fullName
              )}
            </div>
          </TitleText>
          <div className="flex items-center text-xs xl:text-sm text-gray-400">
            {isLoading ? (
              <div className=" h-[20px] xl:h-[22px] w-[100px]"> </div>
            ) : (
              <span>@{userDetails?.userName}</span>
            )}
          </div>
        </div>
      </Header>

      <div className="w-full px-2 flex flex-row items-center justify-start gap-x-2 overflow-x-auto flex-nowrap flex-shrink snap-mandatory scroll-px-9 transform-gpu no-scrollbar bg-white dark:bg-Dark300 border-y dark:border-Dark400">
        <div
          onClick={goToUserFollowing}
          className={`${
            activeTab === `/${userDetails?.userName}/following`
              ? "border-b-4 border-secondary font-bold"
              : ""
          } py-3 px-5 flex-shrink-0 flex-1 flex flex-row justify-center items-center cursor-pointer`}
        >
          Following
        </div>
        <div
          onClick={goToUserFollowers}
          className={`${
            activeTab === `/${userDetails?.userName}/followers`
              ? "border-b-4 border-secondary font-bold"
              : ""
          } py-3 px-5 flex-shrink-0 flex-1 flex flex-row justify-center items-center cursor-pointer`}
        >
          Followers
        </div>
      </div>

      <Outlet />
    </div>
  );
};

export default UsersList;

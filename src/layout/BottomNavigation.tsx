/** @format */

import React, { useState, useEffect } from "react";
import { IonIcon } from "@ionic/react";
import {
  homeOutline,
  mailOutline,
  notificationsOutline,
  home,
  mail,
  notifications,
  search,
  searchOutline,
  menuOutline,
  add,
  close,
} from "ionicons/icons";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../redux/store";
import { useLocation } from "react-router";
import { useNavigate } from "react-router";
import { resetNotificationsCount } from "../redux/messageSlice";
import socket from "../sockets/socket";
import Modal from "../common/Modal";
import CreateNewPostInput from "../pages/Home/PostComponents/CreateNewPostInput";

const BottomNavigation = () => {
  const userID = localStorage.getItem("userID");
  const notificationList = useSelector(
    (state: any) => state.messages.notificationList
  );

  const unseenNotifications = notificationList?.filter(
    (notif: any) => notif.seen === false
  );

  const location = useLocation();
  const [activeTab, setActiveTab] = useState("/");
  const [isNewPostOpen, setIsNewPostOpen] = useState(false);
  const [showNewPostButton, setShowNewPostButton] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    setActiveTab(location.pathname);

    const handleScroll = () => {
      if (window.scrollY > 140) {
        setShowNewPostButton(true);
      } else {
        setShowNewPostButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [location.pathname]);

  useEffect(() => {
    if (isNewPostOpen) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "visible";
    }
  }, [isNewPostOpen]);

  const goToHome = () => {
    if (activeTab === "/") {
      if (window.scrollY > 0) {
        window.scrollTo({ top: 0, behavior: "smooth" });
        navigate("/");
        setActiveTab("/");
      } else if (window.scrollY === 0) {
        window.location.reload();
        navigate("/");
        setActiveTab("/");
      }
    } else {
      navigate("/");
      setActiveTab("/");
    }
  };

  const goToExplore = () => {
    navigate("/explore");
    setActiveTab("/explore");
  };

  const goToMessages = () => {
    navigate(`/messages`);
    setActiveTab(`/messages`);
  };

  const goToNotifications = () => {
    navigate(`/notifications`);
    setActiveTab(`/notifications`);
    dispatch(resetNotificationsCount());

    const data = {
      userID: userID,
    };
    socket?.emit("resetNotificationsCount", data);
  };

  const handleOpenMenu = () => {
    navigate("/settings");
  };

  const handleOpenNewPostInput = () => {
    setIsNewPostOpen(true);
  };

  const handleCloseNewPostInput = () => {
    setIsNewPostOpen(false);
  };

  return (
    <div
      id="bottom-nav"
      className="z-30 fixed bottom-0 w-full flex lg:hidden flex-col bg-white dark:bg-Dark200 text-3xl"
    >
      {activeTab === "/" && (
        <div className="relative w-full h-0 flex flex-row justify-end">
          <div
            onClick={handleOpenNewPostInput}
            className={`${
              showNewPostButton ? "right-2" : "-right-full"
            } absolute bottom-[calc(100%+8px)] p-2 border rounded-full bg-secondary text-white font-bold flex justify-center items-center transition-[right] ease-in-out duration-300`}
          >
            <IonIcon icon={add} />
          </div>
          {isNewPostOpen && (
            <Modal setModal={setIsNewPostOpen}>
              <div className="w-full flex flex-col text-base">
                <div className="w-full flex flex-row justify-end">
                  <button
                    className="text-3xl"
                    onClick={handleCloseNewPostInput}
                  >
                    <IonIcon icon={close} />
                  </button>
                </div>
                <CreateNewPostInput />
              </div>
            </Modal>
          )}
        </div>
      )}

      <div className="w-full flex flex-row items-center justify-around py-3">
        <div
          className={`${
            activeTab === "/" ? "text-secondary" : ""
          } flex justify-center items-center text-4xl`}
          onClick={goToHome}
        >
          <IonIcon icon={activeTab === "/" ? home : homeOutline} />
        </div>
        <div
          className={`${
            activeTab.includes("/explore") ? "text-secondary" : ""
          } flex justify-center items-center text-4xl`}
          onClick={goToExplore}
        >
          <IonIcon
            icon={activeTab.includes("/explore") ? search : searchOutline}
          />
        </div>

        <div
          className={`${
            activeTab === "/messages" ? "text-secondary" : ""
          } flex justify-center items-center text-4xl`}
          onClick={goToMessages}
        >
          <IonIcon icon={activeTab === "/messages" ? mail : mailOutline} />
        </div>
        <div
          className={`${
            activeTab === "/notifications" ? "text-secondary" : ""
          } flex justify-center items-center text-4xl relative`}
          onClick={goToNotifications}
        >
          <IonIcon
            icon={
              activeTab === "/notifications"
                ? notifications
                : notificationsOutline
            }
          />
          {unseenNotifications?.length > 0 && (
            <div className="w-2 h-2 bg-primary rounded-full absolute right-0 top-0"></div>
          )}
        </div>

        <div
          className={` flex justify-center items-center text-4xl `}
          onClick={handleOpenMenu}
        >
          <IonIcon icon={menuOutline} />
        </div>
      </div>
    </div>
  );
};

export default BottomNavigation;

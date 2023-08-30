/** @format */

import React, { useEffect, useState } from "react";
import Header from "../../common/Header";
import TitleText from "../../common/TitleText";
import { IonIcon } from "@ionic/react";
import { heart, chatbox, arrowRedo } from "ionicons/icons";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { NotificationsProps } from "../../redux/messageSlice";
import {
  getAllNotifications,
  updateNotification,
} from "../../redux/asynActions/messageAsyncActions";
import { useNavigate } from "react-router";
import CardAvatar from "../Home/PostComponents/CardAvatar";
import LoadingNotificationCard from "./LoadingNotificationCard";
import NotificationAvatar from "./NotificationAvatar";

const Notifications = () => {
  const notifications = useSelector(
    (state: any) => state.messages.notificationList
  );
  const unseenNotifications = notifications?.filter(
    (notif: any) => notif.seen === false
  );

  const userID = localStorage.getItem("userID");
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const date = (createdAt: string) => {
    const dateAndTime = new Date(createdAt);
    const formattedDateAndTime = `${dateAndTime.toLocaleTimeString("en-us", {
      timeZone: "Asia/Manila",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    })} • ${dateAndTime.toLocaleDateString("en-us", {
      timeZone: "Asia/Manila",
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
    })}`;

    return formattedDateAndTime;
  };

  const iconToRender = (actionType: string) => {
    switch (actionType) {
      case "like":
        return (
          <div className="flex justify-center items-center text-xl text-primary">
            <IonIcon icon={heart} />
          </div>
        );

      case "reply":
        return (
          <div className="flex justify-center items-center text-xl text-secondary1">
            <IonIcon icon={chatbox} />
          </div>
        );
      case "repost":
        return (
          <div className="flex justify-center items-center text-xl text-secondary">
            <IonIcon icon={arrowRedo} />
          </div>
        );
      default:
        return null;
    }
  };

  const notificationTextToRender = (actionType: string) => {
    let notificationText;
    switch (actionType) {
      case "like":
        return (notificationText = "liked your");
      case "reply":
        return (notificationText = "replied to your");
      case "repost":
        return (notificationText = "reposted your");
      default:
        return null;
    }
  };

  const route = (postType: string) => {
    if (postType === "post") {
      return "posts";
    } else if (postType === "reply") {
      return "replies";
    } else if (postType === "repost") {
      return "reposts";
    } else {
      return "";
    }
  };

  useEffect(() => {
    const data = {
      userID: userID,
      markAllAsRead: false,
    };
    if (userID) {
      if (notifications) {
        setIsLoading(false);
      } else {
        setIsLoading(true);
        dispatch(getAllNotifications(data)).then((response: any) => {
          if (response.meta.requestStatus === "fulfilled") {
            setIsLoading(false);
          }
        });
      }
    }
  }, [userID]);

  const markAllAsRead = () => {
    const data = {
      userID: userID,
      markAllAsRead: false,
    };

    setIsLoading(true);
    dispatch(getAllNotifications(data)).then((response: any) => {
      if (response.meta.requestStatus === "fulfilled") {
        setIsLoading(false);
      }
    });
  };

  const markNotificationAsRead = (id: string) => {
    const data = { userID: userID ? userID : "", notificationID: id };

    dispatch(updateNotification(data));
  };

  const goTo = (
    id: string,
    actorUserName: string,
    postType: string,
    postID: string,
    actionType: string
  ) => {
    if (actionType === "follow") {
      navigate(`/${actorUserName}`);
      markNotificationAsRead(id);
    } else {
      navigate(`/${actorUserName}/${route(postType)}/${postID}`);
      markNotificationAsRead(id);
    }
  };

  const goToActorUserName = (event: any, actorUserName: string) => {
    event.stopPropagation();
    navigate(`/${actorUserName}`);
  };
  return (
    <div className="flex-1 w-full h-full flex-grow flex flex-col items-center justify-start">
      <Header>
        <TitleText>
          <div className="py-0.5">Notifications</div>
        </TitleText>
      </Header>
      <div className="w-full px-1 py-2">
        <div
          onClick={markAllAsRead}
          className="py-1 border dark:border-Dark300 w-full flex flex-row items-center justify-center hover:text-secondary rounded-lg cursor-pointer "
        >
          Mark all as read
        </div>
      </div>
      <div className="w-full flex-1 flex flex-col-reverse justify-end ">
        {isLoading ? (
          <React.Fragment>
            <LoadingNotificationCard />
            <LoadingNotificationCard />
            <LoadingNotificationCard />
            <LoadingNotificationCard />
            <LoadingNotificationCard />
            <LoadingNotificationCard />
            <LoadingNotificationCard />
            <LoadingNotificationCard />
          </React.Fragment>
        ) : notifications?.length > 0 ? (
          notifications.map((notification: NotificationsProps) => (
            <div
              key={notification._id}
              onClick={() =>
                goTo(
                  notification._id,
                  notification.actorUserName,
                  notification.postType,
                  notification.postID,
                  notification.actionType
                )
              }
              className="w-full border-y dark:border-Dark300 px-1 py-2 flex flex-row items-center gap-x-2 relative cursor-pointer hover:bg-black hover:bg-opacity-20 dark:hover:bg-white dark:hover:bg-opacity-20"
            >
              <div className="px-1">
                <NotificationAvatar
                  userName={notification.actorUserName}
                  avatarURL={notification.actorAvatarURL.url}
                  verified={notification.verified}
                />
              </div>

              <div className="flex flex-col flex-wrap">
                <div className="flex flex-row items-center gap-x-1 flex-wrap">
                  <div
                    onClick={(event: any) =>
                      goToActorUserName(event, notification.actorUserName)
                    }
                    className="font-bold hover:text-secondary hover:underline cursor-pointer"
                  >
                    {notification.actorUserName}
                  </div>
                  {iconToRender(notification.actionType)}
                  <div>{notificationTextToRender(notification.actionType)}</div>
                  <div className="font-bold ">{notification.postType}</div>
                </div>
                <div className="text-gray-400 text-sm flex flex-row items-center">
                  {date(notification.createdAt)}
                </div>
              </div>

              {notification.seen === false && (
                <div className="w-3 h-3 bg-primary rounded-full absolute top-1 right-1" />
              )}
            </div>
          ))
        ) : (
          <div className="w-full h-full flex-grow flex flex-col gap-y-2 justify-center items-center ">
            <div className="text-4xl font-extrabold">No notifications</div>
            <div>All your notifactions are found here</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default React.memo(Notifications);

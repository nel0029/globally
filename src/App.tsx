/** @format */

import RoutesPage from "./routes/RoutesPage";
import axios from "axios";
import NavBar from "./layout/NavBar";
import BottomNavigation from "./layout/BottomNavigation";
import { Routes, Route, useLocation } from "react-router";
import { useEffect, useState } from "react";
import socket from "./sockets/socket";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "./redux/store";
import {
  getUnseenMessagesCount,
  getUnseenNotifications,
} from "./redux/asynActions/messageAsyncActions";
import {
  addNewNotifcation,
  removeNotifcation,
  updateUnseenMessagesCount,
} from "./redux/messageSlice";
import Register from "./pages/Register/Register";
import LogIn from "./pages/LogIn/LogIn";
import { serverAddress } from "./config/Config";

const App = () => {
  axios.defaults.baseURL = serverAddress;
  axios.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${localStorage.getItem("token")}`;
  axios.defaults.headers.post["Content-Type"] = "application/json";
  const mode = useSelector((state: any) => state.theme.darkMode);
  const user = useSelector((state: any) => state.user.userData);
  const body = document.getElementById("body");
  const [bottomNavHeight, setBottomNavHeight] = useState(0);

  useEffect(() => {
    if (mode === true) {
      body?.classList.add("dark");
    } else {
      body?.classList.remove("dark");
    }
  }, [mode]);

  const location = useLocation();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const data = {
      userID: user.userID,
    };
    if (token) {
      socket.on("newNotification", (data: any) =>
        dispatch(addNewNotifcation(data))
      );
      socket.on("removeNotification", (data: any) => {
        dispatch(removeNotifcation(data));
      });
      socket.on("newMessageCount", (data: any) =>
        dispatch(updateUnseenMessagesCount(data))
      );
      dispatch(getUnseenMessagesCount(data));
    }

    return () => {
      // Clean up the event listeners when the component unmounts
      socket.off("newNotification");
      socket.off("removeNotification");
    };
  }, []);

  const [containerHeight, setContainerHeight] = useState(window.innerHeight);

  useEffect(() => {
    const handleResize = () => {
      setContainerHeight(window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const bottomNav = document.getElementById("bottom-nav");

  useEffect(() => {
    if (bottomNav && bottomNav.offsetHeight) {
      setBottomNavHeight(bottomNav.offsetHeight);
      console.log(bottomNav.offsetHeight);
    }
  }, [bottomNav, bottomNav?.offsetHeight]);

  return (
    <div
      style={{ height: containerHeight }}
      className={`w-full flex flex-col dark:text-white dark:text-opacity-[87%] `}
    >
      <div className="w-full flex flex-col flex-grow">
        {user ? (
          <Routes>
            <Route
              path="/*"
              element={
                <div className="w-full flex flex-col flex-grow transition-colors ease-in-out duration-300 ">
                  <div className="w-full flex flex-col lg:flex-row justify-center items-start flex-grow">
                    <NavBar />
                    <div
                      style={{
                        paddingBottom:
                          bottomNavHeight > 0 ? bottomNavHeight + 8 : 76,
                      }}
                      className="w-full flex flex-col flex-grow justify-start h-full"
                    >
                      <RoutesPage />
                    </div>
                  </div>
                  <BottomNavigation />
                </div>
              }
            />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<LogIn />} />
          </Routes>
        ) : (
          <div> Loading... </div>
        )}
      </div>
    </div>
  );
};

export default App;

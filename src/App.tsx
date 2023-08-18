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
import Settings from "./pages/Settings/Settings";
import TrendingHashtags from "./pages/Explore/ExploreComponents/TrendingHashtags";
import SearchBar from "./pages/Explore/ExploreComponents/SearchBar";

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

  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [appHeight, setAppHeight] = useState(0);
  const [initialHeight, setInitialHeight] = useState(0);

  useEffect(() => {
    setInitialHeight(window.innerHeight);
    const updateKeyboardHeight = () => {
      const currentHeight = window.innerHeight;
      const newKeboardHeight = initialHeight - currentHeight;
      const newAppHeight = initialHeight - keyboardHeight;
      setKeyboardHeight(newKeboardHeight);
      setAppHeight(newAppHeight);
    };

    window.addEventListener("resize", updateKeyboardHeight);

    return () => {
      window.addEventListener("resize", updateKeyboardHeight);
    };
  }, [keyboardHeight, appHeight]);

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
      userID: user?.userID,
    };
    if (token) {
      if (user && user.userID !== null) {
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
    }

    return () => {
      // Clean up the event listeners when the component unmounts
      socket.off("newNotification");
      socket.off("removeNotification");
    };
  }, [user?.userID]);

  const bottomNav = document.getElementById("bottom-nav");

  useEffect(() => {
    if (bottomNav && bottomNav.offsetHeight) {
      setBottomNavHeight(bottomNav.offsetHeight);
    }
  }, [bottomNav, bottomNav?.offsetHeight]);

  const [scrollPos, setScrollPos] = useState(0);

  useEffect(() => {
    const main = document.getElementById("main");
    if (main) {
      main.addEventListener("scroll", () => {
        setScrollPos(main.scrollTop);
      });
    }
  }, [scrollPos]);

  const handleIsInMessageRoute = (currentRoute: string): boolean => {
    if (currentRoute?.startsWith("/messages")) {
      return false;
    } else {
      return true;
    }
  };

  useEffect(() => {
    handleIsInMessageRoute(location.pathname);
  }, [location.pathname]);
  return (
    <div
      className={`h-full w-full flex flex-col dark:text-white dark:text-opacity-[87%] `}
    >
      <Settings />
      <div className="w-full h-full flex flex-col flex-grow">
        {user ? (
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<LogIn />} />
            <Route path="/settings" element={<Settings />} />
            <Route
              path="/*"
              element={
                <div className="w-full h-full flex flex-col flex-grow transition-colors ease-in-out duration-300 ">
                  <div className="w-full h-full flex flex-col lg:flex-row justify-start flex-1 overflow-y-scroll ">
                    <NavBar />
                    <div
                      id="main"
                      className={`w-full flex flex-col flex-1 justify-start pb-[76px] xl:relative`}
                    >
                      <RoutesPage pos={scrollPos} />
                    </div>
                    {handleIsInMessageRoute(location.pathname) && (
                      <div className="hidden xl:flex h-full w-full max-w-[400px] sticky top-0">
                        <TrendingHashtags />
                      </div>
                    )}
                  </div>
                  <BottomNavigation />
                </div>
              }
            />
          </Routes>
        ) : (
          <div> Loading... </div>
        )}
      </div>
    </div>
  );
};

export default App;

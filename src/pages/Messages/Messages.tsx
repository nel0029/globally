/** @format */

import React, { useEffect, useState } from "react";
import {
  Outlet,
  useParams,
  Route,
  Link,
  useLocation,
  Routes,
  useNavigate,
} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import socket from "../../sockets/socket";
import ConversationListContainer from "./MessageComponents/ConversationListContainer";
import ConversationContainer from "./MessageComponents/ConversationContainer";
import NewConversation from "./MessageComponents/NewConversation";
import MessageRequestListContainer from "./MessageComponents/MessageRequestListContainer";
import NoConvoSelected from "./MessageComponents/NoConvoSelected";
import NoMessageRequestSelected from "./MessageComponents/NoMessageRequestSelected";
import {
  createNewConvo,
  createNewMessage,
  setNewConvo,
  updateConvo,
} from "../../redux/messageSlice";

const Messages = () => {
  const { userID } = useParams();
  const user = useSelector((state: any) => state.user.userData);
  const isLogIn = useSelector((state: any) => state.user.isLogIn);

  const location = useLocation();
  const dispatch = useDispatch<AppDispatch>();

  const renderConversationList = () => {
    if (location.pathname.includes("/messages/r/requests")) {
      return <MessageRequestListContainer />;
    } else if (
      location.pathname === "/messages" ||
      location.pathname.startsWith("/messages/")
    ) {
      return <ConversationListContainer />;
    }
    return null;
  };

  const renderNoConvoSelected = () => {
    if (location.pathname === "/messages") {
      return <NoConvoSelected />;
    }
    return null;
  };

  const renderNoMessageRequestSelected = () => {
    if (location.pathname === "/messages/r/requests") {
      return <NoMessageRequestSelected />;
    }
    return null;
  };

  useEffect(() => {
    socket?.on("createNewMessage", (data: any) => {
      dispatch(setNewConvo(data));
    });
  }, []);

  return (
    <div
      id="message-container"
      className="w-full h-full flex-grow flex flex-col items-center justify-center gap-y-2 dark:bg-Dark100 bg-slate-100 relative"
    >
      <div className="flex-1 flex lg:hidden w-full h-full">
        <Routes>
          <Route path="/*" element={<ConversationListContainer />} />
          <Route path="/new" element={<NewConversation />} />
          <Route path="/:conversationID" element={<ConversationContainer />} />
          <Route path="/r/requests" element={<MessageRequestListContainer />} />
          <Route
            path="/r/requests/:conversationID"
            element={<ConversationContainer />}
          />
        </Routes>
      </div>
      <div className="h-full flex-grow hidden lg:flex w-full sticky top-0 bottom-0">
        <div className="min-w-[400px]">{renderConversationList()}</div>
        {renderNoConvoSelected()}
        {renderNoMessageRequestSelected()}
        <Routes>
          <Route path="/new" element={<NewConversation />} />
          <Route path="/:conversationID" element={<ConversationContainer />} />
          <Route
            path="/r/requests/:conversationID"
            element={<ConversationContainer />}
          />
        </Routes>
      </div>
    </div>
  );
};

export default Messages;

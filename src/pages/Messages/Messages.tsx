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
  updateConvo,
} from "../../redux/messageSlice";

const Messages = () => {
  const { userID } = useParams();
  const user = useSelector((state: any) => state.user.userData);
  const [messageText, setMessageText] = useState("");
  const [recievedMessage, setRecievedMessage] = useState<any[]>([]);
  const [mentions, setMentions] = useState([]);
  const location = useLocation();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  useEffect(() => {
    socket.off("response");
    socket.on("response", (messageData: any) => {
      setRecievedMessage((prev: any) => [...prev, messageData]);
    });
  }, []);

  useEffect(() => {
    const userID = user.userID;
    socket.emit("userConnected", userID);
  }, [socket]);

  useEffect(() => {
    socket.on("getAllMessages", (messages: any[]) => {
      setRecievedMessage(messages);
    });
  }, [socket]);

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
    socket.on("sendMessage", (data: any) => {
      const { conversation, message } = data;
      dispatch(createNewMessage(message));
      dispatch(updateConvo(conversation));
    });
  }, []);

  useEffect(() => {
    socket.on("createNewMessage", (data: any) => {
      const { conversation } = data;

      dispatch(createNewConvo(conversation));
      navigate(`/messages/${conversation.conversationID}`);
    });
  }, []);

  useEffect(() => {
    socket.on("joinConversation", (data: any) => {
      dispatch(updateConvo(data));
    });
  }, []);

  useEffect(() => {
    socket.on("receiveMessage", (data: any) => {
      const { conversation, message } = data;
      dispatch(updateConvo(conversation));
      dispatch(createNewMessage(message));
    });
  }, []);
  const bottomNav = document.getElementById("bottom-nav");
  const bottomNavHeight = bottomNav?.offsetHeight;
  return (
    <div className="w-full relative flex-grow flex flex-col items-center justify-center gap-y-2 top-0 bottom-0">
      <div
        style={{ height: `calc(100vh - ${bottomNavHeight}px)` }}
        className="z-[100] flex-grow flex lg:hidden w-full"
      >
        <Routes>
          <Route path="/" element={<ConversationListContainer />} />
          <Route path="/new" element={<NewConversation />} />
          <Route path="/:conversationID" element={<ConversationContainer />} />
          <Route path="/r/requests" element={<MessageRequestListContainer />} />
          <Route
            path="/r/requests/:conversationID"
            element={<ConversationContainer />}
          />
        </Routes>
      </div>
      <div className="hidden h-[100dvh] lg:flex w-full sticky top-0 bottom-0">
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

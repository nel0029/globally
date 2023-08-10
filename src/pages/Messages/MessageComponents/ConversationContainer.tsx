/** @format */

import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import socket from "../../../sockets/socket";
import Header from "../../../common/Header";
import { IonIcon } from "@ionic/react";
import { arrowBackOutline, paperPlane } from "ionicons/icons";
import MessageBubble from "./MessageBubble";
import CardAvatar from "../../Home/PostComponents/CardAvatar";
import {
  getConversationInfo,
  getAllMessages,
  getUnseenMessagesCount,
} from "../../../redux/asynActions/messageAsyncActions";
import { AppDispatch } from "../../../redux/store";
import {
  MessageDataProps,
  createNewConvo,
  resetMessages,
  updateConvo,
} from "../../../redux/messageSlice";
import { useLocation } from "react-router";
import { createNewMessage } from "../../../redux/messageSlice";

const ConversationContainer = () => {
  const { conversationID } = useParams<string>();
  const user = useSelector((state: any) => state.user.userData);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const messageContainerRef = useRef(document.createElement("div"));
  const messageEndRef = useRef(document.createElement("div"));
  const conversationInfo =
    useSelector((state: any) => state.messages.conversationInfo) || {};
  const messages = useSelector((state: any) => state.messages.messages) || [];
  const location = useLocation();
  const [messageText, setMessageText] = useState("");

  const scrollToBottom = () => {
    if (messages && messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "auto" });
    }
  };

  useEffect(() => {
    const data = {
      conversationID: conversationID,
      userID: user.userID,
    };

    dispatch(getConversationInfo(data)).then(() =>
      dispatch(getAllMessages(data))
    );

    const conversationData = {
      conversationID: conversationID,
      memberID: user.userID,
    };

    const unseenMessagesData = {
      userID: user.userID,
    };
    dispatch(getUnseenMessagesCount(unseenMessagesData));

    socket.emit("joinConversation", conversationData);

    return () => {
      socket.emit("leaveConversation", data);
      dispatch(resetMessages());
    };
  }, [conversationID, location.pathname]);

  useEffect(() => {
    if (messages.length > 0) {
      scrollToBottom();
    }
  }, [messages.length]);

  const goBack = () => navigate("/messages");

  const handleSendMessage = () => {
    const data = {
      text: messageText,
      conversationID: conversationID,
      senderID: user.userID,
    };

    socket.emit("sendMessage", data);
    scrollToBottom();
    setMessageText("");
  };

  return (
    <div
      className={`h-full z-50 top-0 bottom-0 flex-grow dark:bg-Dark100 bg-slate-100 w-full flex flex-col lg:border-l dark:border-Dark300 overflow-y-auto`}
    >
      {conversationInfo && (
        <div className="w-full flex flex-col flex-grow">
          <Header>
            <div className="flex flex-row items-center ">
              <div className="flex-[1] flex flex-row items-center">
                <div
                  onClick={goBack}
                  className="flex lg:hidden justify-center items-center p-2 rounded-full hover:bg-slate-200 dark:hover:bg-Dark300 cursor-pointer"
                >
                  <IonIcon icon={arrowBackOutline} />
                </div>
                <div className="flex flex-row gap-x-2">
                  <CardAvatar
                    width="32px"
                    height="32px"
                    avatarURL={conversationInfo.avatarURL?.url}
                  />
                  <div className="flex flex-row gap-x-1">
                    <span>{conversationInfo.receiverFirstName}</span>
                    <span>{conversationInfo.receiverMiddleName}</span>
                    <span>{conversationInfo.receiverLastName}</span>
                  </div>
                </div>
              </div>
            </div>
          </Header>
          <div className="flex-1 w-full overflow-auto">
            <div
              id="message-bubbles-container"
              ref={messageContainerRef}
              className="w-full flex flex-col flex-1 p-2 gap-y-2 overflow-y-auto"
            >
              {messages && messages.length > 0 ? (
                messages.map((message: MessageDataProps) => (
                  <MessageBubble
                    key={message._id}
                    senderID={message.senderID}
                    text={message.text}
                    createdAt={message.createdAt}
                  />
                ))
              ) : (
                <div>No messages</div>
              )}
              <div ref={messageEndRef} />
            </div>
          </div>

          <div className="sticky bottom-0 dark:bg-Dark100 bg-slate-100 w-full flex flex-row px-2 py-4 flex-shrink overflow-x-hidden">
            <div className="flex-grow">
              <input
                placeholder="Aa"
                className="w-full bg-transparent border dark:border-Dark300 outline-none p-2 rounded-lg"
                type="text"
                value={messageText}
                onChange={(event: any) => setMessageText(event.target.value)}
              />
            </div>
            <button
              className="p-2 text-3xl flex flex-row items-center gap-x-2 text-secondary"
              onClick={handleSendMessage}
            >
              <IonIcon icon={paperPlane} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConversationContainer;

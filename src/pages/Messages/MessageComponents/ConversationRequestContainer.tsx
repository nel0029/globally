/** @format */

import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import socket from "../../../sockets/socket";
import Header from "../../../common/Header";
import TitleText from "../../../common/TitleText";
import { IonIcon } from "@ionic/react";
import { arrowBackOutline, paperPlane } from "ionicons/icons";
import MessageBubble from "./MessageBubble";
import CardAvatar from "../../Home/PostComponents/CardAvatar";
import {
  getConversationInfo,
  getAllMessages,
} from "../../../redux/asynActions/messageAsyncActions";
import { AppDispatch } from "../../../redux/store";
import { MessageDataProps } from "../../../redux/messageSlice";
import { useLocation } from "react-router";

const ConversationRequestContainer = () => {
  const { conversationID } = useParams<string>();
  const user = useSelector((state: any) => state.user.userData);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const messageContainerRef = useRef<HTMLDivElement | null>(null);
  const conversationInfo =
    useSelector((state: any) => state.messages.conversationInfo) || {};
  const messages = useSelector((state: any) => state.messages.messages) || [];
  const location = useLocation();

  useEffect(() => {
    const data = {
      conversationID: conversationID,
    };

    dispatch(getConversationInfo(data)).then(() =>
      dispatch(getAllMessages(data))
    );
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const data = {
      conversationID: conversationID,
      memberID: user?.userID,
    };

    socket.emit("joinConversation", data);

    return () => {
      socket.emit("leaveConversation", data);
    };
  }, [location.pathname]);

  const goBack = () => navigate("/messages");

  const scrollToBottom = () => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop =
        messageContainerRef.current.scrollHeight;
    }
  };

  const handleSendMessage = () => {
    // Code for sending a new message
    // ...

    // After sending the message, scroll to the bottom
    scrollToBottom();
  };

  return (
    <div className="h-screen flex flex-col flex-grow ">
      {conversationInfo && (
        <div className="h-screen flex flex-col flex-grow">
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
                    avatarURL={conversationInfo.avatarURL}
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
          <div
            className="flex flex-col flex-[1] p-2 gap-y-2 overflow-y-auto"
            ref={messageContainerRef}
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
          </div>
          <div className="w-full flex flex-row px-2 flex-shrink overflow-x-hidden">
            <div className="flex-grow">
              <input
                placeholder="Aa"
                className="w-full bg-transparent border dark:border-Dark300 outline-none p-2 rounded-lg"
                type="text"
              />
            </div>
            <button
              className="p-2 flex flex-row items-center gap-x-2"
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

export default ConversationRequestContainer;

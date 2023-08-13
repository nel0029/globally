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
  resetConversationInfo,
  resetMessages,
  updateConvo,
} from "../../../redux/messageSlice";
import { useLocation } from "react-router";
import { createNewMessage } from "../../../redux/messageSlice";
import MessageInputContainer from "./MessageInputContainer";

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

  const fullNameArray = [
    conversationInfo?.receiverFirstName,
    conversationInfo?.receiverMiddleName,
    conversationInfo?.receiverLastName,
  ];
  const fullName = fullNameArray?.join(" ");

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
      dispatch(resetConversationInfo());
      dispatch(resetMessages());
    };
  }, [conversationID, location.pathname]);

  useEffect(() => {
    if (messages.length > 0) {
      scrollToBottom();
    }
  }, [messages.length]);

  const goBack = () => {
    navigate("/messages");
    dispatch(resetConversationInfo());
    dispatch(resetMessages());
  };

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
      className={`fixed top-0 bottom-0 left-0 lg:static z-50 max-h-full flex-1 dark:bg-Dark100 bg-slate-100 w-full flex flex-col lg:border-l dark:border-Dark300 `}
    >
      {conversationInfo && (
        <div className="w-full h-full flex flex-col flex-1 ">
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
                  <CardAvatar avatarURL={conversationInfo.avatarURL?.url} />
                  <div className="flex flex-col gap-y-1 justify-center">
                    <div className="flex flex-row gap-x-1 text-[16px] leading-[16px] font-bold">
                      {fullName}
                    </div>
                    <div className="flex flex-row gap-x-1 text-[16px] leading-[16px] text-gray-500">
                      @{conversationInfo.userName}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Header>
          <div className="flex-1 w-full flex flex-col overflow-y-auto">
            <div
              id="message-bubbles-container"
              ref={messageContainerRef}
              className="w-full max-h-full flex flex-col flex-1 p-2 gap-y-2 "
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
          <MessageInputContainer
            onClick={handleSendMessage}
            messageText={messageText}
            setMessageText={setMessageText}
          />
        </div>
      )}
    </div>
  );
};

export default ConversationContainer;

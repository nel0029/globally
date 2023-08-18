/** @format */

import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch } from "../../../redux/store";
import { useNavigate } from "react-router";
import { getConversationList } from "../../../redux/asynActions/messageAsyncActions";
import Header from "../../../common/Header";
import TitleText from "../../../common/TitleText";
import { ConversationListProps } from "../../../redux/messageSlice";
import { IonIcon } from "@ionic/react";
import { createOutline } from "ionicons/icons";
import ConversationCard from "./ConversationCard";
import LoadingConversationCard from "./LoadingConversationCard";

const ConversationListContainer = () => {
  const user = useSelector((state: any) => state.user.userData);
  const conversationList: any[] = useSelector(
    (state: any) => state.messages.conversationList
  );

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  const [sortedConversationList, setSortedConversationList] = useState<
    ConversationListProps[] | null
  >(null);

  useEffect(() => {
    const data = {
      userID: user.userID,
    };

    if (sortedConversationList !== null) {
      setIsLoading(false);
    } else {
      dispatch(getConversationList(data)).then((response: any) => {
        if (response.meta.requestStatus === "fulfilled") {
          setIsLoading(false);
        }
      });
    }
  }, []);

  useEffect(() => {
    if (conversationList !== null) {
      const newConversationList = [...conversationList];
      newConversationList?.sort((a, b) => {
        const timestampA = new Date(a.lastMessageTimestamps);
        const timestampB = new Date(b.lastMessageTimestamps);
        return timestampA.getTime() - timestampB.getTime();
      });
      setSortedConversationList(newConversationList);
    } else {
      setIsLoading(true);
    }
  }, [conversationList?.length]);

  const createNewConvo = () => navigate("/messages/new");

  const openConvo = (conversationID: string) =>
    navigate(`/messages/${conversationID}`);

  return (
    <div className="w-full h-full sticky top-0 overflow-auto flex-grow flex flex-col lg:border-r lg:dark:border-Dark300">
      <Header>
        <TitleText>Conversations</TitleText>
        <div className="flex-1 flex flex-row justify-end items-center">
          <button
            onClick={createNewConvo}
            className="flex justify-center items-center p-1 text-2xl rounded-full hover:bg-slate-200 dark:hover:bg-Dark300 cursor-pointer"
          >
            <IonIcon icon={createOutline} />
          </button>
        </div>
      </Header>

      <div className="flex-1 w-full h-full">
        <div className="w-full h-full flex-[1] flex flex-col-reverse justify-end">
          {isLoading ? (
            <React.Fragment>
              <LoadingConversationCard />
              <LoadingConversationCard />
              <LoadingConversationCard />
              <LoadingConversationCard />
              <LoadingConversationCard />
              <LoadingConversationCard />
            </React.Fragment>
          ) : sortedConversationList && sortedConversationList.length > 0 ? (
            sortedConversationList?.map(
              (conversation: ConversationListProps) => (
                <ConversationCard
                  key={conversation._id}
                  onClick={() => openConvo(conversation._id)}
                  avatarURL={conversation.avatarURL.url}
                  userName={conversation.userName ? conversation.userName : ""}
                  firstName={
                    conversation.receiverFirstName
                      ? conversation.receiverFirstName
                      : ""
                  }
                  middleName={
                    conversation.receiverMiddleName
                      ? conversation.receiverMiddleName
                      : ""
                  }
                  lastName={
                    conversation.receiverLastName
                      ? conversation.receiverLastName
                      : ""
                  }
                  createdAt={conversation.createdAt}
                  lastMessage={conversation.lastMessage}
                  lastMessageTimestamps={conversation.lastMessageTimestamps}
                  isActive={conversation.isActive}
                  unseenMessagesCount={conversation.unseenMessagesCount}
                  verified={conversation.verified}
                />
              )
            )
          ) : (
            <div className="w-full h-full text-center flex justify-center items-center flex-grow">
              No Conversation
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConversationListContainer;

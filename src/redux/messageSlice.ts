/** @format */

import { createSlice } from "@reduxjs/toolkit";
import {
  getContactList,
  getConversationInfo,
  getConversationList,
  getAllMessages,
  getConversationRequestList,
  getConvoInfoByUserID,
  getAllNotifications,
  getUnseenNotifications,
  getUnseenMessagesCount,
} from "./asynActions/messageAsyncActions";
import { UserData } from "./usersSlice";
import { searchUser } from "./asynActions/userAsyncActions";

interface MediaProps {
  id: string;
  url: string;
}

export interface MessageDataProps {
  _id: string;
  senderID: string;
  text: string;
  conversationID: string;
  createdAt: string;
}

interface ContactListProps {
  contactID: string;
  contactUserName: string;
  contactFirstName: string;
  contactMiddleName: string;
  contactLastName: string;
  contactAvatarURL: MediaProps;
}

export interface ConversationMembersProps {
  userID: string;
  userName: string | null;
  avatarURL: MediaProps | null;
  userFirstName: string | null;
  userMiddleName: string | null;
  userLastName: string | null;
}

export interface ConversationListProps {
  _id: string;
  senderID: string;
  receiverID: string;
  type: string;
  lastMessageTimestamps: string;
  lastMessageID: string;
  lastMessage: string;
  isActive: boolean;
  userName: string | null;
  avatarURL: MediaProps;
  receiverFirstName: string | null;
  receiverMiddleName: string | null;
  receiverLastName: string | null;
  createdAt: string;
  unseenMessagesCount: number;
  verified: boolean;
}

export interface ConversationRequestsProps {
  _id: string;
  requesterID: string;
  receiverID: string;
  type: string;
  lastMessageTimestamps: string;
  lastMessageID: string;
  lastMessage: string;
  hasUnseenMessages: boolean;
  userName: string | null;
  requesterAvatarURL: MediaProps;
  requesterFirstName: string | null;
  requesterMiddleName: string | null;
  requesterLastName: string | null;
  createdAt: string;
  conversationID: string;
  isActive: boolean;
}

interface ConversationInfoProps {
  _id: string;
  senderID: string;
  receiverID: string;
  unseenMessagesCount: number;
  type: string;
  createdAt: string;
  lastMessage: string;
  lastMessageID: string;
  lastMessageTimestamps: string;
  userName: string;
  avatarURL: string;
  receiverFirstName: string;
  receiverMiddleName: string;
  receiverLastName: string;
}

export interface NotificationsProps {
  _id: string;
  actionType: string;
  postID: string;
  postType: string;
  actorID: string;
  actionID: string;
  actorUserName: string;
  actorAvatarURL: MediaProps;
  targetID: string;
  createdAt: string;
  verified: boolean;
}

export interface UnseenNotificationsProps {
  targetID: string;
  unseenNotificationsCount: number;
}

interface UnseenMessagesCount {
  unseenMessagesCount: number;
}

interface MessageState {
  messages: MessageDataProps[] | null;
  contactList: ContactListProps[] | null;
  conversationList: ConversationListProps[] | null;
  conversationRequestList: ConversationRequestsProps[] | null;
  conversationInfo: ConversationInfoProps | null;
  responseConvoInfo: ConversationInfoProps | null;
  responseReceiverInfo: UserData | null;
  userList: UserData[] | null;
  notificationList: NotificationsProps[] | null;
  unseenNotification: UnseenNotificationsProps | null;
  unseenMessagesCount: UnseenMessagesCount | null;
}

const initialState: MessageState = {
  contactList: null,
  messages: null,
  conversationInfo: null,
  conversationList: null,
  conversationRequestList: null,
  responseConvoInfo: null,
  responseReceiverInfo: null,
  userList: null,
  notificationList: null,
  unseenNotification: null,
  unseenMessagesCount: null,
};

const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    deleteConvoInfo: (state) => {
      state.responseConvoInfo = null;
    },
    deleteReceiverInfo: (state) => {
      state.responseReceiverInfo = null;
    },
    deleteUserList: (state) => {
      state.userList = null;
    },
    createNewConvo: (state, action) => {
      const newConvo = action.payload;
      if (state.conversationList === null) {
        state.conversationList = [newConvo];
      } else {
        state.conversationList = [...state.conversationList, newConvo];
      }
    },

    updateConvo: (state, action) => {
      const updatedConvo = action.payload;

      if (state.conversationList !== null) {
        const convoIndex = state.conversationList.findIndex(
          (convo: ConversationListProps) => convo._id === updatedConvo._id
        );

        if (convoIndex !== -1) {
          state.conversationList[convoIndex] = updatedConvo;

          state.conversationList = state.conversationList.sort(
            (a: any, b: any) =>
              a.lastMessageTimestamps - b.lastMessageTimestamps
          );
        }
      }
    },
    createNewMessage: (state, action) => {
      const newMessage = action.payload;
      if (state.messages !== null) {
        if (state.conversationInfo !== null) {
          if (newMessage.conversationID === state.conversationInfo._id) {
            state.messages = [...state.messages, newMessage];
          }
        }
      }
    },
    addNewNotifcation: (state, action) => {
      const { notification, unseenNotification } = action.payload;

      return {
        ...state,
        notificationList: state.notificationList
          ? [...state.notificationList, notification]
          : [notification],
        unseenNotification: unseenNotification,
      };
    },

    removeNotifcation: (state, action) => {
      const updatedNotifcation = action.payload;
      console.log(updatedNotifcation);

      if (state.notificationList !== null) {
        state.notificationList = state.notificationList.filter(
          (notif: NotificationsProps) =>
            notif._id !== updatedNotifcation.notification._id
        );
      }

      state.unseenNotification = updatedNotifcation.unseenNotification;
    },

    resetNotificationsCount: (state) => {
      if (state.unseenNotification) {
        state.unseenNotification = {
          ...state.unseenNotification,
          unseenNotificationsCount: 0,
        };
      }
    },
    updateUnseenMessagesCount: (state, action) => {
      const response = action.payload;

      state.unseenMessagesCount = response;
    },
    resetMessages: (state) => {
      state.messages = [];
    },

    resetConversationInfo: (state) => {
      state.conversationInfo = null;
    },
    resetConversationList: (state) => {
      state.conversationList = null;
    },
    resetNotificationList: (state) => {
      state.notificationList = null;
    },
    resetMessageState: (state) => {
      state = initialState;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getContactList.fulfilled, (state, action) => {
        const newContactList = action.payload;

        state.contactList = newContactList;
      })
      .addCase(getConversationList.fulfilled, (state, action) => {
        const conversationList = action.payload;

        state.conversationList = conversationList;
      })
      .addCase(getUnseenMessagesCount.fulfilled, (state, action) => {
        const response = action.payload;
        state.unseenMessagesCount = response;
      })
      .addCase(getConversationInfo.fulfilled, (state, action) => {
        state.conversationInfo = action.payload;
      })
      .addCase(getAllMessages.fulfilled, (state, action) => {
        state.messages = action.payload;
      })
      .addCase(getConversationRequestList.fulfilled, (state, action) => {
        const conversationRequestList = action.payload;

        state.conversationRequestList = conversationRequestList;
      })
      .addCase(searchUser.fulfilled, (state, action) => {
        state.userList = action.payload;
      })
      .addCase(getConvoInfoByUserID.fulfilled, (state, action) => {
        const response = action.payload;

        state.responseConvoInfo = response.conversationInfo;
        state.responseReceiverInfo = response.receiverInfo;
      })
      .addCase(getAllNotifications.fulfilled, (state, action) => {
        const notifications = action.payload;

        state.notificationList = notifications;
      })
      .addCase(getUnseenNotifications.fulfilled, (state, action) => {
        const notifications = action.payload;

        state.unseenNotification = notifications;
      });
  },
});

export const {
  deleteConvoInfo,
  deleteUserList,
  deleteReceiverInfo,
  createNewConvo,
  createNewMessage,
  updateConvo,
  addNewNotifcation,
  removeNotifcation,
  resetNotificationsCount,
  updateUnseenMessagesCount,
  resetMessages,
  resetConversationInfo,
  resetConversationList,
  resetNotificationList,
  resetMessageState,
} = messageSlice.actions;
export default messageSlice.reducer;

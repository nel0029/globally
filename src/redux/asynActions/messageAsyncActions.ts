/** @format */

import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getContactList = createAsyncThunk(
  "messageSlice/getContactList",
  async (userID: string) => {
    try {
      const response = await axios.get(`/messages/contacts?userID=${userID}`);

      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getConversationList = createAsyncThunk(
  "messageSlice/getConversationList",
  async (data: any) => {
    try {
      const { userID } = data;
      const response = await axios.get(
        `/messages/conversations?userID=${userID}`
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getConversationInfo = createAsyncThunk(
  "messageSlice/getConversationInfo",
  async (data: any) => {
    try {
      const { conversationID, userID } = data;
      const response = await axios.get(
        `/messages/conversations/${conversationID}?userID=${userID}`
      );

      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getAllMessages = createAsyncThunk(
  "messageSlice/getAllMessages",
  async (data: any) => {
    try {
      const { conversationID } = data;
      const response = await axios.get(
        `/messages/conversations/${conversationID}/messages`
      );

      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getConversationRequestList = createAsyncThunk(
  "messageSlice/getConversationRequestList",
  async (data: any) => {
    try {
      const { userID } = data;
      const response = await axios.get(
        `/messages/conversations/requests?userID=${userID}`
      );

      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getConversationRequestInfo = createAsyncThunk(
  "messageSlice/getConversationRequestInfo",
  async (data: any) => {
    try {
      const { conversationID } = data;
      const response = await axios.get(
        `/messages/conversations/requests/${conversationID}`
      );

      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getConvoInfoByUserID = createAsyncThunk(
  "messageSlice/getConvoInfoVyUserID",
  async (data: any) => {
    try {
      const { senderID, receiverID } = data;
      const response = await axios.get(
        `/messages/conversations/search?senderID=${senderID}&receiverID=${receiverID}`
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getAllNotifications = createAsyncThunk(
  "messageSlice/getAllNotifications",
  async (data: any) => {
    try {
      const { userID, markAllAsRead } = data;
      const response = await axios.get(
        `/notifications?userID=${userID}&markAllAsRead=${markAllAsRead}`
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getUnseenNotifications = createAsyncThunk(
  "messageSlice/getUnseenNotifications",
  async (data: any) => {
    try {
      const { userID } = data;
      const response = await axios.get(`/notifications/${userID}`);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getUnseenMessagesCount = createAsyncThunk(
  "messageSlice/getUnseenMessagesCount",
  async (data: any) => {
    try {
      const { userID } = data;
      const response = await axios.get(`/messages/unseen/${userID}`);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const updateNotification = createAsyncThunk(
  "updateNotification",
  async (data: any) => {
    try {
      const response = await axios.put("/notifications/update", data);
      console.log("Data:", response.data);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

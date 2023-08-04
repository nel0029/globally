/** @format */

import { createSlice } from "@reduxjs/toolkit";
import {
  getAccountData,
  logIn,
  registerUser,
  searchUser,
  updateProfilePicture,
  updateUserAccount,
  verifyUserName,
  isServerActive,
} from "./asynActions/userAsyncActions";
import { UserProps } from "../pages/Profile/ProfileComponents/UserCard";

export interface UserData {
  token: string | null;
  userID: string | null;
  userName: string | null;
  avatarURL: string | null;
  userFirstName: string | null;
  userMiddleName: string | null;
  userLastName: string | null;
}

export interface AccountData {
  userID: string | null;
  userName: string | null;
  avatarURL: string | null;
  userFirstName: string | null;
  userMiddleName: string | null;
  userLastName: string | null;
  email: string | null;
  coverPhotoURL: string | null;
  bio: string | null;
}

interface UserState {
  userData: UserData;
  authStatus: string;
  authMessage: string;
  registerMessage: string;
  valid: boolean | null;
  userFollower: UserProps[] | null;
  userFollowing: UserProps[] | null;
  accountData: AccountData | null;
  isServerActive: any | null;
}

const initialState: UserState = {
  userData: {
    token: localStorage.getItem("token") || null,
    userID: localStorage.getItem("userID") || null,
    userName: localStorage.getItem("userName") || null,
    avatarURL: localStorage.getItem("avatarURL") || null,
    userFirstName: localStorage.getItem("userFirstName") || null,
    userMiddleName: localStorage.getItem("userMiddleName") || null,
    userLastName: localStorage.getItem("userLastName") || null,
  },
  authStatus: "",
  authMessage: "",
  valid: null,
  userFollower: null,
  userFollowing: null,
  accountData: null,
  registerMessage: "",
  isServerActive: false,
};

const usersSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetAuthMessage: (state) => {
      state.authMessage = "";
    },
    logOut: () => {
      localStorage.removeItem("token");
      localStorage.removeItem("userID");
      localStorage.removeItem("userName");
      localStorage.removeItem("avatarURL");
      localStorage.removeItem("userFirstName");
      localStorage.removeItem("userMiddleName");
      localStorage.removeItem("userLastName");
      localStorage.removeItem("coverPhotoURL");
    },
    resetRegisterMessage: (state) => {
      state.registerMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(logIn.pending, (state) => {
        state.authStatus = "Loading";
      })
      .addCase(logIn.fulfilled, (state, action) => {
        state.authStatus = "Success";
        const authData = action.payload;
        localStorage.setItem("token", authData.token);
        localStorage.setItem("userID", authData.userID);
        localStorage.setItem("userName", authData.userName);
        localStorage.setItem("avatarURL", authData.avatarURL.url);
        localStorage.setItem("coverPhotoURL", authData.coverPhotoURL);
        localStorage.setItem("userFirstName", authData.userFirstName);
        localStorage.setItem("userMiddleName", authData.userMiddleName);
        localStorage.setItem("userLastName", authData.userLastName);
      })
      .addCase(logIn.rejected, (state, action) => {
        state.authStatus = "Error";
        const response = "Invalid Email, Username and Password";

        if (response) {
          state.authMessage = response;
        }
      })
      .addCase(verifyUserName.pending, (state) => {
        state.authStatus = "Loading";
        state.valid = null;
      })
      .addCase(verifyUserName.fulfilled, (state, action) => {
        state.authStatus = "Success";
        const response = action.payload;
        state.authMessage = response.message;
        state.valid = response.valid;
        console.log(response.valid);
      })
      .addCase(verifyUserName.rejected, (state, action) => {
        state.authStatus = "Error";
      })
      .addCase(registerUser.pending, (state) => {
        state.authStatus = "Loading";
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.authStatus = "Success";
      })
      .addCase(registerUser.rejected, (state) => {
        state.authStatus = "Error";
        state.registerMessage = "Please fill all the necessary field";
      })
      .addCase(getAccountData.fulfilled, (state, action) => {
        const response = action.payload;
        state.accountData = response;
      })
      .addCase(updateProfilePicture.fulfilled, (state, action) => {
        const response = action.payload;

        if (state.userData) {
          state.userData.avatarURL = response.avatarURL;
          localStorage.setItem("avatarURL", response.avatarURL);
        }

        if (state.accountData) {
          state.accountData.avatarURL = response.avatarURL;
        }
      })
      .addCase(updateUserAccount.fulfilled, (state, action) => {
        const response = action.payload;
        console.log(response);
        localStorage.setItem("userName", response.userName);
        localStorage.setItem("avatarURL", response.avatarURL);
        localStorage.setItem("coverPhotoURL", response.coverPhotoURL);
        localStorage.setItem("userFirstName", response.userFirstName);
        localStorage.setItem("userMiddleName", response.userMiddleName);
        localStorage.setItem("userLastName", response.userLastName);

        state.accountData = response;
        state.authMessage = "";
      })
      .addCase(updateUserAccount.rejected, (state, action) => {
        state.authMessage = "Incorrect Password";
      })
      .addCase(isServerActive.fulfilled, (state, action) => {
        const response = action.payload;
        state.isServerActive = response.message;
      });
  },
});
export const { logOut, resetAuthMessage, resetRegisterMessage } =
  usersSlice.actions;
export default usersSlice.reducer;

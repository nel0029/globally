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
  logout,
} from "./asynActions/userAsyncActions";
import { UserProps } from "../pages/Profile/ProfileComponents/UserCard";

export interface UserData {
  userID: string | null;
  userName: string | null;
  avatarURL: string | null;
  userFirstName: string | null;
  userMiddleName: string | null;
  userLastName: string | null;

  coverPhotoURL: string | null;
  bio: string | null;
  verified: boolean;
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
  verified: boolean;
}

interface UserState {
  userData: UserData | null;
  authStatus: string;
  authMessage: string;
  registerMessage: string;
  valid: boolean | null;
  userFollower: UserProps[] | null;
  userFollowing: UserProps[] | null;
  accountData: AccountData | null;
  isServerActive: any | null;
  isLogIn: boolean;
}

const initialState: UserState = {
  userData: {
    userID: localStorage.getItem("userID") || null,
    userName: localStorage.getItem("userName") || null,
    avatarURL: localStorage.getItem("avatarURL") || null,
    userFirstName: localStorage.getItem("userFirstName") || null,
    userMiddleName: localStorage.getItem("userMiddleName") || null,
    userLastName: localStorage.getItem("userLastName") || null,
    coverPhotoURL: localStorage.getItem("coverPhotoURL") || null,
    bio: localStorage.getItem("bio") || null,
    verified: localStorage.getItem("verified") === "true",
  },
  authStatus: "",
  authMessage: "",
  valid: null,
  userFollower: null,
  userFollowing: null,
  accountData: null,
  registerMessage: "",
  isServerActive: false,
  isLogIn: false,
};

const usersSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetAuthMessage: (state) => {
      state.authMessage = "";
      state.valid = null;
    },
    logOut: (state) => {
      state.userData = null;
      state.accountData = null;
      state.authMessage = "";
      state.authStatus = "";
      state.registerMessage = "";
      state.userFollower = null;
      state.userFollowing = null;
    },
    resetRegisterMessage: (state) => {
      state.registerMessage = "";
    },
    resetAccountData: (state) => {
      state.accountData = null;
    },
    resetUserState: (state) => {
      state = initialState;
    },
    resetValid: (state) => {
      state.valid = null;
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

        if (authData.isLogIn === true) {
          localStorage.setItem("isLogIn", "true");
          state.isLogIn = true;
        }

        localStorage.setItem("userID", authData.userID);
        localStorage.setItem("userName", authData.userName);
        localStorage.setItem("userFirstName", authData.userFirstName);
        localStorage.setItem("userMiddleName", authData.userMiddleName);
        localStorage.setItem("userLastName", authData.userLastName);
        localStorage.setItem("avatarURL", authData.avatarURL);
        localStorage.setItem("coverPhotoURL", authData.coverPhotoURL);
        localStorage.setItem("bio", authData.bio);
        localStorage.setItem("verified", authData.verified);

        state.userData = {
          userID: localStorage.getItem("userID"),
          userName: localStorage.getItem("userName"),
          avatarURL: localStorage.getItem("avatarURL"),
          userFirstName: localStorage.getItem("userFirstName"),
          userMiddleName: localStorage.getItem("userMiddleName"),
          userLastName: localStorage.getItem("userLastName"),
          coverPhotoURL: localStorage.getItem("coverPhotoURL"),
          bio: localStorage.getItem("bio"),
          verified: localStorage.getItem("verified") === "true",
        };
      })
      .addCase(logIn.rejected, (state, action) => {
        state.authStatus = "Error";
        const serverResponse = action.payload;

        const response = "Invalid Email, Username and Password";

        if (serverResponse) {
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
        response.userName &&
          localStorage.setItem("userName", response.userName);
        response.userFirstName &&
          localStorage.setItem("userFirstName", response.userFirstName);
        response.userMiddleName &&
          localStorage.setItem("userMiddleName", response.userMiddleName);
        response.userLastName &&
          localStorage.setItem("userLastName", response.userLastName);
        response.avatarURL &&
          localStorage.setItem("avatarURL", response.avatarURL.url);
        response.coverPhotoURL &&
          localStorage.setItem("coverPhotoURL", response.coverPhotoURL.url);
        response.bio && localStorage.setItem("bio", response.bio);
        response.verified &&
          localStorage.setItem("verified", response.verified);

        state.accountData = response;
        state.authMessage = "";
      })
      .addCase(updateUserAccount.rejected, (state, action) => {
        const response: any = action.payload;
        if (response) {
          state.authMessage = response.data;
        }
      })
      .addCase(isServerActive.fulfilled, (state, action) => {
        const response = action.payload;
        state.isServerActive = response.message;
      })
      .addCase(logout.fulfilled, (state, action) => {
        const response = action.payload;

        if (response.isLogIn === false) {
          localStorage.clear();
        }
      });
  },
});
export const {
  logOut,
  resetAuthMessage,
  resetRegisterMessage,
  resetAccountData,
  resetUserState,
  resetValid,
} = usersSlice.actions;
export default usersSlice.reducer;

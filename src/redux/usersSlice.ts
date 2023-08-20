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
    avatarURL: null,
    userFirstName: null,
    userMiddleName: null,
    userLastName: null,
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
      localStorage.clear();
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
  },
  extraReducers: (builder) => {
    builder
      .addCase(logIn.pending, (state) => {
        state.authStatus = "Loading";
      })
      .addCase(logIn.fulfilled, (state, action) => {
        state.authStatus = "Success";
        const authData = action.payload;
        if (authData.userID) {
          state.isLogIn = true;
          localStorage.setItem("isLogIn", "true");
        }
        localStorage.setItem("userID", authData.userID);
        localStorage.setItem("userName", authData.userName);
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
        localStorage.setItem("userName", response.userName);
        localStorage.setItem("avatarURL", response.avatarURL.url);

        state.accountData = response;
        state.authMessage = "";
      })
      .addCase(updateUserAccount.rejected, (state, action) => {
        state.authMessage = "Incorrect Password";
      })
      .addCase(isServerActive.fulfilled, (state, action) => {
        const response = action.payload;
        state.isServerActive = response.message;
      })
      .addCase(logout.fulfilled, (state, action) => {
        const isLogOut = action.payload;
        if (isLogOut === true) {
          state.isLogIn = false;
        }
      });
  },
});
export const {
  logOut,
  resetAuthMessage,
  resetRegisterMessage,
  resetAccountData,
} = usersSlice.actions;
export default usersSlice.reducer;

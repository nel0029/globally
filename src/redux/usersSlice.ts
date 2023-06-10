import { createSlice } from '@reduxjs/toolkit'
import { logIn, registerUser, verifyUserName } from './asynActions/userAsyncActions'


interface UserData {
    token: string | null;
    userID: string | null;
    userName: string | null;
    avatarURL: string | null;
    userFirstName: string | null;
    userMiddleName: string | null;
    userLastName: string | null;
}

interface UserState {
    userData: UserData;
    authStatus: string;
    authMessage: string;
    valid: boolean | null
}

const initialState: UserState = {
    userData: {
        token: localStorage.getItem('token') || null,
        userID: localStorage.getItem('userID') || null,
        userName: localStorage.getItem('userName') || null,
        avatarURL: localStorage.getItem('avatarURL') || null,
        userFirstName: localStorage.getItem('userFirstName') || null,
        userMiddleName: localStorage.getItem('userMiddleName') || null,
        userLastName: localStorage.getItem('userLastName') || null,
    },
    authStatus: '',
    authMessage: '',
    valid: null,
};

const usersSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(logIn.pending, (state) => {
                state.authStatus = "Loading"
            })
            .addCase(logIn.fulfilled, (state, action) => {
                state.authStatus = "Success"
                const authData = action.payload
                localStorage.setItem('token', authData.token)
                localStorage.setItem('userID', authData.userID)
                localStorage.setItem('userName', authData.userName)
                localStorage.setItem('avatarURL', authData.avatarURL)
                localStorage.setItem('userFirstName', authData.userFirstName)
                localStorage.setItem('userMiddleName', authData.userMiddleName)
                localStorage.setItem('userLastName', authData.userLastName)
                console.log(authData)

            })
            .addCase(logIn.rejected, (state) => {
                state.authStatus = "Error"
            })
            .addCase(verifyUserName.pending, (state) => {
                state.authStatus = "Loading"
                state.valid = null
            })
            .addCase(verifyUserName.fulfilled, (state, action) => {
                state.authStatus = "Success"
                const response = action.payload
                state.authMessage = response.message
                state.valid = response.valid
                console.log(response.valid)
            })
            .addCase(verifyUserName.rejected, (state, action) => {
                state.authStatus = "Error"
            })
            .addCase(registerUser.pending, (state) => {
                state.authStatus = "Loading"
            })
            .addCase(registerUser.fulfilled, (state) => {
                state.authStatus = "Success"
            })
            .addCase(registerUser.rejected, (state) => {
                state.authStatus = "Error"
            })
    }
})

export default usersSlice.reducer
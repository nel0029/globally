import { createAsyncThunk, PayloadAction, AsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'



export const verifyUserName = createAsyncThunk('userSlice/verifyUserName', async (userName: string) => {
    try {
        const response = await axios.get(`/auth/verify/username/?userName=${userName}`)
        console.log("Request has been made")
        return response.data
    } catch (error: any) {
        console.log(error)
        const response = error.response
        if (response && response.status === 409) {

            return response.data
        } else {
            throw error;
        }
    }
})

export const logIn = createAsyncThunk('userSlice/logIn', async (userData: LogInUserData) => {
    try {
        console.log(userData)
        const response = await axios.post('/auth/login', userData)

        console.log(response.data)
        return response.data
    } catch (error) {
        console.log(error)
    }
})

export const registerUser = createAsyncThunk('userSlice/registerUser', async (registerUserData: RegisterUserData) => {
    try {
        const response = await axios.post('/auth/register', registerUserData)
        return response.data
    } catch (error) {
        console.log(error)
    }
})
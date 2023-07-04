import { createAsyncThunk, } from '@reduxjs/toolkit'
import axios from 'axios'
import { LogInUserData, RegisterUserData } from '../../types/AuthUserTypes'


export const verifyUserName = createAsyncThunk('userSlice/verifyUserName', async (userName: string) => {
    try {
        const response = await axios.get(`/auth/verify/username/?userName=${userName}`)

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

export const logIn = createAsyncThunk(
    'userSlice/logIn',
    async (userData: LogInUserData, { rejectWithValue }) => {
        try {
            const response = await axios.post('/auth/login', userData);

            return response.data;
        } catch (error: any) {
            console.log(error);

            // Check if the error response has a specific status code indicating invalid credentials
            if (error.response && error.response.status === 400) {
                // Handle the scenario where the user does not exist or the password does not match

                return rejectWithValue(error.response.data.message);
            } else {
                // Handle other error scenarios
                throw error;
            }
        }
    }
);


export const registerUser = createAsyncThunk('userSlice/registerUser', async (registerUserData: RegisterUserData, { rejectWithValue }) => {
    try {
        const response = await axios.post('/auth/register', registerUserData)
        return response.data
    } catch (error: any) {

        console.log(error)
        // Check if the error response has a specific status code indicating invalid credentials
        if (error.response && error.response.status === 400) {
            // Handle the scenario where the user does not exist or the password does not match

            return rejectWithValue(error.response.data.message);
        } else {
            // Handle other error scenarios
            throw error;
        }
    }
})

export const searchUser = createAsyncThunk('userSlice/searchUser', async (data: any) => {
    try {
        const { userName } = data
        const response = await axios.get(`/users/search?userName=${userName}`)
        return response.data
    } catch (error) {
        console.log(error)
    }
})

export const getAccountData = createAsyncThunk('userSlice/getAccountData', async (data: any) => {
    try {
        const { userID } = data
        const response = await axios.get(`/users/account/data/${userID}`)

        return response.data
    } catch (error) {
        console.log(error)
    }
})

export const updateProfilePicture = createAsyncThunk('userSlice/updateProfilePicture', async (data: any) => {
    try {
        const response = await axios.put(`/users/profile/pictures/update`, data)
        return response.data
    } catch (error) {
        console.log(error)
    }
})

export const updateUserAccount = createAsyncThunk('userSlice/updateUserAccount', async (data: any, { rejectWithValue }) => {
    try {
        const headers = {
            'Content-Type': 'multipart/form-data', // Set the correct content type for file uploads
            ...axios.defaults.headers.common // Merge with default headers
        };
        const response = await axios.put('/users/account/update', data, { headers })

        return response.data
    } catch (error: any) {
        if (error.response && error.response.status === 400) {
            // Handle the scenario where the user does not exist or the password does not match

            return rejectWithValue(error.response.data.message);
        } else {
            // Handle other error scenarios
            throw error;
        }
    }
})
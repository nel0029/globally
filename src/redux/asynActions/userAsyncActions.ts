import { createAsyncThunk, PayloadAction, AsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'



export const verifyUserName = createAsyncThunk('userSlice/verifyUserName', async (userName: string) => {
    try {
        const response = await axios.get(`/register/?userName=${userName}`)
        localStorage.setItem('token', response.data.token)
        return response.data
    } catch (error) {
        console.log(error)
    }
})

export const logIn = createAsyncThunk('userSlice/logIn', async (userData: any) => {
    try {
        const response = await axios.post('/login', userData)
        return response.data
    } catch (error) {

    }
})
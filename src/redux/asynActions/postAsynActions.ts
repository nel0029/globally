import { createAsyncThunk, PayloadAction, AsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { NewPost, Like, Unlike, LikeData, DeletePost, DeletePostData, UpdatePost } from '../../types/PostActionTypes';




export const getPosts = createAsyncThunk('postSlice/getPost', async (userID: string) => {
    try {
        const response = await axios.get(`/?userID=${userID}`);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
});


export const like = createAsyncThunk('postSlice/like', async (likeData: Like) => {

    try {
        const response = await axios.post('/', likeData)
        return response.data
    } catch (error) {
        console.log(error)
    }
})



export const unlike = createAsyncThunk<Unlike, LikeData>('postSlice/unlike', async (likeData) => {
    try {
        const { userID, likeID, actionType, parentType } = likeData
        const response = await axios.delete(`/?likeID=${likeID}&userID=${userID}`, {
            data: { actionType, parentType }
        })
        return response.data
    } catch (error) {
        console.log(error)
    }
})

export const createPost = createAsyncThunk('postSlice/createPost', async (postData: NewPost) => {
    try {
        const response = await axios.post('/', postData)
        return response.data
    } catch (error) {
        console.log(error)
    }
})

export const deletePost = createAsyncThunk<DeletePost, DeletePostData>('postSlice/deletePost', async (postData) => {
    try {
        const { userID, postID, actionType } = postData
        const response = await axios.delete(`/?postID=${postID}&userID=${userID}`, {

            data: { actionType }
        })
        return response.data
    } catch (error) {
        console.log(error)
    }
})


export const updatePost = createAsyncThunk('postSlice/updatePost', async (postData: UpdatePost) => {
    try {
        const reponse = await axios.put('/', postData)
        return reponse.data
    } catch (error) {
        console.log(error)
    }
})
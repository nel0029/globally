import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import {
    NewRepost,
    NewPost,
    Like,
    Unlike,
    LikeData,
    DeletePost,
    DeletePostData,
    UpdatePostData,
    UpdatedPost,
    NewReply,
    UpdateReply,
    DeleteReply,
    DeleteReplyData,
    UpdateRepost,
    DeleteRepost,
    DeleteRepostData,
    PostDetailsData,
    RepliesByPostIDData,
    ReplyDetailsData,
    RepostDetailsData,
    GetUserDetailsData,
    GetAllUserLikes,
    FollowData,
    Follow,
    Unfollow,
    UnfollowData,
    GetUserFollowingData,
    GetUserFollowerData,
    PollResponse
} from '../../types/PostActionTypes';



export const getPosts = createAsyncThunk('postSlice/getPost', async (authorID: string) => {
    try {
        const response = await axios.get(`/all/posts/?authorID=${authorID}`);

        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
});

export const getAllPostsByUser = createAsyncThunk('postSlice/getAllPostsByUser', async (data: any) => {
    try {
        const { userName, authorID } = data
        const response = await axios.get(`/${userName}/posts?authorID=${authorID}`);
        return response.data
    } catch (error) {
        console.log(error)
    }
})

export const getAllRepliesByUser = createAsyncThunk('postSlice/getAllRepliesByUser', async (data: any) => {
    try {
        const { userName, authorID } = data
        const response = await axios.get(`/${userName}/replies?authorID=${authorID}`);
        return response.data
    } catch (error) {
        console.log(error)
    }
})


export const getAllRepostsByUser = createAsyncThunk('postSlice/getAllRepostsByUser', async (data: any) => {
    try {
        const { userName, authorID } = data
        const response = await axios.get(`/${userName}/reposts?authorID=${authorID}`);
        return response.data
    } catch (error) {
        console.log(error)
    }
})

export const getAllLikesByUser = createAsyncThunk('/postSlice/getAllLikesByUser', async (data: GetAllUserLikes) => {
    try {
        const { userName, userID } = data
        const response = await axios.get(`/${userName}/likes?userID=${userID}`)
        console.log(response.data)
        return response.data
    } catch (error) {
        console.log(error)
    }

})

export const getUserDetails = createAsyncThunk('postSlice/getUserDetails', async (data: GetUserDetailsData) => {
    try {
        const { userName, authorID } = data
        const response = await axios.get(`/users/${userName}?authorID=${authorID}`)

        return response.data
    } catch (error) {
        console.log(error)
    }
})

export const getPostDetails = createAsyncThunk('postSlice/getPostDetails', async (postData: PostDetailsData) => {
    try {
        const { userName, postID, authorID } = postData
        const response = await axios.get(`/${userName}/posts/${postID}?authorID=${authorID}`)

        return response.data
    } catch (error) {
        console.log(error)
    }
})

export const getAllRepliesByPostID = createAsyncThunk('postSlice/getAllRepliesByPostID', async (data: RepliesByPostIDData) => {
    try {
        const { userName, postID, authorID, postType } = data
        const response = await axios.get(`/${userName}/posts/${postID}/replies?authorID=${authorID}&postType=${postType}`)
        return response.data
    } catch (error) {
        console.log(error)
    }
})

export const getReplyDetails = createAsyncThunk('postSlice/getReplyDetails', async (data: ReplyDetailsData) => {
    try {
        const { userName, postID, authorID } = data
        const response = await axios.get(`/${userName}/replies/${postID}?authorID=${authorID}`)

        return response.data
    } catch (error) {
        console.log(error)
    }
})

export const getRepostDetails = createAsyncThunk('postSlice/getRepostDetails', async (data: RepostDetailsData) => {
    try {
        const { userName, postID, authorID } = data
        const response = await axios.get(`/${userName}/reposts/${postID}?authorID=${authorID}`)
        return response.data
    } catch (error) {
        console.log(error)
    }
})

export const createPost = createAsyncThunk('postSlice/createPost', async (formData: NewPost) => {
    try {
        const headers = {
            'Content-Type': 'multipart/form-data',
            ...axios.defaults.headers.common
        };
        console.log(formData)

        const response = await axios.post('/new/post', formData, { headers: headers });

        return response.data;
    } catch (error) {
        console.log(error);
    }
});


export const updatePost = createAsyncThunk<UpdatedPost, UpdatePostData>('postSlice/updatePost', async (postData) => {
    try {
        const reponse = await axios.put('/update/post', postData)
        return reponse.data
    } catch (error) {
        console.log(error)
    }
})


export const deletePost = createAsyncThunk<DeletePost, DeletePostData>('postSlice/deletePost', async (postData) => {
    try {
        const { authorID, postID } = postData
        const response = await axios.delete(`/delete/post/?postID=${postID}&authorID=${authorID}`, {

        })
        return response.data
    } catch (error) {
        console.log(error)
    }
})


export const createReply = createAsyncThunk('postSlice/createReply', async (replyData: NewReply) => {
    try {
        const headers = {
            'Content-Type': 'multipart/form-data', // Set the correct content type for file uploads
            ...axios.defaults.headers.common // Merge with default headers
        };

        const response = await axios.post('/new/reply', replyData, { headers })
        console.log(response.data)
        return response.data
    } catch (error) {
        console.log(error)
    }
})

export const updateReply = createAsyncThunk('postSlice/updateReply', async (replyData: UpdateReply) => {
    try {
        const reponse = await axios.put('/update/reply', replyData)
        return reponse.data
    } catch (error) {
        console.log(error)
    }
})


export const deleteReply = createAsyncThunk<DeleteReply, DeleteReplyData>('postSlice/deleteReply', async (replyData) => {
    try {

        const { authorID, postID } = replyData
        const response = await axios.delete(`/delete/reply/?postID=${postID}&authorID=${authorID}`, {

        })
        return response.data
    } catch (error) {
        console.log(error)
    }
})


export const createRepost = createAsyncThunk('postSlice/createRepost', async (repostData: NewRepost) => {
    try {
        const response = await axios.post('/new/repost', repostData)

        return response.data
    } catch (error) {
        console.log(error)
    }
})


export const updateRepost = createAsyncThunk('postSlice/updateRepost', async (repostData: UpdateRepost) => {
    try {
        const reponse = await axios.put('/update/repost', repostData)
        return reponse.data
    } catch (error) {
        console.log(error)
    }
})


export const deleteRepost = createAsyncThunk<DeleteRepost, DeleteRepostData>('postSlice/deleteRepost', async (repostData) => {
    try {

        const { authorID, postID } = repostData
        const response = await axios.delete(`/delete/repost/?postID=${postID}&authorID=${authorID}`, {

        })
        return response.data
    } catch (error) {
        console.log(error)
    }
})


export const like = createAsyncThunk('postSlice/like', async (likeData: Like) => {

    try {
        const response = await axios.post('/new/like', likeData,)
        return response.data
    } catch (error) {
        console.log(error)
    }
})


export const createNewPollResponse = createAsyncThunk('postSlice/createNewPollResponse', async (pollResponseData: PollResponse) => {
    try {
        const response = await axios.post('/new/poll/response', pollResponseData)
        console.log(pollResponseData)
        console.log(response.data)
        return response.data
    } catch (error) {
        console.log(error)
    }
})


export const unlike = createAsyncThunk<Unlike, LikeData>('postSlice/unlike', async (likeData) => {
    try {
        const { authorID, likeID } = likeData
        const response = await axios.delete(`/delete/like/?likeID=${likeID}&authorID=${authorID}`, {
        })
        return response.data
    } catch (error) {
        console.log(error)
    }
})

export const follow = createAsyncThunk<Follow, FollowData>('postSlice/follow', async (followData) => {
    try {
        const response = await axios.post('/users/follow', followData)
        console.log(followData)
        return response.data
    } catch (error) {
        console.log(error)
    }

})

export const unfollow = createAsyncThunk<Unfollow, UnfollowData>('postSlice/unfollow', async (unfollowData) => {
    try {
        const { userID, followID } = unfollowData
        const response = await axios.delete(`/users/unfollow/?followID=${followID}&userID=${userID}`)
        console.log(unfollowData)
        return response.data
    } catch (error) {
        console.log(error)
    }
})

export const getUserFollowing = createAsyncThunk('postSlice/getUserFollowing', async (userData: GetUserFollowingData) => {
    try {
        const { userName, userID } = userData
        const response = await axios.get(`/users/${userName}/following?userID=${userID}`)

        return response.data
    } catch (error) {
        console.log(error)
    }
})

export const getUserFollowers = createAsyncThunk('postSlice/getUserFollower', async (userData: GetUserFollowerData) => {
    try {
        const { userName, userID } = userData
        const response = await axios.get(`/users/${userName}/followers?userID=${userID}`)

        return response.data
    } catch (error) {
        console.log(error)
    }
})


import { createSlice } from '@reduxjs/toolkit'
import { getPosts, createPost, like, unlike, deletePost, updatePost } from './asynActions/postAsynActions'

interface User {
    userFirstName: string,
    userMiddleName: string,
    userLastName: string,
    userName: string,
    avatarUrl: string,
    userID: string,
}

const userData: User = {
    userID: "646082c822e5ec1edec0f0ad",
    userFirstName: "Jaynel",
    userMiddleName: "",
    userLastName: "Lucañas",
    userName: "jaynel_30",
    avatarUrl: "https://images.markonart.com/wp-content/uploads/2023/03/among-the-stars-ginger-cat-art-print-300x300.jpg.webp",

}




interface MainState {
    PostData: any[] | null;
    userData: any,
    status: string;
}

const initialState: MainState = {
    PostData: null,
    userData: userData,
    status: ""
}

const postSlice = createSlice({
    name: "post",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getPosts.pending, (state) => {
                state.status = "Loading"
            })
            .addCase(getPosts.fulfilled, (state, action) => {
                state.status = "Successful"
                state.PostData = action.payload
            })
            .addCase(getPosts.rejected, (state) => {
                state.status = "Error"
            })
            .addCase(createPost.pending, (state) => {
                state.status = "Loading"
            })
            .addCase(createPost.fulfilled, (state, action) => {
                state.status = 'Successful';
                const newPost = action.payload;
                if (state.PostData !== null) {
                    state.PostData = [newPost, ...state.PostData];
                } else {
                    state.PostData = [newPost];
                }
            })
            .addCase(createPost.rejected, (state) => {
                state.status = "Error"
            })
            .addCase(like.pending, (state) => {
                state.status = "Loading"
            })
            .addCase(like.fulfilled, (state, action) => {
                state.status = "Successful";
                const likedPost = action.payload;
                const postIndex = state.PostData?.findIndex((post) => post._id === likedPost.parentID);
                if (postIndex !== -1 && state.PostData !== null && typeof postIndex === 'number') {
                    state.PostData[postIndex].liked = true
                    state.PostData[postIndex].likesCount += 1
                    state.PostData[postIndex].likeID = likedPost._id
                }
            })
            .addCase(like.rejected, (state) => {
                state.status = "Error"
            })
            .addCase(unlike.pending, (state) => {
                state.status = 'Loading';
            })
            .addCase(unlike.fulfilled, (state, action) => {
                state.status = 'Successful';
                const unlikedData = action.payload;
                if (state.PostData !== null) {
                    const postIndex = state.PostData.findIndex((post) => post._id === unlikedData.parentID);
                    if (postIndex !== -1) {
                        state.PostData[postIndex].liked = false;
                        state.PostData[postIndex].likesCount -= 1;
                        state.PostData[postIndex].likeID = unlikedData.likeID; // Update likeID to null
                    } else {
                        console.log(`Post with parentID ${unlikedData.parentID} not found.`);
                    }
                }
            })
            .addCase(unlike.rejected, (state) => {
                state.status = 'Error';
            })
            .addCase(deletePost.pending, (state) => {
                state.status = "Loading"
            })
            .addCase(deletePost.fulfilled, (state, action) => {
                state.status = "Success";
                const deletedPostID = action.payload;

                if (state.PostData !== null) {
                    state.PostData = state.PostData.filter(post => post._id !== deletedPostID.postID);
                }
            })
            .addCase(deletePost.rejected, (state) => {
                state.status = "Error"
            })
            .addCase(updatePost.pending, (state) => {
                state.status = "Loading"
            })
            .addCase(updatePost.fulfilled, (state, action) => {
                state.status = "Success"
                const updatedPost = action.payload
                if (state.PostData !== null) {
                    const postIndex = state.PostData.findIndex((post) => post._id === updatedPost._id);
                    if (postIndex !== -1) {
                        state.PostData[postIndex] = { ...state.PostData[postIndex], ...updatedPost };
                    } else {
                        console.log(`Post with ID ${updatedPost._id} not found.`);
                    }
                }
            })
            .addCase(updatePost.rejected, (state) => {
                state.status = "Error"
            })
    }
})



export const {

} = postSlice.actions
export default postSlice.reducer
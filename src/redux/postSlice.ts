import { createSlice } from '@reduxjs/toolkit'
import {
    getPosts,
    createPost,
    like,
    unlike,
    deletePost,
    updatePost,
    createReply,
    createRepost,
    updateReply,
    deleteReply,
    updateRepost,
    deleteRepost,
    getPostDetails,
    getAllRepliesByPostID,
    getAllPostsByUser,
    getAllRepliesByUser,
    getUserDetails,
    getReplyDetails,
    getRepostDetails,
    getAllRepostsByUser,
    getAllLikesByUser,
    follow,
    unfollow
} from './asynActions/postAsynActions'
import { PostsDataProps, ReplyDataProps, RepostDataProps } from '../types/PostTypes';
import { userData } from '../data/UserData';


export interface UserDetails {
    _id: string
    userFirstName: string,
    userMiddleName: string,
    userLastName: string,
    userName: string,
    avatarURL: string,
    coverPhotoURL: string,
    bio: string,
    isFollowedUser: boolean
    isYourFollower: boolean
    followID: string | null,
    followingsCount: number,
    followersCount: number
    allPostsCount: number
}

interface MainState {
    PostData: any[] | null;
    status: string;
    postDetails: any | null;
    postReplies: ReplyDataProps[] | null
    userPostsList: PostsDataProps[] | null
    userRepliesList: ReplyDataProps[] | null
    userRepostsList: RepostDataProps[] | null
    userLikesList: any[] | null
    userDetails: UserDetails | null
}

const initialState: MainState = {
    PostData: null,
    status: "",
    postDetails: null,
    postReplies: null,
    userPostsList: null,
    userRepliesList: null,
    userRepostsList: null,
    userLikesList: null,
    userDetails: null
}

const postSlice: any = createSlice({
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
                    state.PostData = [...state.PostData, newPost];
                } else {
                    state.PostData = [newPost];
                }
            })
            .addCase(createPost.rejected, (state) => {
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

                if (state.postDetails !== null) {
                    if (state.postDetails._id === updatedPost._id) {
                        state.postDetails = { ...state.postDetails, ...updatedPost }
                    }
                }

                if (state.userPostsList !== null) {
                    const postIndex = state.userPostsList.findIndex((post) => post._id === updatedPost._id);
                    if (postIndex !== -1) {
                        state.userPostsList[postIndex] = { ...state.userPostsList[postIndex], ...updatedPost };
                    }
                }
            })
            .addCase(updatePost.rejected, (state) => {
                state.status = "Error"
            })
            .addCase(deletePost.pending, (state) => {
                state.status = "Loading"
            })
            .addCase(deletePost.fulfilled, (state, action) => {
                state.status = "Success";
                const deletedPostID = action.payload;

                if (state.PostData !== null) {
                    state.PostData = state.PostData.filter(post => post._id !== deletedPostID.postID);
                    state.PostData = state.PostData.filter((post: any) => post.parentPostID !== deletedPostID.postID)
                }

                if (state.postDetails !== null) {
                    if (state.postDetails === deletedPostID) {
                        state.postDetails = null
                    }
                }

                if (state.userPostsList !== null) {
                    state.userPostsList = state.userPostsList.filter((post: PostsDataProps) => post._id !== deletedPostID.postID)
                    if (state.userDetails !== null) {
                        state.userDetails.allPostsCount -= 1
                    }
                }


            })
            .addCase(deletePost.rejected, (state) => {
                state.status = "Error"
            })
            .addCase(like.pending, (state) => {
                state.status = "Loading"
            })
            .addCase(like.fulfilled, (state, action) => {
                state.status = "Successful";
                const likedPost = action.payload;

                const updateLikes = (list: any) => {
                    if (list !== null) {
                        const postIndex = list.findIndex((post: any) => post._id === likedPost.parentID);
                        if (postIndex !== -1) {
                            list[postIndex].isLiked = true;
                            list[postIndex].likesCount += 1;
                            list[postIndex].likeID = likedPost._id;
                        }
                    }
                };

                updateLikes(state.PostData);
                updateLikes(state.postDetails);
                updateLikes(state.postReplies);
                updateLikes(state.userPostsList);
                updateLikes(state.userRepliesList);
                updateLikes(state.userRepostsList);
                updateLikes(state.userLikesList);
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

                const updateUnlikes = (list: any) => {
                    if (list !== null) {
                        const postIndex = list.findIndex((post: any) => post._id === unlikedData.parentID);
                        if (postIndex !== -1) {
                            list[postIndex].isLiked = false;
                            list[postIndex].likesCount -= 1;
                            list[postIndex].likeID = unlikedData.likeID !== null ? unlikedData.likeID : null;
                        }
                    }
                };

                updateUnlikes(state.PostData);
                updateUnlikes(state.postDetails);
                updateUnlikes(state.postReplies);
                updateUnlikes(state.userPostsList);
                updateUnlikes(state.userRepliesList);
                updateUnlikes(state.userRepostsList);
                updateUnlikes(state.userLikesList);

                if (state.userLikesList !== null && unlikedData.authorID === userData.userID) {
                    state.userLikesList = state.userLikesList.filter(like => like._id !== unlikedData.parentID);
                }
            })

            .addCase(unlike.rejected, (state) => {
                state.status = 'Error';
            })
            .addCase(createReply.pending, (state) => {
                state.status = "Loading"
            })
            .addCase(createReply.fulfilled, (state, action) => {
                state.status = "Success";
                const newReply = action.payload;

                const updateRepliesCount = (list: any) => {
                    if (list !== null) {
                        const index = list.findIndex((item: any) => item._id === newReply.parentPostID);
                        if (index !== -1) {
                            list[index].repliesCount += 1;
                        }
                    }
                };

                if (state.PostData !== null) {
                    const parentIndex = state.PostData.findIndex((post) => post._id === newReply.parentPostID);
                    state.PostData = [...state.PostData, newReply];
                    if (parentIndex !== -1) {
                        state.PostData[parentIndex].repliesCount += 1;
                    } else {
                        console.log(`Post with parentID ${newReply.parentID} not found.`);
                    }
                } else {
                    state.PostData = [newReply];
                }

                if (state.postDetails !== null && state.postDetails._id === newReply.parentPostID) {
                    state.postDetails.repliesCount += 1;
                    state.postReplies = state.postReplies ? [...state.postReplies, newReply] : [newReply];
                }

                updateRepliesCount(state.postReplies);
                updateRepliesCount(state.userPostsList);
                updateRepliesCount(state.userRepliesList);
                updateRepliesCount(state.userRepostsList);
            })

            .addCase(createReply.rejected, (state) => {
                state.status = "Error"
            })
            .addCase(updateReply.pending, (state) => {
                state.status = "Loading"
            })
            .addCase(updateReply.fulfilled, (state, action) => {
                state.status = "Success";
                const updatedReply = action.payload;

                const updateItem = (list: any) => {
                    if (list !== null) {
                        const index = list.findIndex((item: any) => item._id === updatedReply._id);
                        if (index !== -1) {
                            list[index] = { ...list[index], ...updatedReply };
                        }
                    }
                };

                updateItem(state.PostData);
                updateItem(state.postReplies);

                if (state.postDetails !== null && state.postDetails._id === updatedReply._id) {
                    state.postDetails = { ...state.postDetails, ...updatedReply };
                }

                updateItem(state.userRepliesList);
            })

            .addCase(updateReply.rejected, (state) => {
                state.status = "Error"
            })
            .addCase(deleteReply.pending, (state) => {
                state.status = "Loading"

            })
            .addCase(deleteReply.fulfilled, (state, action) => {
                state.status = "Success";
                const deletedReplyID = action.payload;

                const removeFromList = (list: any) => {
                    if (list !== null) {
                        const index = list.findIndex((item: any) => item._id === deletedReplyID.postID);
                        if (index !== -1) {
                            list[index].repliesCount -= 1;
                        }
                        return list.filter((item: any) => item._id !== deletedReplyID.postID);
                    }
                    return null;
                };

                state.PostData = removeFromList(state.PostData);
                state.postReplies = removeFromList(state.postReplies);
                state.userPostsList = removeFromList(state.userPostsList);
                state.userRepliesList = removeFromList(state.userRepliesList);
                state.userRepostsList = removeFromList(state.userRepostsList);

                if (state.PostData !== null) {
                    const parentIndex = state.PostData.findIndex((post) => post._id === deletedReplyID.parentID);
                    if (parentIndex === -1) {
                        console.log(`Post with parentID ${deletedReplyID.postID} not found.`);
                    } else {
                        state.PostData[parentIndex].repliesCount -= 1;
                    }
                }

                if (state.postDetails !== null) {
                    state.postDetails.repliesCount -= 1;
                    if (state.postDetails._id === deletedReplyID.postID) {
                        state.postDetails = null;
                    }
                }
            })

            .addCase(deleteReply.rejected, (state) => {
                state.status = "Error"
            })
            .addCase(createRepost.pending, (state) => {
                state.status = "Loading"
            })
            .addCase(createRepost.fulfilled, (state, action) => {
                state.status = "Success"
                const newRepost = action.payload;

                if (state.PostData !== null) {
                    const parentIndex = state.PostData.findIndex((repost: any) => repost._id === newRepost.parentPostID)
                    state.PostData = [...state.PostData, newRepost];

                    if (parentIndex !== -1) {
                        state.PostData[parentIndex].repostsCount += 1;
                    } else {
                        console.log(`Post with parentID ${newRepost.parentPostID} not found.`);
                    }
                } else {
                    state.PostData = [newRepost];
                }

                if (state.postDetails !== null) {
                    if (state.postDetails._id === newRepost.parentPostID) {
                        state.postDetails.repostsCount += 1
                    }
                }

                if (state.userPostsList !== null) {
                    const postIndex = state.userPostsList.findIndex((post: PostsDataProps) => post._id === newRepost.parentPostID)
                    if (postIndex !== -1) {
                        state.userPostsList[postIndex].repostsCount += 1
                    }
                }

                if (state.userRepliesList !== null) {
                    const postIndex = state.userRepliesList.findIndex((post: PostsDataProps) => post._id === newRepost.parentPostID)
                    if (postIndex !== -1) {
                        state.userRepliesList[postIndex].repostsCount += 1
                    }
                }

                if (state.userRepostsList !== null) {
                    const postIndex = state.userRepostsList.findIndex((post: PostsDataProps) => post._id === newRepost.parentPostID)
                    if (postIndex !== -1) {
                        state.userRepostsList[postIndex].repostsCount += 1
                    } else {
                        state.userRepostsList = [...state.userRepostsList, ...newRepost]
                    }
                }

            })
            .addCase(createRepost.rejected, (state) => {
                state.status = "Error"
            })
            .addCase(updateRepost.pending, (state) => {
                state.status = "Loading"
            })
            .addCase(updateRepost.fulfilled, (state, action) => {
                state.status = "Success"
                const updatedRepost = action.payload
                if (state.PostData !== null) {
                    const repostIndex = state.PostData.findIndex((repost) => repost._id === updatedRepost._id);
                    if (repostIndex !== -1) {
                        state.PostData[repostIndex] = { ...state.PostData[repostIndex], ...updatedRepost };
                    } else {
                        console.log(`Post with ID ${updatedRepost._id} not found.`);
                    }
                }

                if (state.postDetails !== null) {
                    if (state.postDetails._id === updatedRepost._id) {
                        state.postDetails = { ...state.postDetails, ...updatedRepost }
                    }
                }

                if (state.userRepostsList !== null && state.userDetails) {
                    const postIndex = state.userRepostsList.findIndex((repost: RepostDataProps) => repost._id === updatedRepost._id)
                    if (postIndex !== -1) {
                        state.userRepostsList[postIndex] = { ...state.userRepostsList, ...updatedRepost }
                    }
                }

            })
            .addCase(updateRepost.rejected, (state) => {
                state.status = "Error"
            })
            .addCase(deleteRepost.pending, (state) => {
                state.status = "Loading"

            })
            .addCase(deleteRepost.fulfilled, (state, action) => {
                state.status = "Success";
                const deletedRepostID = action.payload;

                const removeFromList = (list: any) => {
                    if (list !== null) {
                        const index = list.findIndex((item: any) => item._id === deletedRepostID.postID);
                        if (index !== -1) {
                            list[index].repostsCount -= 1;
                        }
                        return list.filter((item: any) => item._id !== deletedRepostID.postID);
                    }
                    return null;
                };

                state.PostData = removeFromList(state.PostData);
                state.userRepostsList = removeFromList(state.userRepostsList);

                if (state.PostData !== null) {
                    const parentIndex = state.PostData.findIndex((post) => post._id === deletedRepostID.parentID);
                    if (parentIndex === -1) {
                        console.log(`Post with parentID ${deletedRepostID.postID} not found.`);
                    } else {
                        state.PostData[parentIndex].repostsCount -= 1;
                    }
                }
            })

            .addCase(deleteRepost.rejected, (state) => {
                state.status = "Error"
            })
            .addCase(getPostDetails.pending, (state) => {
                state.status = "Loading"
            })
            .addCase(getPostDetails.fulfilled, (state, action) => {
                state.status = "Success"

                state.postDetails = action.payload
            })
            .addCase(getPostDetails.rejected, (state) => {
                state.status = "Error"
            })
            .addCase(getAllRepliesByPostID.pending, (state) => {
                state.status = "Loading"
            })
            .addCase(getAllRepliesByPostID.fulfilled, (state, action) => {
                state.status = "Success"
                const replies = action.payload

                state.postReplies = replies
            })
            .addCase(getReplyDetails.pending, (state) => {
                state.status = "Loading"
            })
            .addCase(getReplyDetails.fulfilled, (state, action) => {
                state.status = "Success"

                state.postDetails = action.payload
            })
            .addCase(getReplyDetails.rejected, (state) => {
                state.status = "Error"
            })
            .addCase(getRepostDetails.pending, (state) => {
                state.status = "Loading"
            })
            .addCase(getRepostDetails.fulfilled, (state, action) => {
                state.status = "Success"

                state.postDetails = action.payload
            })
            .addCase(getRepostDetails.rejected, (state) => {
                state.status = "Error"
            })
            .addCase(getAllPostsByUser.pending, (state) => {
                state.status = "Loading"
            })
            .addCase(getAllPostsByUser.fulfilled, (state, action) => {
                state.status = "Success"
                const allPosts = action.payload

                state.userPostsList = allPosts
            })
            .addCase(getAllPostsByUser.rejected, (state) => {
                state.status = "Error"
            })

            .addCase(getUserDetails.pending, (state) => {
                state.status = "Loading"
            })
            .addCase(getUserDetails.fulfilled, (state, action) => {
                state.status = "Success"
                const userDetails = action.payload

                state.userDetails = userDetails
            })
            .addCase(getUserDetails.rejected, (state) => {
                state.status = "Error"
            })

            .addCase(getAllRepliesByUser.pending, (state) => {
                state.status = "Loading"
            })
            .addCase(getAllRepliesByUser.fulfilled, (state, action) => {
                state.status = "Success"
                const allPosts = action.payload

                state.userRepliesList = allPosts
            })
            .addCase(getAllRepliesByUser.rejected, (state) => {
                state.status = "Error"
            })

            .addCase(getAllRepostsByUser.pending, (state) => {
                state.status = "Loading"
            })
            .addCase(getAllRepostsByUser.fulfilled, (state, action) => {
                state.status = "Success"
                const allPosts = action.payload

                state.userRepostsList = allPosts
            })
            .addCase(getAllRepostsByUser.rejected, (state) => {
                state.status = "Error"
            })
            .addCase(follow.pending, (state) => {
                state.status = "Loading"
            })
            .addCase(follow.fulfilled, (state, action) => {
                state.status = "Success";
                const followResponse = action.payload;

                const updateListData = (data: any) => {
                    const index = data.findIndex((item: any) => item.authorID === followResponse.followingID);
                    if (index !== -1) {
                        data[index] = {
                            ...data[index],
                            isFollowedAuthor: true,
                            followID: followResponse.followID
                        };
                    }
                };

                updateListData(state.PostData);
                updateListData(state.postReplies);
                updateListData(state.userPostsList);
                updateListData(state.userRepliesList);
                updateListData(state.userRepostsList);
                updateListData(state.userLikesList);

                if (state.postDetails !== null && state.postDetails.authorID === followResponse.followingID) {
                    state.postDetails.isFollowedAuthor = true;
                    state.postDetails.followID = followResponse.followID;
                }

                if (state.userDetails !== null && state.userDetails._id === followResponse.followingID) {
                    state.userDetails.isFollowedUser = true;
                    state.userDetails.followID = followResponse.followID;
                }
            })

            .addCase(follow.rejected, (state) => {
                state.status = "Error"
            })
            .addCase(unfollow.pending, (state) => {
                state.status = "Loading"
            })
            .addCase(unfollow.fulfilled, (state, action) => {
                state.status = "Success";
                const unfollowResponse = action.payload;

                const updateListData = (data: any) => {
                    const index = data.findIndex((item: any) => item.authorID === unfollowResponse.followingID);
                    if (index !== -1) {
                        data[index] = {
                            ...data[index],
                            isFollowedAuthor: false,
                            followID: null
                        };
                    }
                };

                updateListData(state.PostData);
                updateListData(state.postReplies);
                updateListData(state.userPostsList);
                updateListData(state.userRepliesList);
                updateListData(state.userRepostsList);
                updateListData(state.userLikesList);

                if (state.postDetails !== null && state.postDetails.authorID === unfollowResponse.followingID) {
                    state.postDetails.isFollowedAuthor = false;
                    state.postDetails.followID = null;
                }

                if (state.userDetails !== null && state.userDetails._id === unfollowResponse.followingID) {
                    state.userDetails.isFollowedUser = false;
                    state.userDetails.followID = null;
                }
            })

            .addCase(getAllLikesByUser.pending, (state) => {
                state.status = "Loading"
            })
            .addCase(getAllLikesByUser.fulfilled, (state, action) => {
                state.status = "Success"
                const allLikes = action.payload
                state.userLikesList = allLikes
            })
            .addCase(getAllLikesByUser.rejected, (state) => {
                state.status = "Error"
            })
    }
})

export const {

} = postSlice.actions
export default postSlice.reducer
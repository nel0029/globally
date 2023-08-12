/** @format */

import { createSlice } from "@reduxjs/toolkit";
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
  unfollow,
  getUserFollowing,
  getUserFollowers,
  createNewPollResponse,
} from "./asynActions/postAsynActions";
import {
  PostsDataProps,
  ReplyDataProps,
  RepostDataProps,
} from "../types/PostTypes";
import { userData } from "../data/UserData";
import { UserProps } from "../pages/Profile/ProfileComponents/UserCard";

interface MediaProps {
  id: string;
  url: string;
}

export interface UserDetails {
  _id: string;
  userFirstName: string;
  userMiddleName: string;
  userLastName: string;
  userName: string;
  avatarURL: MediaProps;
  coverPhotoURL: MediaProps;
  bio: string;
  isFollowedUser: boolean;
  isYourFollower: boolean;
  followID: string | null;
  followingsCount: number;
  followersCount: number;
  allPostsCount: number;
}

interface MainState {
  PostData: any[] | null;
  status: string;
  postDetails: any | null;
  postReplies: ReplyDataProps[] | null;
  userPostsList: PostsDataProps[] | null;
  userRepliesList: ReplyDataProps[] | null;
  userRepostsList: RepostDataProps[] | null;
  userLikesList: any | null;
  userDetails: UserDetails | null;
  userFollowing: UserProps[] | null;
  userFollowers: UserProps[] | null;
  lastConversation: any | null;
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
  userDetails: null,
  userFollowers: null,
  userFollowing: null,
  lastConversation: null,
};

const postSlice: any = createSlice({
  name: "post",
  initialState,
  reducers: {
    getLastConversation: (state, action) => {
      state.lastConversation = action.payload;
    },
    resetUserDetails: (state) => {
      state.userDetails = null;
    },
    resetAllPostsList: (state) => {
      state.userFollowers = null;
      state.userFollowing = null;
      state.userLikesList = null;
      state.userPostsList = null;
      state.userRepliesList = null;
      state.userRepostsList = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPosts.pending, (state) => {
        state.status = "Loading";
      })
      .addCase(getPosts.fulfilled, (state, action) => {
        state.status = "Successful";
        state.PostData = action.payload;
      })
      .addCase(getPosts.rejected, (state) => {
        state.status = "Error";
      })
      .addCase(createPost.pending, (state) => {
        state.status = "Loading";
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.status = "Successful";
        const newPost = action.payload;
        if (state.PostData !== null) {
          state.PostData = [...state.PostData, newPost];
        } else {
          state.PostData = [newPost];
        }
      })
      .addCase(createPost.rejected, (state) => {
        state.status = "Error";
      })
      .addCase(updatePost.pending, (state) => {
        state.status = "Loading";
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        state.status = "Success";
        const updatedPost = action.payload;
        if (state.PostData !== null) {
          const postIndex = state.PostData.findIndex(
            (post) => post._id === updatedPost._id
          );
          if (postIndex !== -1) {
            state.PostData[postIndex] = {
              ...state.PostData[postIndex],
              ...updatedPost,
            };
          }
        }

        if (state.postDetails !== null) {
          if (state.postDetails._id === updatedPost._id) {
            state.postDetails = { ...state.postDetails, ...updatedPost };
          }
        }

        if (state.userPostsList !== null) {
          const postIndex = state.userPostsList.findIndex(
            (post) => post._id === updatedPost._id
          );
          if (postIndex !== -1) {
            state.userPostsList[postIndex] = {
              ...state.userPostsList[postIndex],
              ...updatedPost,
            };
          }
        }
      })
      .addCase(updatePost.rejected, (state) => {
        state.status = "Error";
      })
      .addCase(deletePost.pending, (state) => {
        state.status = "Loading";
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.status = "Success";
        const deletedPostID = action.payload;

        if (state.PostData !== null) {
          state.PostData = state.PostData.filter(
            (post) => post._id !== deletedPostID.postID
          );
          //state.PostData = state.PostData.filter((post: any) => post.parentPostID !== deletedPostID.postID)
        }

        if (state.postDetails !== null) {
          if (state.postDetails === deletedPostID) {
            state.postDetails = null;
          }
        }

        if (state.userPostsList !== null) {
          state.userPostsList = state.userPostsList.filter(
            (post: PostsDataProps) => post._id !== deletedPostID.postID
          );
          if (state.userDetails !== null) {
            state.userDetails.allPostsCount -= 1;
          }
        }
      })
      .addCase(deletePost.rejected, (state) => {
        state.status = "Error";
      })
      .addCase(like.pending, (state) => {
        state.status = "Loading";
      })
      .addCase(like.fulfilled, (state, action) => {
        state.status = "Successful";
        const likedPost = action.payload;

        const postIndex = state.PostData?.findIndex(
          (post) => post._id === likedPost.parentID
        );

        if (
          postIndex !== -1 &&
          state.PostData !== null &&
          typeof postIndex === "number"
        ) {
          state.PostData[postIndex].isLiked = true;
          state.PostData[postIndex].likesCount += 1;
          state.PostData[postIndex].likeID = likedPost._id;
        }
        if (
          state.postDetails !== null &&
          state.postDetails?._id === likedPost.parentID
        ) {
          state.postDetails.isLiked = true;
          state.postDetails.likeID = likedPost._id;
          state.postDetails.likesCount += 1;
        }
        if (state.postReplies !== null) {
          const postIndex = state.postReplies.findIndex(
            (post: any) => post._id === likedPost.parentID
          );
          if (postIndex !== -1) {
            state.postReplies[postIndex].isLiked = true;
            state.postReplies[postIndex].likesCount += 1;
            state.postReplies[postIndex].likeID = likedPost._id;
          }
        }

        if (state.userPostsList !== null) {
          const postIndex = state.userPostsList.findIndex(
            (post: any) => post._id === likedPost.parentID
          );
          if (postIndex !== -1) {
            state.userPostsList[postIndex].isLiked = true;
            state.userPostsList[postIndex].likesCount += 1;
            state.userPostsList[postIndex].likeID = likedPost._id;
          }
        }

        if (state.userRepliesList !== null) {
          const postIndex = state.userRepliesList.findIndex(
            (post: any) => post._id === likedPost.parentID
          );
          if (postIndex !== -1) {
            state.userRepliesList[postIndex].isLiked = true;
            state.userRepliesList[postIndex].likesCount += 1;
            state.userRepliesList[postIndex].likeID = likedPost._id;
          }
        }

        if (state.userRepostsList !== null) {
          const postIndex = state.userRepostsList.findIndex(
            (post: any) => post._id === likedPost.parentID
          );
          if (postIndex !== -1) {
            state.userRepostsList[postIndex].isLiked = true;
            state.userRepostsList[postIndex].likesCount += 1;
            state.userRepostsList[postIndex].likeID = likedPost._id;
          }
        }

        if (state.userLikesList !== null) {
          const postIndex = state.userLikesList.findIndex(
            (post: any) => post._id === likedPost.parentID
          );
          if (postIndex !== -1) {
            state.userLikesList[postIndex].isLiked = true;
            state.userLikesList[postIndex].likesCount += 1;
            state.userLikesList[postIndex].likeID = likedPost._id;
          }
        }
      })
      .addCase(like.rejected, (state) => {
        state.status = "Error";
      })
      .addCase(unlike.pending, (state) => {
        state.status = "Loading";
      })
      .addCase(unlike.fulfilled, (state, action) => {
        state.status = "Successful";
        const unlikedData = action.payload;

        if (state.PostData !== null) {
          const postIndex = state.PostData.findIndex(
            (post) => post._id === unlikedData.parentID
          );
          if (postIndex !== -1) {
            state.PostData[postIndex].isLiked = false;
            state.PostData[postIndex].likesCount -= 1;
            state.PostData[postIndex].likeID =
              unlikedData.likeID !== null ? unlikedData.likeID : null; // Update likeID to empty string if it's null
          }
        }
        if (
          state.postDetails !== null &&
          state.postDetails?._id === unlikedData.parentID &&
          state.postDetails.likeID !== null
        ) {
          state.postDetails.isLiked = false; // Set liked to false
          if (unlikedData.likeID !== null) {
            state.postDetails.likeID = unlikedData.likeID;
          }
          state.postDetails.likesCount -= 1;
        }
        if (state.postReplies !== null) {
          const postIndex = state.postReplies.findIndex(
            (post: any) => post._id === unlikedData.parentID
          );
          if (postIndex !== -1) {
            state.postReplies[postIndex].isLiked = false;
            state.postReplies[postIndex].likesCount -= 1;
            state.postReplies[postIndex].likeID = unlikedData.likeID;
          }
        }

        if (state.userPostsList !== null) {
          const postIndex = state.userPostsList.findIndex(
            (post: any) => post._id === unlikedData.parentID
          );
          if (postIndex !== -1) {
            state.userPostsList[postIndex].isLiked = false;
            state.userPostsList[postIndex].likesCount -= 1;
            state.userPostsList[postIndex].likeID = unlikedData.likeID;
          }
        }

        if (state.userRepliesList !== null) {
          const postIndex = state.userRepliesList.findIndex(
            (post: any) => post._id === unlikedData.parentID
          );
          if (postIndex !== -1) {
            state.userRepliesList[postIndex].isLiked = false;
            state.userRepliesList[postIndex].likesCount -= 1;
            state.userRepliesList[postIndex].likeID = unlikedData.likeID;
          }
        }

        if (state.userRepostsList !== null) {
          const postIndex = state.userRepostsList.findIndex(
            (post: any) => post._id === unlikedData.parentID
          );
          if (postIndex !== -1) {
            state.userRepostsList[postIndex].isLiked = false;
            state.userRepostsList[postIndex].likesCount -= 1;
            state.userRepostsList[postIndex].likeID = unlikedData.likeID;
          }
        }

        if (state.userLikesList !== null) {
          const postIndex = state.userLikesList.findIndex(
            (post: any) => post._id === unlikedData.parentID
          );
          if (postIndex !== -1) {
            state.userLikesList[postIndex].isLiked = false;
            state.userLikesList[postIndex].likesCount -= 1;
            state.userLikesList[postIndex].likeID = unlikedData.likeID;
          }

          const userID = localStorage.getItem("userID");
          if (userID === unlikedData.authorID) {
            state.userLikesList = state.userLikesList.filter(
              (like: any) => like._id !== unlikedData.parentID
            );
          }
        }
      })
      .addCase(unlike.rejected, (state) => {
        state.status = "Error";
      })
      .addCase(createReply.pending, (state) => {
        state.status = "Loading";
      })
      .addCase(createReply.fulfilled, (state, action) => {
        state.status = "Success";
        const newReply = action.payload;

        if (state.PostData !== null) {
          const parentIndex = state.PostData.findIndex(
            (post: any) => post._id === newReply.parentPostID
          );
          state.PostData = [...state.PostData, newReply];

          if (parentIndex !== -1) {
            state.PostData[parentIndex].repliesCount += 1;
          }
        } else {
          state.PostData = [newReply];
        }

        if (state.postDetails !== null) {
          if (state.postDetails._id === newReply.parentPostID) {
            state.postDetails.repliesCount += 1;
            state.postReplies = state.postReplies
              ? [...state.postReplies, newReply]
              : [newReply];
          }
        }
        if (state.postReplies !== null) {
          const replyIndex: number = state.postReplies.findIndex(
            (reply: any) => {
              return reply._id === newReply.parentPostID;
            }
          );

          if (replyIndex !== -1) {
            state.postReplies[replyIndex].repliesCount += 1;
          }
        }

        if (state.userPostsList !== null) {
          const postIndex = state.userPostsList.findIndex(
            (post: PostsDataProps) => post._id === newReply.parentPostID
          );
          if (postIndex !== -1) {
            state.userPostsList[postIndex].repliesCount += 1;
          }
        }

        if (state.userRepliesList !== null) {
          const replyIndex: number = state.userRepliesList.findIndex(
            (reply: any) => {
              return reply._id === newReply.parentPostID;
            }
          );

          if (replyIndex !== -1) {
            state.userRepliesList[replyIndex].repliesCount += 1;
            state.userRepliesList = [...state.userRepliesList, newReply];
          }
        }

        if (state.userRepostsList !== null) {
          const postIndex = state.userRepostsList.findIndex(
            (post: PostsDataProps) => post._id === newReply.parentPostID
          );
          if (postIndex !== -1) {
            state.userRepostsList[postIndex].repliesCount += 1;
          }
        }
      })
      .addCase(createReply.rejected, (state) => {
        state.status = "Error";
      })
      .addCase(updateReply.pending, (state) => {
        state.status = "Loading";
      })
      .addCase(updateReply.fulfilled, (state, action) => {
        state.status = "Success";
        const updatedReply = action.payload;
        if (state.PostData !== null) {
          const replyIndex = state.PostData.findIndex(
            (reply) => reply._id === updatedReply._id
          );
          if (replyIndex !== -1) {
            state.PostData[replyIndex] = {
              ...state.PostData[replyIndex],
              ...updatedReply,
            };
          }

          if (state.postReplies !== null) {
            const replyIndex = state.postReplies.findIndex(
              (reply: any) => reply._id === updatedReply._id
            );
            state.postReplies[replyIndex].repliesCount += 1;
          }

          if (state.postDetails !== null) {
            if (state.postDetails._id === updatedReply._id) {
              state.postDetails = { ...state.postDetails, ...updatedReply };
            }
          }

          if (state.userRepliesList !== null) {
            const postIndex = state.userRepliesList.findIndex(
              (post) => post._id === updatedReply._id
            );
            if (postIndex !== -1) {
              state.userRepliesList[postIndex] = {
                ...state.userRepliesList[postIndex],
                ...updatedReply,
              };
            }
          }
        }
      })
      .addCase(updateReply.rejected, (state) => {
        state.status = "Error";
      })
      .addCase(deleteReply.pending, (state) => {
        state.status = "Loading";
      })
      .addCase(deleteReply.fulfilled, (state, action) => {
        state.status = "Success";
        const deletedReplyID = action.payload;

        if (state.PostData !== null) {
          const parentIndex = state.PostData.findIndex(
            (post: any) => post._id === deletedReplyID.parentPostID
          );

          //state.PostData = state.PostData.filter((post: any) => post.parentPostID !== deletedReplyID.postID)
          state.PostData = state.PostData.filter(
            (reply) => reply._id !== deletedReplyID.postID
          );
          if (parentIndex !== -1) {
            state.PostData[parentIndex].repliesCount -= 1;
          }
        }
        if (state.postDetails !== null) {
          if (state.postReplies !== null) {
            state.postReplies = state.postReplies.filter(
              (reply: any) => reply._id !== deletedReplyID.postID
            );
            state.postDetails.repliesCount -= 1;
          }
          if (state.postDetails._id === deletedReplyID.postID) {
            state.postDetails = null;
          }
        }

        if (state.postReplies !== null) {
          state.postReplies = state.postReplies.filter(
            (reply: ReplyDataProps) => reply._id !== deletedReplyID.postID
          );
        }

        if (state.userPostsList !== null) {
          const postIndex = state.userPostsList.findIndex(
            (post: PostsDataProps) => post._id === deletedReplyID.postID
          );

          if (postIndex !== -1) {
            state.userPostsList[postIndex].repliesCount -= 1;
          }
        }

        if (state.userRepliesList !== null) {
          const postIndex = state.userRepliesList.findIndex(
            (post: PostsDataProps) => post._id === deletedReplyID.postID
          );

          if (postIndex !== -1) {
            state.userRepliesList[postIndex].repliesCount -= 1;
          }

          state.userRepliesList = state.userRepliesList.filter(
            (reply: ReplyDataProps) => reply._id !== deletedReplyID.postID
          );
        }

        if (state.userRepostsList !== null) {
          const postIndex = state.userRepostsList.findIndex(
            (post: PostsDataProps) => post._id === deletedReplyID.postID
          );

          if (postIndex !== -1) {
            state.userRepostsList[postIndex].repliesCount -= 1;
          }
        }
      })
      .addCase(deleteReply.rejected, (state) => {
        state.status = "Error";
      })
      .addCase(createRepost.pending, (state) => {
        state.status = "Loading";
      })
      .addCase(createRepost.fulfilled, (state, action) => {
        state.status = "Success";
        const newRepost = action.payload;

        if (state.PostData !== null) {
          const parentIndex = state.PostData.findIndex(
            (repost: any) => repost._id === newRepost.parentPostID
          );
          state.PostData = [...state.PostData, newRepost];

          if (parentIndex !== -1) {
            state.PostData[parentIndex].repostsCount += 1;
          }
        } else {
          state.PostData = [newRepost];
        }

        if (state.postDetails !== null) {
          if (state.postDetails._id === newRepost.parentPostID) {
            state.postDetails.repostsCount += 1;
          }
        }

        if (state.userPostsList !== null) {
          const postIndex = state.userPostsList.findIndex(
            (post: PostsDataProps) => post._id === newRepost.parentPostID
          );
          if (postIndex !== -1) {
            state.userPostsList[postIndex].repostsCount += 1;
          }
        }

        if (state.userRepliesList !== null) {
          const postIndex = state.userRepliesList.findIndex(
            (post: PostsDataProps) => post._id === newRepost.parentPostID
          );
          if (postIndex !== -1) {
            state.userRepliesList[postIndex].repostsCount += 1;
          }
        }

        if (state.userRepostsList !== null) {
          const postIndex = state.userRepostsList.findIndex(
            (post: PostsDataProps) => post._id === newRepost.parentPostID
          );
          if (postIndex !== -1) {
            state.userRepostsList[postIndex].repostsCount += 1;
          } else {
            state.userRepostsList = [...state.userRepostsList, ...newRepost];
          }
        }
      })
      .addCase(createRepost.rejected, (state) => {
        state.status = "Error";
      })
      .addCase(updateRepost.pending, (state) => {
        state.status = "Loading";
      })
      .addCase(updateRepost.fulfilled, (state, action) => {
        state.status = "Success";
        const updatedRepost = action.payload;
        if (state.PostData !== null) {
          const repostIndex = state.PostData.findIndex(
            (repost) => repost._id === updatedRepost._id
          );
          if (repostIndex !== -1) {
            state.PostData[repostIndex] = {
              ...state.PostData[repostIndex],
              ...updatedRepost,
            };
          }
        }

        if (state.postDetails !== null) {
          if (state.postDetails._id === updatedRepost._id) {
            state.postDetails = { ...state.postDetails, ...updatedRepost };
          }
        }

        if (state.userRepostsList !== null && state.userDetails) {
          const postIndex = state.userRepostsList.findIndex(
            (repost: RepostDataProps) => repost._id === updatedRepost._id
          );
          if (postIndex !== -1) {
            state.userRepostsList[postIndex] = {
              ...state.userRepostsList,
              ...updatedRepost,
            };
          }
        }
      })
      .addCase(updateRepost.rejected, (state) => {
        state.status = "Error";
      })
      .addCase(deleteRepost.pending, (state) => {
        state.status = "Loading";
      })
      .addCase(deleteRepost.fulfilled, (state, action) => {
        state.status = "Success";
        const deletedRepostID = action.payload;

        if (state.PostData !== null) {
          const parentIndex = state.PostData.findIndex(
            (post: any) => post._id === deletedRepostID.parentPostID
          );

          state.PostData = state.PostData.filter(
            (post: any) => post._id !== deletedRepostID.postID
          );

          if (parentIndex !== -1) {
            state.PostData[parentIndex].repostsCount -= 1;
          }
        }

        if (state.userRepostsList !== null) {
          state.userRepostsList = state.userRepostsList.filter(
            (repost: RepostDataProps) => repost._id !== deletedRepostID.postID
          );
        }
      })
      .addCase(deleteRepost.rejected, (state) => {
        state.status = "Error";
      })
      .addCase(getPostDetails.pending, (state) => {
        state.status = "Loading";
      })
      .addCase(getPostDetails.fulfilled, (state, action) => {
        state.status = "Success";

        state.postDetails = action.payload;
      })
      .addCase(getPostDetails.rejected, (state) => {
        state.status = "Error";
      })
      .addCase(getAllRepliesByPostID.pending, (state) => {
        state.status = "Loading";
      })
      .addCase(getAllRepliesByPostID.fulfilled, (state, action) => {
        state.status = "Success";
        const replies = action.payload;

        state.postReplies = replies;
      })
      .addCase(getReplyDetails.pending, (state) => {
        state.status = "Loading";
      })
      .addCase(getReplyDetails.fulfilled, (state, action) => {
        state.status = "Success";

        state.postDetails = action.payload;
      })
      .addCase(getReplyDetails.rejected, (state) => {
        state.status = "Error";
      })
      .addCase(getRepostDetails.pending, (state) => {
        state.status = "Loading";
      })
      .addCase(getRepostDetails.fulfilled, (state, action) => {
        state.status = "Success";

        state.postDetails = action.payload;
      })
      .addCase(getRepostDetails.rejected, (state) => {
        state.status = "Error";
      })
      .addCase(getAllPostsByUser.pending, (state) => {
        state.status = "Loading";
      })
      .addCase(getAllPostsByUser.fulfilled, (state, action) => {
        state.status = "Success";
        const allPosts = action.payload;

        state.userPostsList = allPosts;
      })
      .addCase(getAllPostsByUser.rejected, (state) => {
        state.status = "Error";
      })

      .addCase(getUserDetails.pending, (state) => {
        state.status = "Loading";
      })
      .addCase(getUserDetails.fulfilled, (state, action) => {
        state.status = "Success";
        const userDetails = action.payload;

        state.userDetails = userDetails;
      })
      .addCase(getUserDetails.rejected, (state) => {
        state.status = "Error";
      })

      .addCase(getAllRepliesByUser.pending, (state) => {
        state.status = "Loading";
      })
      .addCase(getAllRepliesByUser.fulfilled, (state, action) => {
        state.status = "Success";
        const allPosts = action.payload;

        state.userRepliesList = allPosts;
      })
      .addCase(getAllRepliesByUser.rejected, (state) => {
        state.status = "Error";
      })

      .addCase(getAllRepostsByUser.pending, (state) => {
        state.status = "Loading";
      })
      .addCase(getAllRepostsByUser.fulfilled, (state, action) => {
        state.status = "Success";
        const allPosts = action.payload;

        state.userRepostsList = allPosts;
      })
      .addCase(getAllRepostsByUser.rejected, (state) => {
        state.status = "Error";
      })
      .addCase(follow.pending, (state) => {
        state.status = "Loading";
      })
      .addCase(follow.fulfilled, (state, action) => {
        state.status = "Success";
        const followResponse = action.payload;

        if (state.PostData !== null) {
          state.PostData = state.PostData.map((post) => {
            if (post.authorID === followResponse.followingID) {
              return {
                ...post,
                isFollowedAuthor: true,
                followID: followResponse.followID,
              };
            }
            return post;
          });
        }

        if (state.postDetails !== null) {
          if (state.postDetails.authorID === followResponse.followingID) {
            state.postDetails.isFollowedAuthor = true;
            state.postDetails.followerID = followResponse.followID;
          }
        }

        if (state.postReplies !== null) {
          const replyIndex = state.postReplies.findIndex(
            (reply: ReplyDataProps) =>
              reply.authorID === followResponse.followingID
          );
          if (replyIndex !== -1) {
            state.postReplies[replyIndex].isFollowedAuthor = true;
            state.postReplies[replyIndex].followID = followResponse.followID;
          }
        }

        if (state.userDetails !== null) {
          if (state.userDetails._id === followResponse.followingID) {
            state.userDetails.isFollowedUser = true;
            state.userDetails.followID = null;
          }

          if (state.userFollowers !== null) {
            const followerIndex = state.userFollowers.findIndex(
              (follower: any) => follower._id === followResponse.followingID
            );

            const userID = localStorage.getItem("userID");
            if (state.userDetails._id === userID) {
              state.userFollowing = state.userFollowers.filter(
                (follower: any) => follower._id !== followResponse.followingID
              );
            } else {
              state.userFollowers[followerIndex].isUserFollowed = true;
              state.userFollowers[followerIndex].followID =
                followResponse.followID;
            }
          }

          if (state.userFollowing !== null) {
            const followerIndex = state.userFollowing.findIndex(
              (follower: any) => follower._id === followResponse.followingID
            );

            const userID = localStorage.getItem("userID");
            if (state.userDetails._id === userID) {
              state.userFollowing = state.userFollowing.filter(
                (follower: any) => follower._id !== followResponse.followingID
              );
            } else {
              state.userFollowing[followerIndex].isUserFollowed = true;
              state.userFollowing[followerIndex].followID =
                followResponse.followID;
            }
          }
        }

        if (state.userPostsList !== null) {
          const postIndex = state.userPostsList.findIndex(
            (post: any) => post.authorID === followResponse.followingID
          );

          if (postIndex !== -1) {
            state.userPostsList[postIndex].followID = followResponse.followID;
            state.userPostsList[postIndex].isFollowedAuthor = true;
          }
        }

        if (state.userRepliesList !== null) {
          const postIndex = state.userRepliesList.findIndex(
            (post: any) => post.authorID === followResponse.followingID
          );

          if (postIndex !== -1) {
            state.userRepliesList[postIndex].followID = followResponse.followID;
            state.userRepliesList[postIndex].isFollowedAuthor = true;
          }
        }

        if (state.userRepostsList !== null) {
          const postIndex = state.userRepostsList.findIndex(
            (post: any) => post.authorID === followResponse.followingID
          );

          if (postIndex !== -1) {
            state.userRepostsList[postIndex].followID = followResponse.followID;
            state.userRepostsList[postIndex].isFollowedAuthor = true;
          }
        }

        if (state.userLikesList !== null) {
          const postIndex = state.userLikesList.findIndex(
            (post: any) => post.authorID === followResponse.followingID
          );

          if (postIndex !== -1) {
            state.userLikesList[postIndex].followID = followResponse.followID;
            state.userLikesList[postIndex].isFollowedAuthor = true;
          }
        }
      })
      .addCase(follow.rejected, (state) => {
        state.status = "Error";
      })
      .addCase(unfollow.pending, (state) => {
        state.status = "Loading";
      })
      .addCase(unfollow.fulfilled, (state, action) => {
        state.status = "Success";
        const unfollowResponse = action.payload;

        if (state.PostData !== null) {
          state.PostData = state.PostData.map((post) => {
            if (post.authorID === unfollowResponse.followingID) {
              return {
                ...post,
                isFollowedAuthor: false,
                followID: unfollowResponse.followID,
              };
            }
            return post;
          });
        }

        if (state.postDetails !== null) {
          if (state.postDetails.authorID === unfollowResponse.followingID) {
            state.postDetails.isFollowedAuthor = false;
            state.postDetails.followerID = null;
          }
        }

        if (state.postReplies !== null) {
          const replyIndex = state.postReplies.findIndex(
            (reply: ReplyDataProps) =>
              reply.authorID === unfollowResponse.followingID
          );
          if (replyIndex !== -1) {
            state.postReplies[replyIndex].isFollowedAuthor = false;
            state.postReplies[replyIndex].followID = null;
          }
        }

        if (state.userDetails !== null) {
          if (state.userDetails._id === unfollowResponse.followingID) {
            state.userDetails.isFollowedUser = false;
            state.userDetails.followID = null;
          }

          if (state.userFollowers !== null) {
            const followerIndex = state.userFollowers.findIndex(
              (follower: any) => follower._id === unfollowResponse.followingID
            );

            const userID = localStorage.getItem("userID");
            if (state.userDetails._id === userID) {
              state.userFollowing = state.userFollowers.filter(
                (follower: any) => follower._id !== unfollowResponse.followingID
              );
            } else {
              state.userFollowers[followerIndex].isUserFollowed = false;
              state.userFollowers[followerIndex].followID =
                unfollowResponse.followID;
            }
          }

          if (state.userFollowing !== null) {
            const followerIndex = state.userFollowing.findIndex(
              (follower: any) => follower._id === unfollowResponse.followingID
            );

            const userID = localStorage.getItem("userID");
            if (state.userDetails._id === userID) {
              state.userFollowing = state.userFollowing.filter(
                (follower: any) => follower._id !== unfollowResponse.followingID
              );
            } else {
              state.userFollowing[followerIndex].isUserFollowed = false;
              state.userFollowing[followerIndex].followID =
                unfollowResponse.followID;
            }
          }
        }

        if (state.userPostsList !== null) {
          const postIndex = state.userPostsList.findIndex(
            (post: any) => post.authorID === unfollowResponse.followingID
          );

          if (postIndex !== -1) {
            state.userPostsList[postIndex].followID = null;
            state.userPostsList[postIndex].isFollowedAuthor = false;
          }
        }

        if (state.userRepliesList !== null) {
          const postIndex = state.userRepliesList.findIndex(
            (post: any) => post.authorID === unfollowResponse.followingID
          );

          if (postIndex !== -1) {
            state.userRepliesList[postIndex].followID = null;
            state.userRepliesList[postIndex].isFollowedAuthor = false;
          }
        }

        if (state.userRepostsList !== null) {
          const postIndex = state.userRepostsList.findIndex(
            (post: any) => post.authorID === unfollowResponse.followingID
          );

          if (postIndex !== -1) {
            state.userRepostsList[postIndex].followID = null;
            state.userRepostsList[postIndex].isFollowedAuthor = false;
          }
        }

        if (state.userLikesList !== null) {
          const postIndex = state.userLikesList.findIndex(
            (post: any) => post.authorID === unfollowResponse.followingID
          );

          if (postIndex !== -1) {
            state.userLikesList[postIndex].followID = null;
            state.userLikesList[postIndex].isFollowedAuthor = false;
          }
        }
      })
      .addCase(getAllLikesByUser.pending, (state) => {
        state.status = "Loading";
      })
      .addCase(getAllLikesByUser.fulfilled, (state, action) => {
        state.status = "Success";
        const allLikes = action.payload;
        state.userLikesList = allLikes;
      })
      .addCase(getAllLikesByUser.rejected, (state) => {
        state.status = "Error";
      })
      .addCase(getUserFollowing.pending, (state) => {
        state.status = "Loading";
      })
      .addCase(getUserFollowing.fulfilled, (state, action) => {
        state.status = "Success";
        state.userFollowing = action.payload;
      })
      .addCase(getUserFollowing.rejected, (state) => {
        state.status = "Error";
      })
      .addCase(getUserFollowers.pending, (state) => {
        state.status = "Loading";
      })
      .addCase(getUserFollowers.fulfilled, (state, action) => {
        state.status = "Success";
        state.userFollowers = action.payload;
      })
      .addCase(getUserFollowers.rejected, (state) => {
        state.status = "Error";
      })
      .addCase(createNewPollResponse.pending, (state) => {
        state.status = "Loading";
      })
      .addCase(createNewPollResponse.fulfilled, (state, action) => {
        state.status = "Success";
        const responsePollData = action.payload;
        if (state.PostData !== null) {
          const postIndex = state.PostData.findIndex(
            (post: PostsDataProps) => post._id === responsePollData.postID
          );
          if (postIndex !== -1) {
            state.PostData[postIndex].hasChoosed = true;
            state.PostData[postIndex].optionChoosedID =
              responsePollData.optionID;
            state.PostData[postIndex].pollRespondentsCount += 1;

            const optionIndex = state.PostData[postIndex].pollOptions.findIndex(
              (option: any) => option._id === responsePollData.optionID
            );
            if (optionIndex !== -1) {
              state.PostData[postIndex].pollOptions[optionIndex].count += 1;
            }
          }
        }

        if (state.postDetails !== null) {
          if (state.postDetails._id === responsePollData.postID) {
            state.postDetails.hasChoosed = true;
            state.postDetails.optionChoosedID = responsePollData.optionID;
            state.postDetails.pollRespondentsCount += 1;

            const optionIndex = state.postDetails.pollOptions.findIndex(
              (option: any) => option._id === responsePollData.optionID
            );
            if (optionIndex !== -1) {
              state.postDetails.pollOptions[optionIndex].count += 1;
            }
          }
        }
      });
  },
});

export const { getLastConversation, resetUserDetails, resetAllPostsList } =
  postSlice.actions;
export default postSlice.reducer;

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
  deleteUserPosts,
} from "./asynActions/postAsynActions";
import {
  PostsDataProps,
  ReplyDataProps,
  RepostDataProps,
} from "../types/PostTypes";

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
  verified: boolean;
}

interface MainState {
  PostData: any[] | null;
  status: string;
  postDetails: any | null;
  postReplies: any | null;
  userPostsList: any | null;
  userRepliesList: any | null;
  userRepostsList: any | null;
  userLikesList: any | null;
  userDetails: UserDetails | null;
  userFollowing: any | null;
  userFollowers: any | null;
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
    resetPostsState: (state) => {
      state = initialState;
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(getPosts.fulfilled, (state, action) => {
        state.status = "Successful";
        state.PostData = action.payload;
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

      .addCase(updatePost.fulfilled, (state, action) => {
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
          const postIndex = state.userPostsList.posts.findIndex(
            (post: any) => post._id === updatedPost._id
          );
          if (postIndex !== -1) {
            state.userPostsList.posts[postIndex] = {
              ...state.userPostsList.posts[postIndex],
              ...updatedPost,
            };
          }
        }
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        const deletedPostID = action.payload;

        if (state.PostData !== null) {
          state.PostData = state.PostData.filter(
            (post) => post._id !== deletedPostID.postID
          );
        }

        if (state.postDetails !== null) {
          if (state.postDetails === deletedPostID) {
            state.postDetails = null;
          }
        }

        if (state.userPostsList !== null) {
          state.userPostsList.posts = state.userPostsList.posts.filter(
            (post: PostsDataProps) => post._id !== deletedPostID.postID
          );
          if (state.userDetails !== null) {
            state.userDetails.allPostsCount -= 1;
          }
        }
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
          const postIndex = state.postReplies.replies.findIndex(
            (post: any) => post._id === likedPost.parentID
          );
          if (postIndex !== -1) {
            state.postReplies.replies[postIndex].isLiked = true;
            state.postReplies.replies[postIndex].likesCount += 1;
            state.postReplies.replies[postIndex].likeID = likedPost._id;
          }
        }

        if (state.userPostsList !== null) {
          const postIndex = state.userPostsList.posts.findIndex(
            (post: any) => post._id === likedPost.parentID
          );
          if (postIndex !== -1) {
            state.userPostsList.posts[postIndex].isLiked = true;
            state.userPostsList.posts[postIndex].likesCount += 1;
            state.userPostsList.posts[postIndex].likeID = likedPost._id;
          }
        }

        if (state.userRepliesList !== null) {
          const postIndex = state.userRepliesList.posts.findIndex(
            (post: any) => post._id === likedPost.parentID
          );
          if (postIndex !== -1) {
            state.userRepliesList.posts[postIndex].isLiked = true;
            state.userRepliesList.posts[postIndex].likesCount += 1;
            state.userRepliesList.posts[postIndex].likeID = likedPost._id;
          }
        }

        if (state.userRepostsList !== null) {
          const postIndex = state.userRepostsList.posts.findIndex(
            (post: any) => post._id === likedPost.parentID
          );
          if (postIndex !== -1) {
            state.userRepostsList.posts[postIndex].isLiked = true;
            state.userRepostsList.posts[postIndex].likesCount += 1;
            state.userRepostsList.posts[postIndex].likeID = likedPost._id;
          }
        }

        if (state.userLikesList !== null) {
          const postIndex = state.userLikesList.posts.findIndex(
            (post: any) => post._id === likedPost.parentID
          );
          if (postIndex !== -1) {
            state.userLikesList.posts[postIndex].isLiked = true;
            state.userLikesList.posts[postIndex].likesCount += 1;
            state.userLikesList.posts[postIndex].likeID = likedPost._id;
          }
        }
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
              unlikedData.likeID !== null ? unlikedData.likeID : null;
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
          const postIndex = state.postReplies.replies.findIndex(
            (post: any) => post._id === unlikedData.parentID
          );
          if (postIndex !== -1) {
            state.postReplies.replies[postIndex].isLiked = false;
            state.postReplies.replies[postIndex].likesCount -= 1;
            state.postReplies.replies[postIndex].likeID = unlikedData.likeID;
          }
        }

        if (state.userPostsList !== null) {
          const postIndex = state.userPostsList.posts.findIndex(
            (post: any) => post._id === unlikedData.parentID
          );
          if (postIndex !== -1) {
            state.userPostsList.posts[postIndex].isLiked = false;
            state.userPostsList.posts[postIndex].likesCount -= 1;
            state.userPostsList.posts[postIndex].likeID = unlikedData.likeID;
          }
        }

        if (state.userRepliesList !== null) {
          const postIndex = state.userRepliesList.posts.findIndex(
            (post: any) => post._id === unlikedData.parentID
          );
          if (postIndex !== -1) {
            state.userRepliesList.posts[postIndex].isLiked = false;
            state.userRepliesList.posts[postIndex].likesCount -= 1;
            state.userRepliesList.posts[postIndex].likeID = unlikedData.likeID;
          }
        }

        if (state.userRepostsList !== null) {
          const postIndex = state.userRepostsList.posts.findIndex(
            (post: any) => post._id === unlikedData.parentID
          );
          if (postIndex !== -1) {
            state.userRepostsList.posts[postIndex].isLiked = false;
            state.userRepostsList.posts[postIndex].likesCount -= 1;
            state.userRepostsList.posts[postIndex].likeID = unlikedData.likeID;
          }
        }

        if (state.userLikesList !== null) {
          const postIndex = state.userLikesList.posts.findIndex(
            (post: any) => post._id === unlikedData.parentID
          );
          if (postIndex !== -1) {
            state.userLikesList.posts[postIndex].isLiked = false;
            state.userLikesList.posts[postIndex].likesCount -= 1;
            state.userLikesList.posts[postIndex].likeID = unlikedData.likeID;
          }

          const userID = localStorage.getItem("userID");
          if (
            userID === unlikedData.authorID &&
            state.userDetails?._id === userID
          ) {
            state.userLikesList.posts = state.userLikesList.posts.filter(
              (like: any) => like._id !== unlikedData.parentID
            );
          }
        }
      })

      .addCase(createReply.fulfilled, (state, action) => {
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
            state.postReplies.replies = state.postReplies.replies
              ? [...state.postReplies.replies, newReply]
              : [newReply];
          }
        }
        if (state.postReplies !== null) {
          const replyIndex: number = state.postReplies.replies.findIndex(
            (reply: any) => {
              return reply._id === newReply.parentPostID;
            }
          );

          if (replyIndex !== -1) {
            state.postReplies.replies[replyIndex].repliesCount += 1;
          }
        }

        if (state.userPostsList !== null) {
          const postIndex = state.userPostsList.posts.findIndex(
            (post: PostsDataProps) => post._id === newReply.parentPostID
          );
          if (postIndex !== -1) {
            state.userPostsList.posts[postIndex].repliesCount += 1;
          }
        }

        if (state.userRepliesList !== null) {
          const replyIndex: number = state.userRepliesList.posts.findIndex(
            (reply: any) => {
              return reply._id === newReply.parentPostID;
            }
          );

          if (replyIndex !== -1) {
            state.userRepliesList[replyIndex].repliesCount += 1;
            state.userRepliesList.posts = [...state.userRepliesList, newReply];
          }
        }

        if (state.userRepostsList !== null) {
          const postIndex = state.userRepostsList.posts.findIndex(
            (post: PostsDataProps) => post._id === newReply.parentPostID
          );
          if (postIndex !== -1) {
            state.userRepostsList.posts[postIndex].repliesCount += 1;
          }
        }
      })
      .addCase(updateReply.fulfilled, (state, action) => {
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
            const replyIndex = state.postReplies.replies.findIndex(
              (reply: any) => reply._id === updatedReply._id
            );
            state.postReplies.replies[replyIndex].repliesCount += 1;
          }

          if (state.postDetails !== null) {
            if (state.postDetails._id === updatedReply._id) {
              state.postDetails = { ...state.postDetails, ...updatedReply };
            }
          }

          if (state.userRepliesList !== null) {
            const postIndex = state.userRepliesList.posts.findIndex(
              (post: any) => post._id === updatedReply._id
            );
            if (postIndex !== -1) {
              state.userRepliesList.posts[postIndex] = {
                ...state.userRepliesList.posts[postIndex],
                ...updatedReply,
              };
            }
          }
        }
      })
      .addCase(deleteReply.fulfilled, (state, action) => {
        const deletedReplyID = action.payload;

        if (state.PostData !== null) {
          const parentIndex = state.PostData.findIndex(
            (post: any) => post._id === deletedReplyID.parentPostID
          );

          state.PostData = state.PostData.filter(
            (reply) => reply._id !== deletedReplyID.postID
          );
          if (parentIndex !== -1) {
            state.PostData[parentIndex].repliesCount -= 1;
          }
        }
        if (state.postDetails !== null) {
          if (state.postReplies !== null) {
            state.postReplies.replies = state.postReplies.replies.filter(
              (reply: any) => reply._id !== deletedReplyID.postID
            );
            state.postDetails.repliesCount -= 1;
          }
          if (state.postDetails._id === deletedReplyID.postID) {
            state.postDetails = null;
          }
        }

        if (state.postReplies !== null) {
          state.postReplies.replies = state.postReplies.replies.filter(
            (reply: ReplyDataProps) => reply._id !== deletedReplyID.postID
          );
        }

        if (state.userPostsList !== null) {
          const postIndex = state.userPostsList.posts.findIndex(
            (post: PostsDataProps) => post._id === deletedReplyID.postID
          );

          if (postIndex !== -1) {
            state.userPostsList.posts[postIndex].repliesCount -= 1;
          }
        }

        if (state.userRepliesList !== null) {
          const postIndex = state.userRepliesList.posts.findIndex(
            (post: PostsDataProps) => post._id === deletedReplyID.postID
          );

          if (postIndex !== -1) {
            state.userRepliesList.posts[postIndex].repliesCount -= 1;
          }

          state.userRepliesList.posts = state.userRepliesList.posts.filter(
            (reply: ReplyDataProps) => reply._id !== deletedReplyID.postID
          );
        }

        if (state.userRepostsList !== null) {
          const postIndex = state.userRepostsList.posts.findIndex(
            (post: PostsDataProps) => post._id === deletedReplyID.postID
          );

          if (postIndex !== -1) {
            state.userRepostsList.posts[postIndex].repliesCount -= 1;
          }
        }
      })

      .addCase(createRepost.fulfilled, (state, action) => {
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
          const postIndex = state.userPostsList.posts.findIndex(
            (post: PostsDataProps) => post._id === newRepost.parentPostID
          );
          if (postIndex !== -1) {
            state.userPostsList.posts[postIndex].repostsCount += 1;
          }
        }

        if (state.userRepliesList !== null) {
          const postIndex = state.userRepliesList.posts.findIndex(
            (post: PostsDataProps) => post._id === newRepost.parentPostID
          );
          if (postIndex !== -1) {
            state.userRepliesList.posts[postIndex].repostsCount += 1;
          }
        }

        if (state.userRepostsList !== null) {
          const postIndex = state.userRepostsList.posts.findIndex(
            (post: PostsDataProps) => post._id === newRepost.parentPostID
          );
          if (postIndex !== -1) {
            state.userRepostsList.posts[postIndex].repostsCount += 1;
          } else {
            state.userRepostsList.posts = [
              ...state.userRepostsList,
              ...newRepost,
            ];
          }
        }
      })

      .addCase(updateRepost.fulfilled, (state, action) => {
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
          const postIndex = state.userRepostsList.posts.findIndex(
            (repost: RepostDataProps) => repost._id === updatedRepost._id
          );
          if (postIndex !== -1) {
            state.userRepostsList.posts[postIndex] = {
              ...state.userRepostsList,
              ...updatedRepost,
            };
          }
        }
      })

      .addCase(deleteRepost.fulfilled, (state, action) => {
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
          state.userRepostsList.posts = state.userRepostsList.filter(
            (repost: RepostDataProps) => repost._id !== deletedRepostID.postID
          );
        }
      })

      .addCase(getPostDetails.fulfilled, (state, action) => {
        state.postDetails = action.payload;
      })

      .addCase(getAllRepliesByPostID.fulfilled, (state, action) => {
        const replies = action.payload;

        state.postReplies = replies;
      })
      .addCase(getReplyDetails.fulfilled, (state, action) => {
        state.postDetails = action.payload;
      })
      .addCase(getRepostDetails.fulfilled, (state, action) => {
        state.postDetails = action.payload;
      })
      .addCase(getAllPostsByUser.fulfilled, (state, action) => {
        const allPosts = action.payload;

        state.userPostsList = allPosts;
      })
      .addCase(getUserDetails.fulfilled, (state, action) => {
        const userDetails = action.payload;

        state.userDetails = userDetails;
      })
      .addCase(getAllRepliesByUser.fulfilled, (state, action) => {
        const allPosts = action.payload;

        state.userRepliesList = allPosts;
      })
      .addCase(getAllRepostsByUser.fulfilled, (state, action) => {
        const allPosts = action.payload;

        state.userRepostsList = allPosts;
      })
      .addCase(follow.fulfilled, (state, action) => {
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
          const replyIndex = state.postReplies.replies.findIndex(
            (reply: ReplyDataProps) =>
              reply.authorID === followResponse.followingID
          );
          if (replyIndex !== -1) {
            state.postReplies.replies[replyIndex].isFollowedAuthor = true;
            state.postReplies.replies[replyIndex].followID =
              followResponse.followID;
          }
        }

        if (state.userDetails !== null) {
          if (state.userDetails._id === followResponse.followingID) {
            state.userDetails.isFollowedUser = true;
            state.userDetails.followID = null;
          }

          if (state.userFollowers !== null) {
            const followerIndex = state.userFollowers.userFollowers.findIndex(
              (follower: any) => follower._id === followResponse.followingID
            );

            const userID = localStorage.getItem("userID");
            if (state.userDetails._id === userID) {
              state.userFollowing = state.userFollowers.userFollowers.filter(
                (follower: any) => follower._id !== followResponse.followingID
              );
            } else {
              state.userFollowers.userFollowers[followerIndex].isUserFollowed =
                true;
              state.userFollowers.userFollowers[followerIndex].followID =
                followResponse.followID;
            }
          }

          if (state.userFollowing !== null) {
            const followerIndex = state.userFollowing.userFollowing.findIndex(
              (follower: any) => follower._id === followResponse.followingID
            );

            const userID = localStorage.getItem("userID");
            if (state.userDetails._id === userID) {
              state.userFollowing = state.userFollowing.userFollowing.filter(
                (follower: any) => follower._id !== followResponse.followingID
              );
            } else {
              state.userFollowing.userFollowing[followerIndex].isUserFollowed =
                true;
              state.userFollowing.userFollowing[followerIndex].followID =
                followResponse.followID;
            }
          }
        }

        if (state.userPostsList !== null) {
          const postIndex = state.userPostsList.posts.findIndex(
            (post: any) => post.authorID === followResponse.followingID
          );

          if (postIndex !== -1) {
            state.userPostsList.posts[postIndex].followID =
              followResponse.followID;
            state.userPostsList.posts[postIndex].isFollowedAuthor = true;
          }
        }

        if (state.userRepliesList !== null) {
          const postIndex = state.userRepliesList.posts.findIndex(
            (post: any) => post.authorID === followResponse.followingID
          );

          if (postIndex !== -1) {
            state.userRepliesList.posts[postIndex].followID =
              followResponse.followID;
            state.userRepliesList.posts[postIndex].isFollowedAuthor = true;
          }
        }

        if (state.userRepostsList !== null) {
          const postIndex = state.userRepostsList.posts.findIndex(
            (post: any) => post.authorID === followResponse.followingID
          );

          if (postIndex !== -1) {
            state.userRepostsList.posts[postIndex].followID =
              followResponse.followID;
            state.userRepostsList.posts[postIndex].isFollowedAuthor = true;
          }
        }

        if (state.userLikesList !== null) {
          const postIndex = state.userLikesList.posts.findIndex(
            (post: any) => post.authorID === followResponse.followingID
          );

          if (postIndex !== -1) {
            state.userLikesList.posts[postIndex].followID =
              followResponse.followID;
            state.userLikesList.posts[postIndex].isFollowedAuthor = true;
          }
        }
      })
      .addCase(unfollow.fulfilled, (state, action) => {
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
          const replyIndex = state.postReplies.replies.findIndex(
            (reply: ReplyDataProps) =>
              reply.authorID === unfollowResponse.followingID
          );
          if (replyIndex !== -1) {
            state.postReplies.replies[replyIndex].isFollowedAuthor = false;
            state.postReplies.replies[replyIndex].followID = null;
          }
        }

        if (state.userDetails !== null) {
          if (state.userDetails._id === unfollowResponse.followingID) {
            state.userDetails.isFollowedUser = false;
            state.userDetails.followID = null;
          }

          if (state.userFollowers !== null) {
            const followerIndex = state.userFollowers.userFollowers.findIndex(
              (follower: any) => follower._id === unfollowResponse.followingID
            );

            const userID = localStorage.getItem("userID");
            if (state.userDetails._id === userID) {
              state.userFollowing = state.userFollowers.userFollowers.filter(
                (follower: any) => follower._id !== unfollowResponse.followingID
              );
            } else {
              state.userFollowers.userFollowers[followerIndex].isUserFollowed =
                false;
              state.userFollowers.userFollowers[followerIndex].followID =
                unfollowResponse.followID;
            }
          }

          if (state.userFollowing !== null) {
            const followerIndex = state.userFollowing.userFollowing.findIndex(
              (follower: any) => follower._id === unfollowResponse.followingID
            );

            const userID = localStorage.getItem("userID");
            if (state.userDetails._id === userID) {
              state.userFollowing = state.userFollowing.userFollowing.filter(
                (follower: any) => follower._id !== unfollowResponse.followingID
              );
            } else {
              state.userFollowing.userFollowing[followerIndex].isUserFollowed =
                false;
              state.userFollowing.userFollowing[followerIndex].followID =
                unfollowResponse.followID;
            }
          }
        }

        if (state.userPostsList !== null) {
          const postIndex = state.userPostsList.posts.findIndex(
            (post: any) => post.authorID === unfollowResponse.followingID
          );

          if (postIndex !== -1) {
            state.userPostsList.posts[postIndex].followID = null;
            state.userPostsList.posts[postIndex].isFollowedAuthor = false;
          }
        }

        if (state.userRepliesList !== null) {
          const postIndex = state.userRepliesList.posts.findIndex(
            (post: any) => post.authorID === unfollowResponse.followingID
          );

          if (postIndex !== -1) {
            state.userRepliesList.posts[postIndex].followID = null;
            state.userRepliesList.posts[postIndex].isFollowedAuthor = false;
          }
        }

        if (state.userRepostsList !== null) {
          const postIndex = state.userRepostsList.posts.findIndex(
            (post: any) => post.authorID === unfollowResponse.followingID
          );

          if (postIndex !== -1) {
            state.userRepostsList.posts[postIndex].followID = null;
            state.userRepostsList.posts[postIndex].isFollowedAuthor = false;
          }
        }

        if (state.userLikesList !== null) {
          const postIndex = state.userLikesList.posts.findIndex(
            (post: any) => post.authorID === unfollowResponse.followingID
          );

          if (postIndex !== -1) {
            state.userLikesList.posts[postIndex].followID = null;
            state.userLikesList.posts[postIndex].isFollowedAuthor = false;
          }
        }
      })
      .addCase(getAllLikesByUser.fulfilled, (state, action) => {
        const allLikes = action.payload;
        state.userLikesList = allLikes;
      })

      .addCase(getUserFollowing.fulfilled, (state, action) => {
        state.userFollowing = action.payload;
      })

      .addCase(getUserFollowers.fulfilled, (state, action) => {
        state.userFollowers = action.payload;
      })

      .addCase(createNewPollResponse.fulfilled, (state, action) => {
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
      })
      .addCase(deleteUserPosts.fulfilled, (state, action) => {
        const response = action.payload;
        if (state.PostData !== null) {
          state.PostData = state.PostData.filter(
            (post) => post.authorID !== response.userID
          );
        }
      });
  },
});

export const {
  getLastConversation,
  resetUserDetails,
  resetAllPostsList,
  resetPostsState,
} = postSlice.actions;
export default postSlice.reducer;

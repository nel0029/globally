import { POSTACTIONS } from "../actions/POSTACTIONS"
import { PostCommentsProps, PostsDataProps, PostLikesProps } from "../types/PostTypes"


export const PostReducer = (postState: PostsDataProps[], postAction: any) => {

    switch (postAction.type) {
        case POSTACTIONS.POSTLIKE:
            const postIDLike = postAction.payload.postID; //postID for like
            const newLike = postAction.payload.newLike;
            return postState.map((post: PostsDataProps) => {
                if (post.postID == postIDLike) {
                    const postLikes = [...post.postLikes]
                    const index = post.postLikes.findIndex((indx: any) => indx.userID == postAction.payload.newLike.userID);

                    if (index !== -1) {
                        // If it exists, remove it from the postLikes array
                        postLikes.splice(index, 1)

                    } else {
                        // If it doesn't exist, add it to the postLikes array
                        postLikes.push(newLike)
                    }

                    return {
                        ...post,
                        postLikes: postLikes
                    };
                } else {
                    return post
                }
            });

        case POSTACTIONS.POSTCOMMENT:
            const commentPostID = postAction.payload.postID //postID for comment
            const newComment = postAction.payload.newComment
            return postState.map((post: PostsDataProps) => {
                const postComments = [...post.postComments]
                if (post.postID == commentPostID) {
                    postComments.push(newComment);
                    return {
                        ...post,
                        postComments: postComments
                    };
                } else {
                    return post
                }
            });

        case POSTACTIONS.COMMENTREPLY:
            const replyCommentID = postAction.payload.commentID;
            const newReply = postAction.payload.newReply;

            // Define a recursive helper function to update the comment replies
            const updateCommentReplies = (comments: PostCommentsProps[]): PostCommentsProps[] => {
                return comments.map((comment: PostCommentsProps) => {
                    if (comment.commentID === replyCommentID) {
                        // If the commentID matches, update the comment with the new reply
                        const commentReplies = [...comment.commentReplies];
                        commentReplies.push(newReply);
                        return {
                            ...comment,
                            commentReplies: updateCommentReplies(commentReplies) // Recursively update nested replies
                        };
                    } else if (comment.commentReplies.length > 0) {
                        // If the comment has nested replies, recursively update them
                        return {
                            ...comment,
                            commentReplies: updateCommentReplies(comment.commentReplies)
                        };
                    } else {
                        return comment;
                    }
                });
            };

            return postState.map((post: PostsDataProps) => {
                const postComments = [...post.postComments];
                // Update the comments with the recursive helper function
                const updatedComments = updateCommentReplies(postComments);
                // Update the post with the updated comments
                return {
                    ...post,
                    postComments: updatedComments
                };
            });

        case POSTACTIONS.COMMENTLIKE:
            const likeCommentID = postAction.payload.commentID;
            const newCommentLike = postAction.payload.newCommentLike;

            console.log(likeCommentID)


            const updateCommentLikes = (comments: PostCommentsProps[]): PostCommentsProps[] => {
                return comments.map((comment: PostCommentsProps) => {
                    if (comment.commentID == likeCommentID) {
                        const commentLikes: PostLikesProps[] = [...comment.commentLikes]
                        const likerIndex = commentLikes.findIndex((index: any) => index.userID == newCommentLike.userID);
                        console.log(likerIndex)
                        if (likerIndex == -1) {
                            commentLikes.push(newCommentLike)
                        } else {
                            commentLikes.splice(likerIndex, 1)
                        }
                        return {
                            ...comment,
                            commentLikes: commentLikes
                        }
                    } else if (comment.commentReplies.length > 0) {
                        return {
                            ...comment,
                            commentReplies: updateCommentLikes(comment.commentReplies)
                        };
                    } else {
                        return comment
                    }
                });
            }

            return postState.map((post: PostsDataProps) => {
                const postComments = [...post.postComments];
                // Update the comments with the recursive helper function
                const updatedComments = updateCommentLikes(postComments);
                // Update the post with the updated comments
                return {
                    ...post,
                    postComments: updatedComments
                };
            });

        default:
            return postState

    }
}


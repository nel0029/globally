import React, { useContext, useState } from 'react'
import IonIcon from '@reacticons/ionicons';
import { UserContext } from '../../../context/UserContext';
import Comment from './Comment';
import { PostCommentsProps, PostLikesProps, PostsDataProps } from '../../../types/PostTypes';
import { PostsContext } from '../../../context/PostsContext';
import { POSTACTIONS } from '../../../actions/POSTACTIONS';

interface CommentProps {
    post: PostsDataProps,
    comments: boolean,
    openComments: () => void;
}

const PostInteractions: React.FC<CommentProps> = ({ post, comments, openComments }) => {

    const user = useContext(UserContext)

    const { postState, dispatch } = useContext(PostsContext)

    const [commentBox, setCommentBox] = useState(false)
    const [like, setLike] = useState(Boolean)

    const [commentBody, setCommentBody] = useState("")



    const likeButton = () => {
        const like: PostLikesProps = { ...user, like: true, dateLiked: "April 23, 2023" }

        dispatch({
            type: POSTACTIONS.POSTLIKE,
            payload: {
                postID: post.postID,
                newLike: like,
                userID: user.userID
            }
        })
    }


    const onComment = (event: any) => {

        const id: number = Math.ceil(Math.random() * 1000000000)
        const newComment: PostCommentsProps = {
            commentID: id,
            commentAuthorUserID: user.userID,
            avatarUrl: user.avatarUrl,
            commentAuthorFirstName: user.userFirstName,
            commentAuthorMiddleName: user.userMiddleName,
            commentAuthorLastName: user.userLastName,
            commentCaption: commentBody,
            commentImgUrls: [],
            commentDateAndTime: "April 25, 2023",
            commentLikes: [],
            commentReplies: []
        }
        dispatch({
            type: POSTACTIONS.POSTCOMMENT,
            payload: {
                postID: post.postID,
                newComment: newComment
            }
        })
        event.preventDefault()
        setCommentBody("")
    }

    return (
        <div className='w-full transition-all ease-in duration-1000 z-10 '>
            <div className='text-xl flex flex-row w-full py-1 border-y border-gray-300'>
                <div
                    onClick={likeButton}
                    className={`post_interactions hover:text-primary
                    ${post.postLikes.findIndex((userIndex: PostLikesProps) => userIndex.userID === user.userID) == -1 ? "text-black" : "text-primary"} `}>
                    <IonIcon name={`${post.postLikes.findIndex((userIndex: PostLikesProps) => userIndex.userID === user.userID) == - 1 ? "heart-outline" : "heart"}`} ></IonIcon>
                    <h5 className="post_interactions_numbers">
                        {post.postLikes.length}
                    </h5>
                </div>
                <div
                    onClick={() => setCommentBox(!commentBox)}
                    className="post_interactions hover:text-secondary1">
                    <IonIcon name="chatbox-outline" ></IonIcon>
                    <h5 className="post_interactions_numbers">
                        {post.postComments.length}
                    </h5>
                </div>
                <div className="post_interactions hover:text-secondary">
                    <IonIcon name="arrow-redo-outline" ></IonIcon>
                    <h5 className="post_interactions_numbers">
                        {post.postReposts.length > 0 ? post.postReposts.length : ""}
                    </h5>
                </div>

            </div>



            {commentBox ? (<div className='w-full flex flex-row justify-center items-center py-2'>
                <form
                    onSubmit={onComment}
                    className='w-full flex flex-row border border-gray-400 rounded-lg p-1'>
                    <input
                        value={commentBody}
                        onChange={(event: any) => setCommentBody(event.target.value)}
                        className='flex-grow p-1'
                        placeholder='Type your comment...' />
                    <button
                        className='flex justify-center items-center p-1 rounded-lg text-2xl text-secondary'>
                        <IonIcon name='send'></IonIcon>
                    </button>
                </form>
            </div>) : (<div />)}

        </div>

    )
}


export default PostInteractions
import React, { useContext, useState } from 'react'
import IonIcon from '@reacticons/ionicons';
import { UserContext } from '../../../context/UserContext';
import Comment from './Comment';
import { PostCommentsProps, PostLikesProps, PostsDataProps } from '../../../types/PostTypes';
import { PostsContext } from '../../../context/PostsContext';
import { POSTACTIONS } from '../../../actions/POSTACTIONS';


interface CommentProps {
    comment: PostCommentsProps,
    replyBox: boolean,
    openReplyBox: () => void;
}

const CommentInteractions: React.FC<CommentProps> = ({ comment, replyBox, openReplyBox }) => {

    const user = useContext(UserContext)


    const { postState, dispatch } = useContext(PostsContext)



    const likeButton = () => {
        const like: PostLikesProps = { ...user, like: true, dateLiked: "April 23, 2023" }

        dispatch({
            type: POSTACTIONS.COMMENTLIKE,
            payload: {
                commentID: comment.commentID,
                newCommentLike: like,
                userID: user.userID
            }
        })
    }




    return (
        <div className=' flex-grow transition-all ease-in duration-1000'>
            <div className='text-xl flex-grow flex flex-row py-1 gap-x-1'>
                <div
                    onClick={likeButton}
                    className={`flex justify-center items-center rounded-lg cursor-pointer hover:text-primary gap-x-1 
                    ${comment.commentLikes.findIndex((userIndex: PostLikesProps) => userIndex.userID === user.userID) == -1 ? "text-black" : "text-primary"} `}>
                    <IonIcon name={`${comment.commentLikes.findIndex((userIndex: PostLikesProps) => userIndex.userID === user.userID) == - 1 ? "heart-outline" : "heart"}`} ></IonIcon>
                    <p className="text-base font-semibold flex justify-center items-center">
                        {comment.commentLikes.length > 0 ? comment.commentLikes.length > 1 ? `${comment.commentLikes.length} Likes` : `${comment.commentLikes.length} Like` : 'Like'}
                    </p>
                </div>
                <div
                    onClick={() => openReplyBox()}
                    className={`flex justify-center items-center rounded-lg cursor-pointer hover:text-secondary1 ${replyBox ? 'text-secondary1' : ''}`} >

                    <IonIcon name={`${replyBox ? "chatbox" : "chatbox-outline"}`} />
                    <h5 className="text-base font-semibold flex justify-center items-center ml-1">
                        Reply
                    </h5>
                </div>

            </div>

        </div>

    )
}


export default CommentInteractions
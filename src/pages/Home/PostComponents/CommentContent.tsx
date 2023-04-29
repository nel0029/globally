import React, { useState, useContext } from 'react'
import Carousel from '../../../common/Carousel';
import { useNavigate, NavLink } from 'react-router-dom';
import { PostsDataProps, PostCommentsProps } from '../../../types/PostTypes';
import { PostContext } from '../../../context/PostContext';
import CommentInteractions from './CommentInteractions';
import CommentInput from './CommentInput';
import RepliesContext from '../../../context/CommentsContext';

interface CommentProps {
    comment: PostCommentsProps,
    replyBox: boolean,
    openReplyBox: () => void;
}

const CommentContent: React.FC<CommentProps> = ({ comment, replyBox, openReplyBox }) => {
    const { postState, dispatch } = useContext(PostContext)
    const { replies, setReplies } = useContext(RepliesContext)
    return (
        <div className='flex-grow ' >
            <div className='flex-grow'>
                <p className='py-2 leading-5 text-base'>
                    {comment.commentCaption}
                </p>
                <div className='px-2'>
                    <img
                        className='flex-grow h-auto rounded-lg'
                        src={comment.commentImgUrls[0]} />
                </div>
            </div>

            <CommentInteractions replyBox={replyBox} openReplyBox={openReplyBox} comment={comment} />



        </div >
    )
}


export default CommentContent
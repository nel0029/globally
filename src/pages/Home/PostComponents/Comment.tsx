import React, { useState, useContext } from 'react'
import { PostContext } from '../../../context/PostContext';
import { UserContext } from '../../../context/UserContext';
import CommentInput from './CommentInput';
import Comments from './Comments'

export default function Comment({ comment }: any) {


    const [comments, setComments] = useState(comment.comments)
    //console.log(comments)


    console.log(comments)
    return (
        <div className='flex flex-col flex-1 my-1'>
            <div>
                <h3>{comments.commentAuthorName}</h3>
                <h4>{comments.commentCaption}</h4>
            </div>

        </div>
    )
}
import React from 'react'
import { NavLink } from 'react-router-dom'
import { PostCommentsProps } from '../../../types/PostTypes'

export default function CommentAvatar(comment: PostCommentsProps) {
    return (
        <div className='flex justify-center items-center w-[40px] h-[40px] '>
            <NavLink to={`/${comment.commentAuthorUserID}`}>
                <img className='w-full h-full rounded-full hover:ring-black hover:ring-2' src={comment.avatarUrl}></img>
            </NavLink>
        </div>
    )
}

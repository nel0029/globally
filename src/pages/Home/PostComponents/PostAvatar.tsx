import React from 'react'
import { NavLink } from 'react-router-dom'
import { PostsDataProps } from '../../../types/PostTypes'

export default function PostAvatar(post: PostsDataProps) {
    return (
        <div className='flex justify-center items-center w-[40px] xl:w-[50px]'>
            <NavLink to={`/${post.userName}`}>
                <img className='w-full h-auto rounded-full hover:ring-black hover:ring-2' src={post.avatarURL}></img>
            </NavLink>
        </div>
    )
}

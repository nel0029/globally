import React from 'react'
import { PostsDataProps } from '../../../types/PostTypes'

export default function PostCaption(post: PostsDataProps) {
    return (
        <p className='text-lg'>
            {post.postCaption}
        </p>
    )
}

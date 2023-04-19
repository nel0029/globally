import React from 'react'
import PostCard from './PostCard'

export default function PostComments({ post }: any) {


    return (
        <div>
            {post.map((post: any, index: any) => (
                <PostCard
                    key={post.postID}
                    post={post.postComments} />
            ))}

        </div>
    )
}

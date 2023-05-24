import React from 'react'
import { PostsDataProps } from '../../../types/PostTypes'
import Comment from './Comment'
import { useContext } from 'react'
import RepliesContext from '../../../context/CommentsContext'


const PostComments = (post: PostsDataProps) => {

    const { replies, setReplies } = useContext(RepliesContext)
    return (
        <div className='w-full flex flex-grow flex-col gap-y-2 pt-2
        relative
        before:contents-[]
        before:absolute
        before:border-l-[3px]
        before:border-r-[0px]
        before:border-y-0
        before:mt-2
       before:border-solid
       before:border-light_gray
       before:left-[20px]
       before:w-[20px]
       before:h-[calc(100%-116px)]
       '>
            {/*{post.postComments.map(
                (comment: PostCommentsProps, index: any) => (
                    <Comment key={index} {...comment} />
                )
            )
            }*/}
        </div>
    )
}


export default PostComments
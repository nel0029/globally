import React, { useContext, useState } from 'react'
import { UserContext } from '../../../context/UserContext'
import Comment from './Comment'


interface PostProps {
    postAuthorName: string,
    postBody: string,
    comments: CommentProps[]
}

interface CommentProps {
    commentAuthorName: string,
    commentBody: string,
    replies: CommentProps[]
}
export default function Post(postObject: PostProps) {

    const user = useContext(UserContext)

    const [post, setPost] = useState(postObject)
    const [comments, setComments] = useState(post.comments)
    const [commentBody, setCommentBody] = useState("")

    const onComment = (event: any) => {
        const newComment: CommentProps = {
            commentAuthorName: `${user.userFirstName} ${user.userMiddleName} ${user.userLastName}`,
            commentBody: commentBody,
            replies: []
        }
        setComments((prev: any) => [...prev, newComment])
        setCommentBody("")
        event.preventDefault();
    }

    return (
        <div className='flex flex-col w-full bg-white rounded-lg gap-y-2 pb-2'>
            <div className='flex-1 border-y rounded-t-lg border-black p-2'>
                <h2>{post.postAuthorName}</h2>
                <h4>{post.postBody}</h4>
            </div>

            <form
                onSubmit={onComment}
                className=' w-full flex px-2' >
                <input
                    value={commentBody}
                    onChange={(event: any) => setCommentBody(event.target.value)}
                    className='flex-grow border border-black py-1 px-2 rounded-lg'
                    placeholder="Comment" >
                </input>
                <button
                    onClick={onComment}
                    className='border border-blue-500 py-1 px-2 rounded-lg' >
                    COMMENT
                </button>
            </form>

            <div className='flex flex-col flex-1 gap-y-1 bg-white'>
                {comments.map((comment: any, index: any) => (
                    <Comment
                        key={index}
                        {...comment} />
                ))}
            </div>

        </div>
    )
}

import React, { useState, useContext } from 'react'
import { UserContext } from '../../../context/UserContext'
import Comment from './Comment'
import Comments from './Comments'

export default function Post(post: any) {

    const user = useContext(UserContext)
    const [commentCaption, setCommentCaption] = useState("")
    const [comments, setComments] = useState(post.post.comments)
    //console.log(comments)
    const onComment = () => {
        const newComment = {
            commentAuthorName: `${user.userFirstName} ${user.userMiddleName} ${user.userLastName}`,
            postContent: commentCaption,
            comments: []
        }
        setComments((prev: any) => [newComment, ...prev])
        setCommentCaption("")
        console.log(comments)
    }

    return (
        <div className='w-full border border-red-700 flex flex-col px-1'>
            <div className='w-full border border-black flex flex-col'>
                <h3>{post.postAuthorName}</h3>
                <p>{post.postContent}</p>
            </div>
            <div className='w-full flex flex-row items-center justify-center'>
                <input
                    type='text'
                    className='flex-grow border border-black rounded-md my-1 py-3 px-1'
                    value={commentCaption}
                    onChange={(event: any) => setCommentCaption(event.target.value)} ></input>
                <button
                    className='rounded-full'
                    onClick={() => onComment()}
                >
                    Comment
                </button>
            </div>
            <div className='flex-1'>
                {comments.map((comment: any, index: any) => (
                    <Comment key={index}
                        comment={comment} />
                ))}
            </div>
        </div>
    )
}

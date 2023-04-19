import React, { useContext, useState } from 'react'
import { UserContext } from '../../../context/UserContext'

interface CommentInputProps {
    onComment: (newComment: any) => void
}

export default function CommentInput({ onComment }: CommentInputProps) {
    const [commentCaption, setCommentCaption] = useState('')
    const user = useContext(UserContext)
    return (
        <div className='w-full flex flex-row items-center justify-center'>
            <input
                type='text'
                className='flex-grow border border-black rounded-md my-1 py-3 px-1'
                value={commentCaption}
                onChange={(event: any) => setCommentCaption(event.target.value)} ></input>
            <button
                className='rounded-full'
                onClick={() => {
                    onComment({
                        commentAuthorName: `${user.userFirstName} ${user.userMiddleName} ${user.userLastName}`,
                        postCaption: commentCaption,
                        comments: []
                    });
                    setCommentCaption("")
                }}
            >
                Comment
            </button>
        </div>
    )
}

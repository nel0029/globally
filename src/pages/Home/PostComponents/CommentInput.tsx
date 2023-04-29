import { useState, useContext } from "react"
import React from 'react'
import { UserContext } from "../../../context/UserContext"
import { PostContext } from "../../../context/PostContext"
import { PostCommentsProps } from "../../../types/PostTypes"
import { POSTACTIONS } from "../../../actions/POSTACTIONS"
import IonIcon from "@reacticons/ionicons"
import RepliesContext from '../../../context/CommentsContext';
import CommentAvatar from "./CommentAvatar"


interface CommentProps {
    comment: PostCommentsProps,
    replyBox: boolean,
    openReplyBox: () => void,
    setReplies: (newVal: boolean) => void
}

const CommentInput: React.FC<CommentProps> = ({ comment, openReplyBox, replyBox, setReplies }) => {

    const user = useContext(UserContext)
    const { postState, dispatch } = useContext(PostContext)
    const [replyBody, setReplyBody] = useState("")


    const onReply = (event: any) => {
        setReplies(true)
        openReplyBox()
        const id: number = Math.ceil(Math.random() * 1000000000)
        const newReply: PostCommentsProps = {
            commentID: id,
            commentAuthorUserID: user.userID,
            avatarUrl: user.avatarUrl,
            commentAuthorFirstName: user.userFirstName,
            commentAuthorMiddleName: user.userMiddleName,
            commentAuthorLastName: user.userLastName,
            commentCaption: replyBody,
            commentImgUrls: [],
            commentDateAndTime: "April 25, 2023",
            commentLikes: [],
            commentReplies: []
        }
        //setReplies((prev: any) => [...prev, newReply])

        dispatch({
            type: POSTACTIONS.COMMENTREPLY,
            payload: {
                commentID: comment.commentID,
                newReply: newReply
            }
        })
        setReplyBody("")
        event.preventDefault()
    }

    return (
        <div className='flex-grow flex flex-row justify-center items-center gap-x-2 py-2'>
            <div className="flex justify-center items-center w-[40px] h-[40px] rounded-full">
                <img className="w-full h-full rounded-full" src={user.avatarUrl} />
            </div>

            <form
                onSubmit={onReply}
                className='flex-grow flex flex-row border border-gray-400 rounded-lg p-1'>
                <input
                    value={replyBody}
                    onChange={(event: any) => setReplyBody(event.target.value)}
                    className=' box-border p-1 w-full'
                    placeholder='Type your comment...' />
                <button
                    className='flex justify-center items-center p-1 rounded-lg text-2xl text-secondary'>
                    <IonIcon name='send'></IonIcon>
                </button>
            </form>
        </div>
    )
}


export default CommentInput
import React from 'react'
import { useSelector } from 'react-redux'

interface MessageBubbleProps {
    senderID?: string,
    text?: string,
    conversationID?: string,
    mediaURL?: string[],
    type?: string,
    mentions?: string[],
    createdAt: string
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ senderID, text, conversationID, mediaURL, type, mentions, createdAt }) => {

    const user = useSelector((state: any) => state.user.userData)

    const isUser = senderID === user.userID


    const dateAndTime = new Date(createdAt)
    const formattedDateAndTime = `${dateAndTime.toLocaleTimeString('en-us', {
        timeZone: 'Asia/Manila',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
    })} | ${dateAndTime.toLocaleDateString('en-us', {
        timeZone: 'Asia/Manila',
        month: '2-digit',
        day: '2-digit',
        year: 'numeric',
    })}`;

    return (
        <div
            className={`w-full flex ${isUser ? 'justify-end' : 'justify-start'}`}>
            <div className='w-3/4'>
                <div
                    className={`${isUser ? 'bg-secondary text-white' : ''}  p-2 rounded-xl border dark:border-Dark300`}>
                    {text}
                </div>
                <div className={` ${isUser ? 'justify-end' : 'justify-start'} flex text-xs text-gray-500 px-2`}> {formattedDateAndTime} </div>
            </div>
        </div>
    )
}

export default MessageBubble
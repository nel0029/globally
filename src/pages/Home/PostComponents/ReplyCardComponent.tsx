import React, { useState } from 'react'
import { ReplyDataProps } from '../../../types/PostTypes'
import { NavLink, useNavigate } from 'react-router-dom';
import IonIcon from '@reacticons/ionicons'
import ReplyCard from './ReplyCard';


const ReplyCardComponent = (reply: ReplyDataProps) => {

    const navigate = useNavigate()
    const route = () => {
        if (reply.parentType === "post") {
            return "posts"
        } else if (reply.parentType === "reply") {
            return "replies"
        } else if (reply.parentType === "repost") {
            return "reposts"
        } else {
            return ""
        }
    }
    const replyRoute = () => {
        if (reply.type === "post") {
            return "posts"
        } else if (reply.type === "reply") {
            return "replies"
        } else if (reply.type === "reply") {
            return "reposts"
        } else {
            return ""
        }
    }

    const handlePostDetail = (event: any) => {
        const { className } = event.target;

        if (
            className !== "avatar" &&
            className !== "main-content"
        ) {
            navigate(`/${reply.parentUserName}/${replyRoute()}/${reply._id}`);
        }
    };

    return (
        <div className='w-full flex flex-col  rounded-lg cursor-pointer bg-white dark:bg-Dark200' >
            <div className='flex-grow flex flex-row items-center text-xs md:text-sm whitespace-nowrap truncate gap-x-1 text-slate-500 p-1'>
                <span className='flex justify-center items-center text-secondary1'>
                    <IonIcon name="chatbox-outline" />
                </span>
                <NavLink
                    className='hover:underline cursor-pointer hover:text-secondary font-semibold'
                    to={`/${reply.postAuthorUserName}`}>
                    {reply.postAuthorUserName}
                </NavLink>

                <span> replied to </span>
                <NavLink
                    className=' hover:underline cursor-pointer hover:text-secondary font-semibold'
                    to={`/${reply.parentUserName}/${route()}/${reply.parentPostID}`}>
                    {reply.parentUserName}'s {reply.parentType}
                </NavLink>
            </div>
            <div onClick={handlePostDetail}>
                <ReplyCard border {...reply} />
            </div>
        </div>
    )
}

export default ReplyCardComponent
import React, { useState } from 'react'
import { ReplyDataProps } from '../../../types/PostTypes'
import ReplyHeader from './ReplyHeader';
import ReplyInteractions from './ReplyInteractions';
import CardMedia from './CardMedia';
import CardAvatar from './CardAvatar';
import CardCaption from './CardCaption';
import { useSelector } from 'react-redux';


interface ReplyCardProps extends ReplyDataProps {
    border?: boolean;
}

const ReplyCard: React.FC<ReplyCardProps> = ({ border, ...reply }) => {
    const user = useSelector((state: any) => state.user.userData)

    const authorized = (reply.authorID === user.userID)
    return (

        <div
            className={`w-full flex flex-col rounded-lg p-2 bg-white dark:bg-Dark200 ${border ? 'border dark:border-Dark300' : ''}`}>
            <div className='w-full flex flex-row gap-x-3'>
                <div>
                    <CardAvatar userName={reply.postAuthorUserName} avatarURL={reply.postAuthorAvatarURL.url} />
                </div>
                <div className='flex-shrink flex-1 overflow-x-hidden'>
                    <ReplyHeader authorized={authorized} reply={reply} />
                    <CardCaption {...reply} />
                    <CardMedia mediaURL={reply.mediaURL} />

                </div>
            </div>
            <ReplyInteractions {...reply} />
        </div>


    )
}

export default ReplyCard
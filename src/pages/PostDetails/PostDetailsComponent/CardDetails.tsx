import React from 'react'
import { useNavigate } from 'react-router'
import CardAvatar from '../../Home/PostComponents/CardAvatar'
import CardCaption from '../../Home/PostComponents/CardCaption'
import CardMedia from '../../Home/PostComponents/CardMedia'
import CardDetailsInteractions from './CardDetailsInteractions'
import CardDetailsHeader from './CardDetailsHeader'
import CardDetailsHeaderMenu from './CardDetailsHeaderMenu'


export interface CardDetailsProps {
    parentID?: string,
    parentType?: string,
    parentUserID?: string,
    parentUserName?: string,
    parentAuthorFirstName?: string,
    parentAuthorMiddleName?: string,
    parentAuthorLastName?: string,
    parentAvatarURL?: string,
    parentCaption?: string,
    parentMediaURL?: string[],
    parentLikesCount?: number,
    parentRepliesCount?: number,
    parentRepostCount?: number,
    type: string,
    _id: string,
    postAuthorAvatarURL: string,
    postAuthorFirstName: string,
    postAuthorMiddleName: string,
    postAuthorLastName: string,
    postAuthorUserName: string,
    authorID: string,
    createdAt: string,
    caption: string,
    mediaURL: string[],
    isLiked: boolean,
    likeID: string | null,
    likesCount: number,
    repliesCount: number,
    repostsCount: number,
    isFollowedAuthor: boolean,
    followID: string | null
}




const CardDetails = (details: CardDetailsProps) => {
    const navigate = useNavigate()
    const dateAndTime = new Date(details.createdAt)
    const formattedDateAndTime = `${dateAndTime.toLocaleTimeString('en-us', {
        timeZone: 'Asia/Manila',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
    })} • ${dateAndTime.toLocaleDateString('en-us', {
        timeZone: 'Asia/Manila',
        month: '2-digit',
        day: '2-digit',
        year: 'numeric',
    })}`;

    return (
        <div className='w-full flex flex-col p-2 bg-white dark:bg-Dark200 rounded-lg'>
            <div className='flex flex-col justify-center'>
                <div className='flex flex-row items-center gap-x-2' >
                    <div className='w-[40px]'>
                        <CardAvatar userName={details.postAuthorUserName} avatarURL={details.postAuthorAvatarURL} />
                    </div>
                    <div className='flex flex-row h-auto justify-center items-center py-1 w-full' >
                        <CardDetailsHeader
                            firstName={details.postAuthorFirstName}
                            middleName={details.postAuthorMiddleName}
                            lastName={details.postAuthorLastName}
                            userName={details.postAuthorUserName} />
                        <CardDetailsHeaderMenu
                            {...details}
                            updateAction={details.type}
                            deleteAction={details.type} />
                    </div>
                </div>
                <div className='w-full flex flex-col gap-y-2 py-2'>
                    <CardCaption caption={details.caption} />
                    {details.mediaURL.length > 0 ? (
                        <CardMedia mediaURL={details.mediaURL} />
                    ) : null}
                </div>
            </div>
            <div className='flex flex-col'>
                <div className='w-full flex flex-row gap-x-2 py-1 border-y dark:border-Dark400'>
                    <div className='flex items-center text-xs xl:text-sm text-gray-400'>
                        {formattedDateAndTime}
                    </div>
                    <div className='flex flex-row items-center flex-grow text-base gap-x-2'>
                        <div className='flex flex-row items-center gap-x-2'>
                            <span className='font-bold '>
                                {details.likesCount}
                            </span>
                            <span className=''>
                                Likes
                            </span>
                        </div>
                        <div className='flex flex-row items-center gap-x-2'>
                            <span className='font-bold '>
                                {details.repliesCount}
                            </span>
                            <span className=''>
                                Replies
                            </span>
                        </div>
                        <div className='flex flex-row items-center gap-x-2'>
                            <span className='font-bold '>
                                {details.repostsCount}
                            </span>
                            <span className=''>
                                Reposts
                            </span>
                        </div>
                    </div>
                </div>
                <CardDetailsInteractions  {...details} />
            </div>
        </div>
    )
}

export default CardDetails
import React from 'react'
import { NavLink } from 'react-router-dom'
import IonIcon from '@reacticons/ionicons'
import { useNavigate } from 'react-router-dom'
import CardAvatar from './CardAvatar'
import RepostParentCard from './RepostParentCard'
import CardCaption from './CardCaption'
import PostHeader from './PostHeader'
import ReplyHeader from './ReplyHeader'
import RepostHeader from './RepostHeader'
import PostInteractions from './PostInteractions'
import CardMedia from './CardMedia'
import { useSelector } from 'react-redux'
import CardInteractionsContainer from './CardInteractionsContainer'

export interface CardProps {
    parentPostID?: string,
    parentType?: string,
    parentAuthorID?: string,
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


const Card = (card: CardProps) => {
    const user = useSelector((state: any) => state.user.userData)
    const isReply = card.type === "reply"
    const isRepost = card.type === "repost"
    const authorized = (card.authorID === user.userID)
    const setCardHeader = (type: string) => {
        switch (type) {
            case "reply":
                return <ReplyHeader reply={card} authorized={authorized} />
            case "repost":
                return <RepostHeader repost={card} authorized={authorized} />
            default:
                return <PostHeader post={card} authorized={authorized} />
        }
    }
    const navigate = useNavigate()
    const route = () => {
        if (card.type === "post") {
            return "posts"
        } else if (card.type === "reply") {
            return "replies"
        } else if (card.type === "repost") {
            console.log("repost")
            return "reposts"

        } else {
            return ""
        }
    }
    const replyRoute = () => {
        if (card.parentType === "post") {
            return "posts"
        } else if (card.parentType === "reply") {
            return "replies"
        } else if (card.parentType === "repost") {
            console.log("repost")
            return "reposts"

        } else {
            return ""
        }
    }


    const handlePostDetail = (event: any) => {

        navigate(`/${card.postAuthorUserName}/${route()}/${card._id}`);
        event.stopPropagation()

    };




    return (
        <div className='w-full flex flex-col rounded-lg cursor-pointer border dark:border-Dark300 bg-white dark:bg-Dark200 ' >
            {isReply && <div className='flex-grow flex flex-row items-center text-xs md:text-sm whitespace-nowrap truncate gap-x-1 text-slate-500 p-1'>
                <span className='flex justify-center items-center text-secondary1'>
                    <IonIcon name="chatbox-outline" />
                </span>
                <NavLink
                    className='hover:underline cursor-pointer hover:text-secondary font-semibold'
                    to={`/${card.postAuthorUserName}`}>
                    {card.postAuthorUserName}
                </NavLink>

                <span> replied to </span>
                <NavLink
                    className=' hover:underline cursor-pointer hover:text-secondary font-semibold'
                    to={`/${card.parentUserName}/${replyRoute()}/${card.parentPostID}`}>
                    {card.parentUserName}'s {card.parentType}
                </NavLink>
            </div>}

            <div
                onClick={handlePostDetail}
                className='w-full flex flex-col justify-center items-center rounded-lg p-2 cursor-pointer'>
                <div className='w-full flex flex-row justify-center items-start gap-x-3'>
                    <div className='p-2'>
                        <CardAvatar userName={card.postAuthorUserName} avatarURL={card.postAuthorAvatarURL} />
                    </div>
                    <div className='flex-shrink flex-1 max-w-[calc(100%-58px)]'>

                        {setCardHeader(card.type)}
                        <CardCaption caption={card.caption} />
                        <CardMedia mediaURL={card.mediaURL} />
                        {isRepost && <RepostParentCard
                            parentUserName={card.parentUserName}
                            parentAuthorAvatarURL={card.parentAvatarURL}
                            parentAuthorFirstName={card.parentAuthorFirstName}
                            parentAuthorMiddleName={card.parentAuthorMiddleName}
                            parentAuthorLastName={card.parentAuthorLastName}
                            parentCaption={card.parentCaption}
                            parentMediaURL={card.parentMediaURL}
                            parentType={card.parentType}
                            parentPostID={card.parentPostID} />}

                    </div>
                </div>
                <CardInteractionsContainer {...card} />
            </div>

        </div>
    )
}

export default Card
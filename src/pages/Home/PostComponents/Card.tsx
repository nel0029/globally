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
import PollOptionsCard from './PollOptionsCard'


interface OptionProps {
    _id?: string,
    body?: string,
    count?: number
}

interface MediaProps {
    id: string,
    url: string
}
export interface CardProps {
    parentPostID?: string,
    parentType?: string,
    parentAuthorID?: string,
    parentUserName?: string,
    parentAuthorFirstName?: string,
    parentAuthorMiddleName?: string,
    parentAuthorLastName?: string,
    parentAvatarURL?: MediaProps,
    parentCaption?: string,
    parentMediaURL?: MediaProps[],
    parentLikesCount?: number,
    parentRepliesCount?: number,
    parentRepostCount?: number,
    type: string,
    _id: string,
    postAuthorAvatarURL: MediaProps,
    postAuthorFirstName: string,
    postAuthorMiddleName: string,
    postAuthorLastName: string,
    postAuthorUserName: string,
    authorID: string,
    createdAt: string,
    caption: string,
    mediaURL: MediaProps[],
    isLiked: boolean,
    likeID: string | null,
    likesCount: number,
    repliesCount: number,
    repostsCount: number,
    isFollowedAuthor: boolean,
    followID: string | null
    hasPoll?: boolean,
    pollOptions?: OptionProps[],
    hasChoosed?: boolean,
    optionChoosedID?: string
    pollRespondentsCount?: number,
}

interface MainCardProps extends CardProps {
    isInHomeRoute?: boolean
}


const Card = (card: MainCardProps) => {
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
        <div className='w-full max-w-[700px] flex flex-col rounded-lg cursor-pointer border dark:border-Dark300 bg-white dark:bg-Dark200 ' >
            {card.isInHomeRoute && (
                isReply && <div className='flex-grow flex flex-row items-center text-xs md:text-sm whitespace-nowrap truncate gap-x-1 text-slate-500 p-1'>
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
                </div>
            )}

            <div
                onClick={handlePostDetail}
                className='w-full flex flex-col justify-center items-center rounded-lg p-2 cursor-pointer'>
                <div className='w-full flex flex-row justify-center items-start gap-x-3'>
                    <div className='p-2'>
                        <CardAvatar userName={card.postAuthorUserName} avatarURL={card.postAuthorAvatarURL.url} />
                    </div>
                    <div className='max-w-full flex-shrink flex-grow flex flex-col gap-y-1 pb-2'>

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
                        {card.hasPoll && (
                            <PollOptionsCard
                                postID={card._id}
                                options={card.pollOptions}
                                hasChoosed={card.hasChoosed}
                                pollRespondentsCount={card.pollRespondentsCount}
                                optionChoosedID={card.optionChoosedID} />)}
                    </div>
                </div>
                <CardInteractionsContainer {...card} />
            </div>

        </div>
    )
}

export default Card
import React from 'react'
import CardAvatar from './CardAvatar'
import CardCaption from './CardCaption'
import CardMedia from './CardMedia'
import { useNavigate } from 'react-router-dom'

interface RepostParentCardProps {
    parentUserName?: string
    parentAuthorAvatarURL?: string
    parentAuthorFirstName?: string
    parentAuthorMiddleName?: string
    parentAuthorLastName?: string
    parentCaption?: string
    parentMediaURL?: string[]
    parentType?: string
    parentPostID?: string
}


const RepostParentCard: React.FC<RepostParentCardProps> = ({
    parentUserName,
    parentAuthorAvatarURL,
    parentAuthorFirstName,
    parentAuthorMiddleName,
    parentAuthorLastName,
    parentCaption,
    parentMediaURL,
    parentType,
    parentPostID
}) => {

    const navigate = useNavigate()
    const route = () => {
        if (parentType === "post") {
            return "posts"
        } else if (parentType === "reply") {
            return "replies"
        } else if (parentType === "repost") {
            return "reposts"
        } else {
            return ""
        }
    }
    const goToParentPost = (event: any) => {
        navigate(`/${parentUserName}/${route()}/${parentPostID}`)
        event.stopPropagation()
    }

    const userProfile = (event: any) => {
        navigate(`/${parentUserName}`)
        event.stopPropagation()
    }
    return (
        <div
            onClick={goToParentPost}
            className='w-full rounded-lg cursor-pointer overflow-hidden'>
            <div className='dark:border-Dark400 border rounded-lg flex flex-row items-start w-full p-2 gap-x-2 my-2'>
                <div className='w-[40px]'>
                    <CardAvatar userName={parentUserName} avatarURL={parentAuthorAvatarURL} />
                </div>
                <div className='w-full'>
                    <div className='flex flex-col leading-4 py-1 flex-shrink max-w-[calc(100%-8px)] overflow-x-hidden'>
                        <div
                            onClick={userProfile}
                            className='max-w-[calc(100%-10px)] flex flex-shrink hover:underline hover:text-secondary font-bold overflow-hidden text-ellipsis whitespace-nowrap'>

                            {parentAuthorFirstName} {parentAuthorMiddleName} {parentAuthorLastName}
                        </div>
                        <div className='flex flex-shrink font-light overflow-hidden text-ellipsis whitespace-nowrap'>
                            @{parentUserName}
                        </div>
                    </div>
                    <CardCaption caption={parentCaption} />
                    {parentMediaURL ? (
                        <CardMedia mediaURL={parentMediaURL} />) : (null)}
                </div>
            </div>
        </div>
    )
}

export default RepostParentCard
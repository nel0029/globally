import React from 'react'
import CardAvatar from '../../Home/PostComponents/CardAvatar'

interface MediaProps {
    id: string,
    url: string
}

interface ConversationCardProps {
    avatarURL: MediaProps,
    firstName: string,
    middleName: string,
    lastName: string,
    userName: string,
    unseenMessagesCount: number,
    isActive: boolean,
    createdAt: string,
    lastMessageTimestamps: string,
    lastMessage: string
    onClick: (val: any) => void
}

const ConversationCard: React.FC<ConversationCardProps> = ({ avatarURL, firstName, middleName, lastName, userName, createdAt, lastMessageTimestamps, lastMessage, unseenMessagesCount, isActive, onClick }) => {

    const dateAndTime = new Date(lastMessageTimestamps)
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
        <div
            onClick={onClick}
            className='flex flex-row py-2 cursor-pointer hover:bg-black hover:bg-opacity-10 dark:hover:bg-white dark:hover:bg-opacity-10'>
            <div className='pr-2 relative'>
                <CardAvatar avatarURL={avatarURL.url} />
                {isActive && <div className='absolute w-3 h-3 bg-[#6EC531] bottom-2 right-2 rounded-full' />}
            </div>
            <div className='flex flex-col flex-grow'>
                <div className='w-full flex flex-row flex-grow flex-wrap items-center gap-x-1'>
                    <div className='flex flex-row font-bold items-center gap-x-1'>
                        <span>{firstName}</span>
                        <span>{middleName}</span>
                        <span>{lastName}</span>
                    </div>
                    <div className='text-sm text-gray-400'>
                        {formattedDateAndTime}
                    </div>

                </div>
                <div>
                    {lastMessage}
                </div>
            </div>
            <div className='flex justify-center items-center px-2'>
                <div className={`${unseenMessagesCount > 0 ? 'bg-secondary' : 'bg-opcaity-0'} w-3 h-3 rounded-full  `}>
                </div>
            </div>
        </div>
    )
}

export default ConversationCard
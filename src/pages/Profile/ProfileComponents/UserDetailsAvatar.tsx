import React from 'react'

interface AvatarURL {
    avatarURL: string
}

const UserDetailsAvatar: React.FC<AvatarURL> = ({ avatarURL }) => {
    return (
        <div className='absolute top-0 transform translate-y-[-75%] w-full '>
            <div className=' flex justify-center items-center min-w-[60px] max-w-[150px] h-full rounded-full aspect-square border-[3px] border-white dark:border-Dark100'>
                <img
                    className='object-cover w-full h-full rounded-full '
                    src={avatarURL} />
            </div>
        </div>
    )
}

export default UserDetailsAvatar
import IonIcon from '@reacticons/ionicons'
import React from 'react'
import { useNavigate } from 'react-router'

interface AvatarURLProps {
    avatarURL?: string
    userName?: string
}

const CardAvatar: React.FC<AvatarURLProps> = ({ avatarURL, userName }) => {
    const navigate = useNavigate()
    const userProfile = (event: any) => {
        navigate(`/${userName}`)
        event.stopPropagation()
    }
    return (
        <div
            onClick={userProfile}
            className={`flex justify-center items-center w-[40px]`}>
            {avatarURL ? (<img className='w-full h-auto rounded-full hover:ring-secondary hover:ring-2' src={avatarURL} />) : (
                <div className='w-full h-[40px] bg-secondary rounded-full hover:ring-secondary hover:outline-1 flex justify-center items-center text-xl text-white' >
                    <IonIcon name='person' />
                </div>
            )}
        </div>
    )
}

export default CardAvatar
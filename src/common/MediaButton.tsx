import React from 'react'
import IonIcon from '@reacticons/ionicons'

interface MediaButtonProps {
    onClick: () => void
}

const MediaButton: React.FC<MediaButtonProps> = ({ onClick }) => {
    return (
        <div
            onClick={onClick}
            className='flex justify-center items-center text-3xl text-secondary cursor-pointer'>
            <IonIcon name="image-outline" />
        </div>
    )
}

export default MediaButton
import React from 'react'
import { IonIcon } from '@ionic/react'

interface MediaButtonProps {
    onClick?: () => void
    hasDisabled?: boolean
}

const MediaButton: React.FC<MediaButtonProps> = ({ onClick, hasDisabled }) => {
    return (
        <div
            onClick={onClick}
            className={`flex justify-center items-center text-3xl text-secondary hover:text-opacity-60 ${hasDisabled ? 'text-opacity-60 cursor-not-allowed' : 'text-opacity-100 cursor-pointer'}`}>
            <IonIcon name="image-outline" />
        </div>
    )
}

export default MediaButton
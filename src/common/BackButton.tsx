import React from 'react'
import { useNavigate } from 'react-router'
import IonIcon from '@reacticons/ionicons'


const BackButton = () => {
    const navigate = useNavigate()

    const goBack = () => {
        navigate(-1)
    }
    return (
        <div
            onClick={goBack}
            className='flex justify-center items-center p-2 rounded-full hover:bg-slate-200 cursor-pointer'>
            <IonIcon name='arrow-back-outline' />
        </div>
    )
}

export default BackButton
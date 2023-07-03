import React from 'react'
import ConfirmButton from '../../../common/ConfirmButton'
import { useNavigate } from 'react-router'

const NoConvoSelected = () => {
    const navigate = useNavigate()

    const newConvo = () => navigate('/messages/new')
    return (
        <div className='flex-grow flex flex-col justify-center items-center gap-y-2'>
            <div className='text-4xl font-extrabold'>
                Select a message
            </div>
            <div className='text-sm'>
                Select on your existing conversations or start a new one.
            </div>
            <div>
                <ConfirmButton onClick={[newConvo]}>
                    New Message
                </ConfirmButton>
            </div>
        </div>
    )
}

export default NoConvoSelected
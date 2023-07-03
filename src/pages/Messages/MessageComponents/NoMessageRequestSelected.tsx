import React from 'react'
import ConfirmButton from '../../../common/ConfirmButton'
import { useNavigate } from 'react-router'

const NoMessageRequestSelected = () => {

    return (
        <div className='flex-grow flex flex-col justify-center items-center gap-y-2'>
            <div className='text-4xl font-extrabold'>
                Select a message
            </div>
            <div className='text-sm'>
                Message requests from people you don’t follow live here.
            </div>

        </div>
    )
}

export default NoMessageRequestSelected
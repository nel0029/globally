import React from 'react'
import DeleteButton from '../common/DeleteButton'
import MenuItem from '../common/MenuItem'
import { Route, Routes } from 'react-router'
import NewConversation from '../pages/Messages/MessageComponents/NewConversation'
import ConversationContainer from '../pages/Messages/MessageComponents/ConversationContainer'

const RightSideBar = () => {
    return (
        <div className='min-w-[300px] hidden h-full sticky lg:flex flex-col flex-grow right-0 top-0 items-center border px-2'>
            <MenuItem>
                Home
            </MenuItem>
            <MenuItem>
                Home
            </MenuItem>
            <MenuItem>
                Home
            </MenuItem>
            <MenuItem>
                Home
            </MenuItem>
            <MenuItem>
                Home
            </MenuItem>

        </div>
    )
}

export default RightSideBar
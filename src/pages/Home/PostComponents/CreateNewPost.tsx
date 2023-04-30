import React, { useContext } from 'react'
import CreateNewPostInput from './CreateNewPostInput'
import { PostContext } from '../../../context/PostContext'


export default function CreateNewPost() {

    const { postState, dispatch } = useContext(PostContext)
    return (
        <div className='w-full border'>
            <CreateNewPostInput />
        </div>
    )
}

import React, { useContext } from 'react'
import CreateNewPostInput from './CreateNewPostInput'
import { PostsContext } from '../../../context/PostsContext'


export default function CreateNewPost() {

    const { postState, dispatch } = useContext(PostsContext)
    return (
        <div className='w-full border'>
            <CreateNewPostInput />
        </div>
    )
}

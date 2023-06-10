import React, { useContext } from 'react'
import CreateNewPostInput from './CreateNewPostInput'


export default function CreateNewPost() {

    return (
        <div className='w-full border dark:border-none bg-white dark:bg-Dark200 rounded-lg'>
            <CreateNewPostInput />
        </div>
    )
}

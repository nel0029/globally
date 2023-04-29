import React, { useState } from 'react'
import IonIcon from '@reacticons/ionicons'

export default function CreateNewPostInput() {

    const [mediaInput, setMediaInput] = useState(false)

    const openMediaInput = () => {
        setMediaInput(!mediaInput)
    }
    return (
        <div className='w-full flex flex-col p-2'>
            <form onSubmit={(event: any) => event.preventDefault()} className='w-full flex flex-col justify-center items-center'>
                <input className='border w-full h-full' type='text' placeholder='Create a new post'></input>

                {mediaInput && <div className='w-full flex flex-row'>
                    <input className='border flex-grow' type='text' placeholder='Paste here the link'></input>
                    <button className='flex justify-center items-center border pl-3 pr-5'>
                        <IonIcon name="add" />
                        <p>Add Media</p>
                    </button>
                </div>}
                <div className='w-full flex flex-row justify-end'>
                    <button
                        onClick={openMediaInput}
                        className='border rounded-lg px-3 py-1'>Media</button>
                    <button className='border rounded-lg px-3 py-1'>Post</button>
                </div>
            </form>
        </div>
    )
}

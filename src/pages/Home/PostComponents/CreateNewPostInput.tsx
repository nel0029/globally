import React, { useState, useContext } from 'react'
import IonIcon from '@reacticons/ionicons'
import { UserContext } from '../../../context/UserContext'
import { useDispatch, useSelector } from 'react-redux'
import { createPost } from '../../../redux/asynActions/postAsynActions'
import { AppDispatch } from '../../../redux/store';

interface NewPost {
    actionType: string,
    userName: string,
    caption: string,
    mediaURL: string[]
}

export default function CreateNewPostInput() {
    const user = useSelector((state: any) => state.posts.userData)


    const dispatch = useDispatch<AppDispatch>()
    const [mediaInput, setMediaInput] = useState(false)
    const [postBody, setPostBody] = useState("")
    const [postMediaUrls, setPostMediaUrls] = useState<string[]>([])
    const [postMediaUrlsBody, setPostMediaUrlsBody] = useState("")

    const addMediaUrls = () => {
        setPostMediaUrls((prev: any) => [...prev, postMediaUrlsBody])
        setPostMediaUrlsBody("")
    }

    const openMediaInput = () => {
        setMediaInput(!mediaInput)
    }

    const createNewPost = () => {
        const newPost: NewPost = {
            actionType: "create-post",
            userName: user.userName,
            caption: postBody,
            mediaURL: postMediaUrls,
        }
        dispatch(createPost(newPost))

        setPostBody("")
        setPostMediaUrls([])
    }


    return (
        <div className='w-full flex flex-col p-2'>
            <div onSubmit={(event: any) => event.preventDefault()} className='w-full flex flex-col justify-center items-center'>
                <textarea
                    maxLength={99}
                    value={postBody}
                    onChange={(event: any) => setPostBody(event.target.value)}
                    className='border w-full h-[75px] resize-none py-1 px-2'
                    placeholder='Create a new post'
                />
                <p>{99 - postBody.length} characters remaining</p>
                {mediaInput && <div className='w-full flex flex-row'>
                    <input value={postMediaUrlsBody} onChange={(event: any) => setPostMediaUrlsBody(event.target.value)} className='border flex-grow' type='text' placeholder='Paste here the link'></input>
                    <button onClick={addMediaUrls} className='flex justify-center items-center border pl-3 pr-5'>
                        <IonIcon name="add" />
                        <p>Add Media</p>
                    </button>
                </div>}
                <div className='w-full flex flex-row justify-end'>
                    <button
                        onClick={openMediaInput}
                        className='border rounded-lg px-3 py-1'>Media</button>
                    <button onClick={createNewPost} className='border rounded-lg px-3 py-1'>Post</button>
                </div>
            </div>
        </div>
    )
}

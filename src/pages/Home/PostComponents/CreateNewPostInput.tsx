import React, { useState, useContext } from 'react'
import IonIcon from '@reacticons/ionicons'
import { UserContext } from '../../../context/UserContext'
import { useDispatch, useSelector } from 'react-redux'
import { createPost } from '../../../redux/asynActions/postAsynActions'
import { AppDispatch } from '../../../redux/store';
import CommonButton from '../../../common/CommonButton'
import ConfirmButton from '../../../common/ConfirmButton'
import { NewPost } from '../../../types/PostActionTypes'
import TextAreaInput from '../../../common/TextAreaInput'
import CircularProgress from '../../../common/CircularProgress'
import MediaButton from '../../../common/MediaButton'

export default function CreateNewPostInput() {
    const user = useSelector((state: any) => state.user.userData)


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
            authorID: user.userID,
            caption: postBody,
            mediaURL: postMediaUrls,
        }
        dispatch(createPost(newPost))

        setPostBody("")
        setPostMediaUrls([])
    }
    const percentage = postBody.length
    const width = 50
    const radius = width / 2
    const circumference = radius * Math.PI * 2;
    const offset = (percentage / 99) * circumference;
    return (
        <div className='w-full flex flex-col p-2'>
            <div onSubmit={(event: any) => event.preventDefault()} className='w-full flex flex-col justify-center items-center'>
                <TextAreaInput body={postBody} setBody={setPostBody} placeholder='Create a new post' />


                {mediaInput && <div className='w-full flex flex-row'>
                    <input value={postMediaUrlsBody} onChange={(event: any) => setPostMediaUrlsBody(event.target.value)} className='border flex-grow' type='text' placeholder='Paste here the link'></input>
                    <button onClick={addMediaUrls} className='flex justify-center items-center border pl-3 pr-5'>
                        <IonIcon name="add" />
                        <p>Add Media</p>
                    </button>

                </div>}
                <div className='w-full flex flex-row justify-between gap-x-2 py-2'>
                    <MediaButton onClick={openMediaInput} />
                    <div className='flex flex-row items-center gap-x-2'>
                        <CircularProgress
                            max={99}
                            width={32}
                            percentage={postBody.length} />

                        <ConfirmButton onClick={[createNewPost]}>
                            Post
                        </ConfirmButton>
                    </div>

                </div>
            </div>
        </div>
    )
}

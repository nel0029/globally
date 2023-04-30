import React, { useState, useContext } from 'react'
import IonIcon from '@reacticons/ionicons'
import { UserContext } from '../../../context/UserContext'
import { PostsDataProps } from '../../../types/PostTypes'
import { PostContext } from '../../../context/PostContext'
import { POSTACTIONS } from '../../../actions/POSTACTIONS'

export default function CreateNewPostInput() {
    const user = useContext(UserContext)
    const { postState, dispatch } = useContext(PostContext)
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

    const createPost = () => {
        const id: number = Math.ceil(Math.random() * 1000000000)
        const newPost: PostsDataProps = {
            postID: id,
            avatarUrl: user.avatarUrl,
            postAuthorUserID: user.userID,
            postAuthorFirstName: user.userFirstName,
            postAuthorMiddleName: user.userMiddleName,
            postAuthorLastName: user.userLastName,
            postDateAndTime: "April 29, 2023",
            postCaption: postBody,
            postImgUrls: postMediaUrls,
            postLikes: [],
            postComments: [],
            postReposts: []
        }
        dispatch({
            type: POSTACTIONS.CREATEPOST,
            payload: {
                newPost: newPost
            }
        })

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
                    className='border w-full h-[200px] resize-none'
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
                    <button onClick={createPost} className='border rounded-lg px-3 py-1'>Post</button>
                </div>
            </div>
        </div>
    )
}

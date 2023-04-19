import React, { useState, createContext, useEffect, useContext } from 'react';
import PostCard from './PostComponents/PostCard';
import PostData from '../../data/PostData';
import Comments from '../../data/Comments';
import Comment from './PostComponents/Comment';
import { PostContext } from '../../context/PostContext';
import Post from './PostComponents/Post';
import { POSTS } from '../../data/Posts';
import { UserContext } from '../../context/UserContext';



export default function Home() {
    const post = POSTS
    //const postContext = createContext()
    console.log(post)
    const user = useContext(UserContext)
    const [posts, setPosts] = useState(post)
    const [postCaption, setPostCaption] = useState("")

    //Comments
    const [commentCaption, setCommentCaption] = useState("")
    const [comments, setComments] = useState()

    const onPost = () => {
        const newPost = {
            postAuthorName: `${user.userFirstName} ${user.userMiddleName} ${user.userLastName}`,
            postContent: postCaption,
            comments: []
        }
        setPosts((prev: any) => [newPost, ...prev])
        setPostCaption("")
    }
    return (
        <div className='w-full flex flex-col justify-center items-center'>
            <div className='w-full flex flex-row items-center justify-center px-20'>
                <input
                    type='text'
                    className='flex-grow border border-black py-3 px-1'
                    value={postCaption}
                    onChange={(event: any) => setPostCaption(event.target.value)} ></input>
                <button
                    className='rounded-full'
                    onClick={() => onPost()}
                >
                    POST
                </button>
            </div>
            <div className='w-full flex flex-col justify-center items-center gap-y-1 px-10'>

                {posts.map((post: any, index: any) => {

                    return (
                        <Post
                            key={index}
                            post={post} />
                    )


                })}
            </div>

        </div>


    )
}

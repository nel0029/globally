import React, { useState, useContext, createContext, useReducer } from 'react';
import { UserContext } from '../../context/UserContext';
import PostData from '../../data/PostData';
import PostCard from './PostComponents/PostCard';
import { PostsDataProps } from '../../types/PostTypes';
import { PostReducer } from '../../reducers/PostReducer';
import { PostContext } from '../../context/PostContext';
import CreateNewPost from './PostComponents/CreateNewPost';


export default function Home() {
    const user = useContext(UserContext)


    const [postState, dispatch] = useReducer(PostReducer, PostData)


    const [postsList, setPostsList] = useState<PostsDataProps[]>(PostData)



    return (
        <div className='w-full flex flex-col items-center justify-center'>


            <div className='w-full xl:w-[600px] flex flex-col justify-center items-center gap-y-1 px-2'>
                <CreateNewPost />
                <div className='flex w-full flex-col-reverse justify-center items-center gap-y-1'>
                    <PostContext.Provider value={{ postState, dispatch }}>
                        {postState.map((post: PostsDataProps, index: any) => (
                            <PostCard key={index} {...post} />
                        ))}
                    </PostContext.Provider>
                </div>

            </div>
        </div>

    )
}

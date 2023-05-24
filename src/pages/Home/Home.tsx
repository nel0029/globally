import React, { useState, useEffect, useContext, createContext, useReducer } from 'react';
import { UserContext } from '../../context/UserContext';
import PostCard from './PostComponents/PostCard';
import { PostsDataProps } from '../../types/PostTypes';
import { PostReducer } from '../../reducers/PostReducer';
import CreateNewPost from './PostComponents/CreateNewPost';
import { useSelector, useDispatch } from 'react-redux/es/exports';
import { getPosts } from '../../redux/asynActions/postAsynActions';
import { AppDispatch } from '../../redux/store';

export default function Home() {

    const posts = useSelector((state: any) => state.posts.PostData || [])
    const userID = useSelector((state: any) => state.posts.userData.userID)
    const dispatch = useDispatch<AppDispatch>()

    useEffect(() => {
        dispatch(getPosts(userID))
    }, [dispatch, userID])


    return (
        <div className='w-full flex flex-col items-center justify-center'>


            <div className='w-full xl:w-[600px] flex flex-col justify-center items-center gap-y-1 px-2'>
                <CreateNewPost />
                <div className='flex w-full flex-col justify-center items-center gap-y-1'>

                    {posts.map((post: PostsDataProps, index: any) => (
                        <PostCard key={index} {...post} />
                    ))}

                </div>

            </div>

        </div>

    )
}

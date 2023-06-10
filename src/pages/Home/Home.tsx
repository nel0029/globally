import React, { useState, useEffect, useContext, createContext, useReducer } from 'react';
import CreateNewPost from './PostComponents/CreateNewPost';
import { useSelector, useDispatch } from 'react-redux/es/exports';
import { getPosts } from '../../redux/asynActions/postAsynActions';
import { AppDispatch } from '../../redux/store';
import Card from './PostComponents/Card';
import Header from '../../common/Header';
import TitleText from '../../common/TitleText';
import IonIcon from '@reacticons/ionicons';

export default function Home() {

    const posts = useSelector((state: any) => state.posts.PostData || [])
    const userID = useSelector((state: any) => state.user.userData.userID)
    const dispatch = useDispatch<AppDispatch>()

    useEffect(() => {
        dispatch(getPosts(userID))
    }, [])


    return (
        <div className='w-full flex flex-col items-center justify-center gap-y-2'>
            <Header>
                <div className="flex justify-center items-center font-bold text-2xl rounded-full text-secondary">
                    Home
                </div>
            </Header>

            <div className='w-full flex flex-col justify-center items-center gap-y-2 px-2'>
                <CreateNewPost />
                <div className='flex w-full flex-col-reverse justify-center items-center gap-y-2'>

                    {posts.map((post: any) => {
                        return <Card key={post._id} {...post} />
                    })}

                </div>

            </div>

        </div>

    )
}

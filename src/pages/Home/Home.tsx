import React, { useState, useEffect, useContext, createContext, useReducer } from 'react';
import CreateNewPost from './PostComponents/CreateNewPost';
import { useSelector, useDispatch } from 'react-redux/es/exports';
import { getPosts } from '../../redux/asynActions/postAsynActions';
import { AppDispatch } from '../../redux/store';
import Card from './PostComponents/Card';
import Header from '../../common/Header';
import LoadingCard from './PostComponents/LoadingCard';


export default function Home() {

    const posts = useSelector((state: any) => state.posts.PostData || [])

    const [isLoading, setIsLoading] = useState(false)

    const dispatch = useDispatch<AppDispatch>()
    const user = useSelector((state: any) => state.user.userData)
    const userID = localStorage.getItem("userID")

    useEffect(() => {
        if (userID) {
            setIsLoading(true)
            dispatch(getPosts(userID))
                .then(() => {
                    setIsLoading(false)
                })
        }
    }, [])


    return (
        <div className='w-full flex flex-col items-center justify-center gap-y-2'>
            <Header>
                <div className="flex justify-center items-center font-bold text-2xl rounded-full text-secondary">
                    Home
                </div>
            </Header>

            <div className='w-full flex flex-col justify-center items-center gap-y-4 px-2'>
                <CreateNewPost />
                <div className='flex w-full flex-col-reverse justify-center items-center gap-y-4'>

                    {isLoading ? (
                        <div className='w-full flex flex-col justify-center items-center gap-y-4'>
                            <LoadingCard />
                            <LoadingCard />
                            <LoadingCard />
                            <LoadingCard />
                            <LoadingCard />
                            <LoadingCard />
                        </div>
                    ) : (
                        posts.map((post: any) => {
                            return <Card isInHomeRoute={true} key={post._id} {...post} />
                        })
                    )}

                </div>

            </div>

        </div>

    )
}

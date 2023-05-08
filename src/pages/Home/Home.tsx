import React, { useState, useContext, createContext, useReducer } from 'react';
import { UserContext } from '../../context/UserContext';
import PostData from '../../data/PostData';
import PostCard from './PostComponents/PostCard';
import { PostsDataProps } from '../../types/PostTypes';
import { PostReducer } from '../../reducers/PostReducer';
import { PostsContext } from '../../context/PostsContext';
import CreateNewPost from './PostComponents/CreateNewPost';


export default function Home() {
    const user = useContext(UserContext)





    const [postState, dispatch] = useReducer(PostReducer, PostData)


    const [postsList, setPostsList] = useState<PostsDataProps[]>(PostData)



    return (
        <div className='w-full flex flex-col items-center justify-center'>

            <PostsContext.Provider value={{ postState, dispatch }}>
                <div className='w-full xl:w-[600px] flex flex-col justify-center items-center gap-y-1 px-2'>
                    <CreateNewPost />
                    <div className='flex w-full flex-col-reverse justify-center items-center gap-y-1'>

                        {postState.map((post: PostsDataProps, index: any) => (
                            <PostCard key={index} {...post} />
                        ))}

                    </div>

                </div>
            </PostsContext.Provider>
        </div>

    )
}

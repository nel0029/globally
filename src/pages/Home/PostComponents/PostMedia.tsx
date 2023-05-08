import React, { useState } from 'react'
import Carousel from '../../../common/Carousel';
import { useNavigate, NavLink } from 'react-router-dom';
import { PostsDataProps } from '../../../types/PostTypes';



export default function PostMedia(postContentObject: PostsDataProps) {

    const [postContent, SetPostContent] = useState(postContentObject)
    const navigate = useNavigate()

    const postImgDisplay = (postImgUrls: any) => {


        switch (postImgUrls.length) {
            case 0:
                return <div className='hidden' />;
                break;
            case 1:
                return <div className='w-full relative h-auto rounded-lg '>
                    <img className='w-full h-auto object-cover rounded-lg' src={postImgUrls} />
                </div>;
                break;
            default:
                return <Carousel slidesShow={postImgUrls}>

                    {postImgUrls.map((slide: any, index: any) => {

                        return (

                            <img
                                key={index}
                                className='w-full h-auto object-cover max-w-none flex-[0_0_100%] rounded-lg'
                                src={slide} />


                        )
                    })}
                </Carousel>
        }

    }

    return (
        <div className='w-full flex py-2'>
            {postImgDisplay(postContent.postImgUrls)}
        </div>
    )
}

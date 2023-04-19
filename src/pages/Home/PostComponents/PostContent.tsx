import React from 'react'
import Carousel from '../../../common/Carousel';
import 'swiper/css';


export default function PostContent(props: any) {

    const {
        postImgUrls,
        postCaption,
    } = props;


    const postImgDisplay = (postImgUrls: any) => {


        switch (postImgUrls.length) {
            case 0:
                return <div />;
                break;
            case 1:
                return <div className='w-[full] relative h-auto rounded-lg '>
                    <img className='w-full h-auto rounded-lg' src={postImgUrls} />
                </div>;
                break;
            default:
                return <Carousel slidesShow={postImgUrls}>

                    {postImgUrls.map((slide: any, index: any) => {
                        return (
                            <img
                                key={index}
                                className='w-full h-auto rounded-lg'
                                src={slide} />
                        )
                    })}
                </Carousel>
        }

    }

    return (
        <div className='w-full py-1' >
            <div className='my-1 mx-2 py-2 leading-5 text-xl'>
                <p>
                    {postCaption}
                </p>
            </div>
            <div className='px-2'>
                {postImgDisplay(postImgUrls)}
            </div>
        </div >
    )
}

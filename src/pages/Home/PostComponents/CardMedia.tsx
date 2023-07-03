import React, { useEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import Carousel from '../../../common/Carousel';
import SwiperCore, { Grid, Navigation, Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// Initialize Swiper modules

interface MediaProps {
  id: string,
  url: string
}


interface CardMediaProps {
  mediaURL: MediaProps[];
}

const CardMedia: React.FC<CardMediaProps> = ({ mediaURL }) => {


  const postImgDisplay = (mediaURL: MediaProps[]) => {
    switch (mediaURL && mediaURL.length) {
      case 0:
        return null;
      case 1:
        return (
          <div className='w-full h-auto rounded-lg'>
            <img className='w-full h-auto object-cover rounded-lg' src={mediaURL[0]?.url} alt='Post' />
          </div>
        );
      default:
        return (
          <Carousel>

            {mediaURL?.map((img: MediaProps, index: number) => (
              <div className='w-full flex-img'>
                <img
                  key={index}
                  className='h-full w-auto object-cover aspect-3/2' src={img.url} />
              </div>
            ))}

          </Carousel>
        );
    }
  };

  return <div className='w-full max-w-[500px]'>{postImgDisplay(mediaURL)}</div>;
};

export default CardMedia;

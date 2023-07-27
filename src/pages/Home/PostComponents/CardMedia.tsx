import React, { useEffect, useRef } from 'react';
import Carousel from '../../../common/Carousel';


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
    switch (true) {
      case mediaURL.length === 1:
        return (
          <div className='w-full h-auto rounded-lg'>
            <img className='w-full h-auto object-cover rounded-lg' src={mediaURL[0]?.url} alt='Post' />
          </div>
        );

      case mediaURL.length > 1:
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
      default:
        return null
    }
  };

  return <div className='w-full max-w-[500px]'>{postImgDisplay(mediaURL)}</div>;
};

export default CardMedia;

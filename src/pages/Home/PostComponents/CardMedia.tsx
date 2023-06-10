import React from 'react';
import Carousel from '../../../common/Carousel';

interface CardMediaProps {
  mediaURL: string[];
}


const CardMedia: React.FC<CardMediaProps> = ({ mediaURL }) => {
  const postImgDisplay = (mediaURL: string[]) => {
    switch (mediaURL.length) {
      case 0:
        return null;
      case 1:
        return (
          <div className='w-full h-auto rounded-lg '>
            <img className='w-full h-auto object-cover rounded-lg' src={mediaURL[0]} />
          </div>
        );
      default:
        return (
          <Carousel slidesShow={mediaURL}>
            {mediaURL.map((slide: any, index: any) => (
              <img
                key={index}
                className='w-full h-auto object-cover max-w-none flex-[0_0_100%] rounded-lg'
                src={slide}
              />
            ))}
          </Carousel>
        );
    }
  };

  return <div className='w-full flex py-2'>{postImgDisplay(mediaURL)}</div>;
}

export default CardMedia
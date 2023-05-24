import React, { useState } from 'react';
import { PostsDataProps } from '../../../types/PostTypes';

export default function PostCaption(post: PostsDataProps) {
    const [showFullCaption, setShowFullCaption] = useState(false);
    const toggleFullCaption = (event: any) => {
        setShowFullCaption(!showFullCaption);
        event.stopPropagation()
    };
    const captionLines = post.caption.split('\n');
    const displayedLines = showFullCaption ? captionLines : captionLines.slice(0, 3);


    return (
        <div
        >
            {displayedLines.map((line, index) => (
                <p key={index} className='text-lg break-words'>
                    {line}
                </p>
            ))}
            {captionLines.length > 3 && (
                <button onClick={toggleFullCaption} className='text-blue-500 hover:text-blue-800 z-10'>
                    {showFullCaption ? 'See Less' : 'See More'}
                </button>
            )}
        </div>
    );
}

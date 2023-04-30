import React, { useState } from 'react';
import { PostsDataProps } from '../../../types/PostTypes';

export default function PostCaption(post: PostsDataProps) {
    const [showFullCaption, setShowFullCaption] = useState(false);

    const toggleFullCaption = () => {
        setShowFullCaption(!showFullCaption);
    };

    const captionLines = post.postCaption.split('\n');
    const displayedLines = showFullCaption ? captionLines : captionLines.slice(0, 3);

    return (
        <div>
            {displayedLines.map((line, index) => (
                <p key={index} className='text-lg'>
                    {line}
                </p>
            ))}
            {captionLines.length > 3 && (
                <button onClick={toggleFullCaption} className='text-blue-500 hover:text-blue-800'>
                    {showFullCaption ? 'See Less' : 'See More'}
                </button>
            )}
        </div>
    );
}

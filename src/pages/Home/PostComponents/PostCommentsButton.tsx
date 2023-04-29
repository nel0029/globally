import React from 'react'
import IonIcon from '@reacticons/ionicons';
import { PostsDataProps } from '../../../types/PostTypes'


interface CommentProps {
    post: PostsDataProps,
    comments: boolean,
    openComments: () => void;
}


const PostCommentsButton: React.FC<CommentProps> = ({ post, comments, openComments }) => {
    return (
        <div className='flex-grow px-4
        '>
            <div
                onClick={openComments}
                className='flex justify-start items-center' >
                <div className='flex justify-start items-center text-sm cursor-pointer hover:underline py-1'>
                    {comments ? (
                        <div className='flex flex-row items-center'>
                            <IonIcon name='chevron-up-outline' /> <p> Hide Comments </p>
                        </div>) : (
                        <div className='flex flex-row items-center'>
                            <IonIcon name='chevron-down-outline' /> <p> Show Comments </p>
                        </div>
                    )}

                </div>
            </div>
        </div>
    )
}


export default PostCommentsButton
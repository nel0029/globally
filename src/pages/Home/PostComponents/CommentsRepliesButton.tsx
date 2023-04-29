import React from 'react'
import IonIcon from '@reacticons/ionicons'
import { PostCommentsProps } from '../../../types/PostTypes';

interface CommentProps {
    comment: PostCommentsProps,
    replies: boolean,
    openReplies: () => void;
}

const CommentsRepliesButton: React.FC<CommentProps> = ({ comment, replies, openReplies }) => {


    return (
        <div
            onClick={openReplies}
            className='flex justify-start items-center
            
            ' >
            <div className=' flex justify-start items-center text-sm cursor-pointer hover:underline py-1'>
                {replies ? (
                    <div className='flex flex-row items-center
                    '>
                        <IonIcon name='chevron-up-outline' />
                        <p>
                            Hide Replies
                        </p>
                    </div>
                ) : (
                    <div>
                        {comment.commentReplies.length > 0 ? (<div className='flex flex-row items-center'>
                            <IonIcon name='chevron-down-outline' />
                            <p>
                                Show Replies
                            </p>
                        </div>) : null}
                    </div>
                )}
            </div>
        </div>
    )
}


export default CommentsRepliesButton
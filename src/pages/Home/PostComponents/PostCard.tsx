import React, { useContext, useState, createContext } from 'react';
import PostHeader from './PostHeader';
import PostMedia from './PostMedia';
import PostInteractions from './PostInteractions';
import { UserContext } from '../../../context/UserContext';
import { PostContext } from '../../../context/PostContext';
import { PostsDataProps } from '../../../types/PostTypes';
import PostComments from './PostComments';
import PostCommentsButton from './PostCommentsButton';
import PostAvatar from './PostAvatar';
import PostCaption from './PostCaption';
import RepliesContext from '../../../context/CommentsContext';
import { RepliesInterface } from '../../../context/CommentsContext';
import Dropdown from '../DropDown';


export default function PostCard(post: PostsDataProps) {

    const user = useContext(UserContext)
    const { postState, dispatch } = useContext(PostContext)
    const [comments, setComments] = useState(false)
    const [replies, setReplies] = useState(false)

    const openComments = () => {
        setComments(!comments)
    }

    return (
        <div className='w-full relative flex flex-col bg-white border rounded-lg p-2
       '>
            <div className='w-full'>
                <div className='w-full flex flex-row gap-x-3'>
                    <div>
                        <PostAvatar {...post} />
                    </div>
                    <div className='flex-grow'>
                        <PostHeader {...post} />
                        <PostCaption {...post} />
                        <PostMedia {...post} />
                    </div>
                </div>

                <PostInteractions openComments={openComments} comments={comments} post={post} />
            </div>

            <div className='flex flex-grow w-full px-2 transition-all ease-in-out duration-[3000ms]'>
                {comments ? (<PostComments {...post} />) : (<div />)}
            </div>

            {post.postComments.length > 0 ? (
                <PostCommentsButton post={post} openComments={openComments} comments={comments} />
            ) : (
                null
            )}

        </div>
    )
}

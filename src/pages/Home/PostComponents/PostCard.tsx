import React, { useContext, useState, createContext } from 'react';
import PostHeader from './PostHeader';
import PostMedia from './PostMedia';
import PostInteractions from './PostInteractions';
import { UserContext } from '../../../context/UserContext';
import { PostsDataProps } from '../../../types/PostTypes';
import PostComments from './PostComments';
import PostCommentsButton from './PostCommentsButton';
import PostAvatar from './PostAvatar';
import PostCaption from './PostCaption';
import { useNavigate } from 'react-router-dom';


export default function PostCard(post: PostsDataProps) {

    const user = useContext(UserContext)
    const [comments, setComments] = useState(false)
    const [replies, setReplies] = useState(false)
    const navigate = useNavigate()
    const openComments = () => {
        setComments(!comments)
    }
    const handlePostDetail = (event: any) => {
        const { className } = event.target;

        if (
            className !== "avatar" &&
            className !== "main-content"
        ) {
            navigate(`/${post.userName}/posts/${post._id}`);
        }
    };

    return (
        <div className='w-full relative flex flex-col bg-white border rounded-lg p-2 hover:bg-[#f9f9f9]'
            onClick={handlePostDetail}>
            <div className='w-full'>
                <div className='w-full flex flex-row gap-x-3'>
                    <div className='avatar'>
                        <PostAvatar {...post} />
                    </div>
                    <div className='main-content flex-grow'>
                        <PostHeader {...post} />
                        <PostCaption {...post} />
                        <PostMedia {...post} />
                    </div>
                </div>

                <PostInteractions openComments={openComments} comments={comments} post={post} />
            </div>

            <div className='flex flex-grow w-full'>
                {comments ? (<PostComments {...post} />) : (<div />)}
            </div>

            {post.repliesCount > 0 ? (
                <PostCommentsButton post={post} openComments={openComments} comments={comments} />
            ) : (
                null
            )}

        </div>
    )
}

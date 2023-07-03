import React from 'react';
import PostHeader from './PostHeader';
import PostInteractions from './PostInteractions';
import { PostsDataProps } from '../../../types/PostTypes';
import { useNavigate } from 'react-router-dom';
import CardCaption from './CardCaption';
import CardAvatar from './CardAvatar';
import CardMedia from './CardMedia';
import { useSelector } from 'react-redux';


interface PostCardProps extends PostsDataProps {
    border?: boolean;
}

const PostCard: React.FC<PostCardProps> = ({ border, ...post }) => {

    const navigate = useNavigate()
    const handlePostDetail = () => {
        navigate(`/${post.postAuthorUserName}/posts/${post._id}`);
    };
    const user = useSelector((state: any) => state.user.userData)

    const authorized = (post.authorID === user.userID)
    return (
        <div className={`w-full flex flex-col rounded-lg p-2 bg-white dark:bg-Dark200  cursor-pointer `}
            onClick={handlePostDetail}>
            <div className='w-full '>
                <div className='w-full flex flex-row gap-x-3 '>
                    <div className='avatar'>
                        <CardAvatar avatarURL={post.postAuthorAvatarURL.url} userName={post.postAuthorUserName} />
                    </div>
                    <div className='flex-shrink flex-1 max-w-[calc(100%-58px)]'>
                        <PostHeader post={post} authorized={authorized} />
                        <CardCaption caption={post.caption} />
                        <CardMedia mediaURL={post.mediaURL} />
                    </div>
                </div>

                <PostInteractions {...post} />
            </div>
        </div>
    )
}

export default PostCard
import React from 'react';
import PostHeader from './PostHeader';
import PostContent from './PostContent';
import PostInteractions from './PostInteractions';
import PostComments from './PostComments';

export default function PostCard({ post }: any) {
    const avatarUrl = post.avatarUrl;
    const postAuthorFirstName = post.postAuthorFirstName;
    const postAuthorMiddleName = post.postAuthorMiddleName;
    const postAuthorLastName = post.postAuthorLastName;
    const postAuthorUserID = post.postAuthorUserID;
    const postDateAndTime = post.postDateAndTime;
    const postImgUrls = post.postImgUrls;
    const postCaption = post.postCaption;
    const postLikes = post.postLikes;
    const postComments = post.postComments
    const postReposts = post.postReposts

    console.log(post.postComments)
    return (
        <div className='flex flex-col w-[500px] max-w-full border rounded-lg py-2'>
            <PostHeader
                avatarUrl={avatarUrl}
                postAuthorFirstName={postAuthorFirstName}
                postAuthorMiddleName={postAuthorMiddleName}
                postAuthorLastName={postAuthorLastName}
                postAuthorUserID={postAuthorUserID}
                postDateAndTime={postDateAndTime} />
            <PostContent
                postImgUrls={postImgUrls}
                postCaption={postCaption} />
            <PostInteractions
                postLikes={postLikes}
                post={post}
                postComments={postComments}
                postReposts={postReposts}
            />
            <PostComments

                post={post.postComments} />

        </div>
    )
}

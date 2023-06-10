import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createReply, like, unlike, createRepost } from '../../../redux/asynActions/postAsynActions';
import { AppDispatch } from '../../../redux/store';
import { NewReply, NewRepost, UnlikeData, NewLike } from '../../../types/PostActionTypes';
import CardInteractions from './CardInteractions';
import CardReplyModal from './CardReplyModal';
import CardRepostModal from './CardRepostModal';
import { CardProps } from './Card';



const PostInteractions = (post: CardProps) => {
    const user = useSelector((state: any) => state.user.userData)
    const dispatch = useDispatch<AppDispatch>();
    const [replyModal, setReplyModal] = useState(false)
    const [replyCaption, setReplyCaption] = useState("")
    const [mediaInput, setMediaInput] = useState(false)
    const [replyMediaUrls, setReplyMediaUrls] = useState<string[]>([])
    const [replyMediaUrlsBody, setReplyMediaUrlsBody] = useState("")
    const [repostModal, setRepostModal] = useState(false)
    const [repostCaption, setRepostCaption] = useState("")

    const openRepostModal = () => {
        setRepostModal(!repostModal)
    }

    const createNewRepost = () => {
        const newRepost: NewRepost = {
            postID: post._id,
            parentType: post.type,
            authorID: user.userID,
            caption: repostCaption
        }

        dispatch(createRepost(newRepost))
    }

    const addMediaUrls = () => {
        setReplyMediaUrls((prev: any) => [...prev, replyMediaUrlsBody])
        setReplyMediaUrlsBody("")
    }
    const openMediaInput = () => {
        setMediaInput(!mediaInput)
    }

    const openReplyModal = () => {
        setReplyModal(!replyModal)

    }

    const createNewReply = () => {
        const newReply: NewReply = {
            postID: post._id,
            parentType: post.type,
            authorID: user.userID,
            caption: replyCaption,
            mediaURL: replyMediaUrls
        }
        dispatch(createReply(newReply))
        openReplyModal()
    }
    const likeButton = () => {
        const likeData: NewLike = {
            postID: post._id,
            parentType: post.type,
            authorID: user.userID,
        };
        dispatch(like(likeData));
    };

    const unlikeButton = () => {
        const likeData: UnlikeData = {
            likeID: post.likeID !== null ? post.likeID : '',
            authorID: user.userID,
        };
        dispatch(unlike(likeData));
    };


    return (
        <div className='w-full flex flex-col border-t dark:border-Dark300'
            onClick={(event: any) => event.stopPropagation()} >
            <CardInteractions
                isLiked={post.isLiked}
                likeButton={likeButton}
                unlikeButton={unlikeButton}
                likesCount={post.likesCount}
                repliesCount={post.repliesCount}
                repostsCount={post.repostsCount}
                openReplyModal={openReplyModal}
                openRepostModal={openRepostModal} />
            {replyModal &&
                <CardReplyModal
                    setModal={setReplyModal}
                    authorUserName={post.postAuthorUserName}
                    avatarURL={user.avatarURL}
                    firstName={user.userFirstName}
                    middleName={user.userMiddleName}
                    lastName={user.userLastName}
                    userName={user.userName}
                    replyCaption={replyCaption}
                    setReplyCaption={setReplyCaption}
                    mediaInput={mediaInput}
                    replyMediaUrlsBody={replyMediaUrlsBody}
                    setReplyMediaUrlsBody={setReplyMediaUrlsBody}
                    addMediaUrls={addMediaUrls}
                    openMediaInput={openMediaInput}
                    confirmButtonFunctions={[createNewReply, openReplyModal]}
                    cancelButtonFunctions={[openReplyModal]} />
            }

            {repostModal &&
                <CardRepostModal
                    setModal={setRepostModal}
                    avatarURL={user.avatarURL}
                    authorAvatarURL={post.postAuthorAvatarURL}
                    firstName={user.userFirstName}
                    middleName={user.userMiddleName}
                    lastName={user.userLastName}
                    userName={user.userName}
                    repostCaption={repostCaption}
                    postAuthorFirstName={post.postAuthorFirstName}
                    postAuthorMiddleName={post.postAuthorMiddleName}
                    postAuthorLastName={post.postAuthorLastName}
                    postAuthorUserName={post.postAuthorUserName}
                    parentCaption={post.caption}
                    setRepostCaption={setRepostCaption}
                    parentMediaURL={post.mediaURL}
                    confirmButtonFunctions={[createNewRepost, openRepostModal]}
                    cancelButtonFunctions={[openRepostModal]} />
            }
        </div>

    )
}


export default PostInteractions
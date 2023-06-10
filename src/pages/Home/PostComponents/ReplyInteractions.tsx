import React, { useState, useEffect } from 'react'
import { ReplyDataProps } from '../../../types/PostTypes'
import { useDispatch, useSelector } from 'react-redux'
import { createReply, like, unlike, createRepost } from '../../../redux/asynActions/postAsynActions';
import { NewLike, NewReply, NewRepost, UnlikeData } from '../../../types/PostActionTypes';
import { AppDispatch } from '../../../redux/store'
import CardInteractions from './CardInteractions'
import CardReplyModal from './CardReplyModal'
import CardRepostModal from './CardRepostModal'

function ReplyInteractions(reply: ReplyDataProps) {
    const user = useSelector((state: any) => state.user.userData)
    const dispatch = useDispatch<AppDispatch>()
    const [replyModal, setReplyModal] = useState(false)
    const [repostModal, setRepostModal] = useState(false)
    const [replyCaption, setReplyCaption] = useState("")
    const [mediaInput, setMediaInput] = useState(false)
    const [replyMediaUrls, setReplyMediaUrls] = useState<string[]>([])
    const [replyMediaUrlsBody, setReplyMediaUrlsBody] = useState("")
    const [repostCaption, setRepostCaption] = useState("")


    //functions
    const likeButton = () => {
        const likeData: NewLike = {
            postID: reply._id,
            parentType: reply.type,
            authorID: user.userID,
        };
        dispatch(like(likeData));
    };

    const unlikeButton = () => {
        const likeData: UnlikeData = {
            likeID: reply.likeID !== null ? reply.likeID : '',
            authorID: user.userID,
        };
        dispatch(unlike(likeData));
    };

    const openReplyModal = () => {
        setReplyModal(!replyModal)

    }

    const openRepostModal = () => {
        setRepostModal(!repostModal)
    }

    const addMediaUrls = () => {
        setReplyMediaUrls((prev: any) => [...prev, replyMediaUrlsBody])
        setReplyMediaUrlsBody("")
    }

    const openMediaInput = () => {
        setMediaInput(!mediaInput)
    }

    const createNewReply = () => {
        const newReply: NewReply = {
            postID: reply._id,
            parentType: reply.type,
            authorID: user.userID,
            caption: replyCaption,
            mediaURL: replyMediaUrls
        }
        dispatch(createReply(newReply))
        setReplyCaption("");
        openReplyModal()
    }

    const createNewRepost = () => {
        const newRepost: NewRepost = {
            postID: reply._id,
            parentType: reply.type,
            authorID: user.userID,
            caption: repostCaption
        }

        dispatch(createRepost(newRepost))
    }
    return (
        <div className='w-full flex flex-col'
            onClick={(event: any) => event.stopPropagation()} >
            <CardInteractions
                isLiked={reply.isLiked}
                likeButton={likeButton}
                unlikeButton={unlikeButton}
                likesCount={reply.likesCount}
                repliesCount={reply.repliesCount}
                repostsCount={reply.repostsCount}
                openReplyModal={openReplyModal}
                openRepostModal={openRepostModal} />
            {replyModal &&
                <CardReplyModal
                    setModal={setReplyModal}
                    authorUserName={reply.postAuthorUserName}
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
                    authorAvatarURL={reply.postAuthorAvatarURL}
                    firstName={user.userFirstName}
                    middleName={user.userMiddleName}
                    lastName={user.userLastName}
                    userName={user.userName}
                    repostCaption={repostCaption}
                    postAuthorFirstName={reply.postAuthorFirstName}
                    postAuthorMiddleName={reply.postAuthorMiddleName}
                    postAuthorLastName={reply.postAuthorLastName}
                    postAuthorUserName={reply.postAuthorUserName}
                    parentCaption={reply.caption}
                    setRepostCaption={setRepostCaption}
                    parentMediaURL={reply.mediaURL}
                    confirmButtonFunctions={[createNewRepost, openRepostModal]}
                    cancelButtonFunctions={[openRepostModal]} />
            }
        </div>
    )
}

export default ReplyInteractions
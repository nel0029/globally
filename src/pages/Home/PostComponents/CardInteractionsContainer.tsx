import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createReply, like, unlike, createRepost } from '../../../redux/asynActions/postAsynActions';
import { AppDispatch } from '../../../redux/store';
import { NewReply, NewRepost, UnlikeData, NewLike } from '../../../types/PostActionTypes';
import CardInteractions from './CardInteractions';
import CardReplyModal from './CardReplyModal';
import CardRepostModal from './CardRepostModal';
import { CardProps } from './Card';


const CardInteractionsContainer = (card: CardProps) => {

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
            postID: card._id,
            parentType: card.type,
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
            postID: card._id,
            parentType: card.type,
            authorID: user.userID,
            caption: replyCaption,
            mediaURL: replyMediaUrls
        }
        dispatch(createReply(newReply))
        openReplyModal()
    }
    const likeButton = () => {
        const likeData: NewLike = {
            postID: card._id,
            parentType: card.type,
            authorID: user.userID,
        };
        dispatch(like(likeData));
    };

    const unlikeButton = () => {
        const likeData: UnlikeData = {
            likeID: card.likeID !== null ? card.likeID : '',
            authorID: user.userID,
        };
        dispatch(unlike(likeData));
    };

    return (
        <div className='w-full flex flex-col border-t dark:border-t dark:border-Dark400'
            onClick={(event: any) => event.stopPropagation()} >
            <CardInteractions
                isLiked={card.isLiked}
                likeButton={likeButton}
                unlikeButton={unlikeButton}
                likesCount={card.likesCount}
                repliesCount={card.repliesCount}
                repostsCount={card.repostsCount}
                openReplyModal={openReplyModal}
                openRepostModal={openRepostModal} />
            {replyModal &&
                <CardReplyModal
                    setModal={setReplyModal}
                    authorUserName={card.postAuthorUserName}
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
                    authorAvatarURL={card.postAuthorAvatarURL}
                    firstName={user.userFirstName}
                    middleName={user.userMiddleName}
                    lastName={user.userLastName}
                    userName={user.userName}
                    repostCaption={repostCaption}
                    postAuthorFirstName={card.postAuthorFirstName}
                    postAuthorMiddleName={card.postAuthorMiddleName}
                    postAuthorLastName={card.postAuthorLastName}
                    postAuthorUserName={card.postAuthorUserName}
                    parentCaption={card.caption}
                    setRepostCaption={setRepostCaption}
                    parentMediaURL={card.mediaURL}
                    confirmButtonFunctions={[createNewRepost, openRepostModal]}
                    cancelButtonFunctions={[openRepostModal]} />
            }
        </div>
    )
}

export default CardInteractionsContainer
import React, { useState } from 'react'
import { PostsDataProps } from '../../../types/PostTypes';
import { useDispatch, useSelector } from 'react-redux'
import { createReply, like, unlike, createRepost } from '../../../redux/asynActions/postAsynActions';
import { AppDispatch } from '../../../redux/store';
import { NewReply, NewRepost, UnlikeData } from '../../../types/PostActionTypes';
import CardInteractions from '../../Home/PostComponents/CardInteractions';
import CardReplyModal from '../../Home/PostComponents/CardReplyModal';
import CardRepostModal from '../../Home/PostComponents/CardRepostModal';
import { CardDetailsProps } from './CardDetails';
import DetailsInteractions from './DetailsInteractions';


const CardDetailsInteractions = (details: CardDetailsProps) => {
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
            postID: details._id,
            parentType: details.type,
            authorID: user.userID,
            caption: repostCaption
        }

        dispatch(createRepost(newRepost))
        setRepostCaption("");
        openRepostModal()
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
            postID: details._id,
            parentType: details.type,
            authorID: user.userID,
            caption: replyCaption,
            mediaURL: replyMediaUrls
        }
        dispatch(createReply(newReply))
        setReplyCaption("");
        openReplyModal()
    }
    const likeButton = () => {
        const likeData = {
            actionType: 'like',
            postID: details._id,
            parentType: details.type,
            authorID: user.userID,
        };
        dispatch(like(likeData));
    };

    const unlikeButton = () => {
        const likeData: UnlikeData = {
            likeID: details.likeID !== null ? details.likeID : '',
            authorID: user.userID,
        };
        dispatch(unlike(likeData));
    };


    return (
        <div className='w-full flex flex-col transition-all ease-in duration-1000 '
            onClick={(event: any) => event.stopPropagation()} >
            <DetailsInteractions
                isLiked={details.isLiked}
                likeButton={likeButton}
                unlikeButton={unlikeButton}
                openReplyModal={openReplyModal}
                openRepostModal={openRepostModal} />

            {replyModal &&
                <CardReplyModal
                    setModal={setReplyModal}
                    authorUserName={details.postAuthorUserName}
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
                    authorAvatarURL={details.postAuthorAvatarURL}
                    firstName={user.userFirstName}
                    middleName={user.userMiddleName}
                    lastName={user.userLastName}
                    userName={user.userName}
                    repostCaption={repostCaption}
                    postAuthorFirstName={details.postAuthorFirstName}
                    postAuthorMiddleName={details.postAuthorMiddleName}
                    postAuthorLastName={details.postAuthorLastName}
                    postAuthorUserName={details.postAuthorUserName}
                    parentCaption={details.caption}
                    setRepostCaption={setRepostCaption}
                    parentMediaURL={details.mediaURL}
                    confirmButtonFunctions={[createNewRepost]}
                    cancelButtonFunctions={[openRepostModal]} />
            }
        </div>
    )
}

export default CardDetailsInteractions
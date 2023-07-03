import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createReply, like, unlike, createRepost } from '../../../redux/asynActions/postAsynActions';
import { AppDispatch } from '../../../redux/store';
import { NewReply, NewRepost, UnlikeData, NewLike } from '../../../types/PostActionTypes';
import CardInteractions from './CardInteractions';
import CardReplyModal from './CardReplyModal';
import CardRepostModal from './CardRepostModal';
import { CardProps } from './Card';
import socket from '../../../sockets/socket';


const CardInteractionsContainer = (card: CardProps) => {

    const user = useSelector((state: any) => state.user.userData)
    const dispatch = useDispatch<AppDispatch>();
    const [replyModal, setReplyModal] = useState(false)
    const [replyCaption, setReplyCaption] = useState("")
    const [repostModal, setRepostModal] = useState(false)
    const [repostCaption, setRepostCaption] = useState("")
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);


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
            .then((response: any) => socket.emit("newRepost", {
                postID: card._id,
                actorID: user.userID,
                targetID: card.authorID,
                actionID: response.payload._id,
                actionType: "repost",
                postType: card.type
            }))
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
            files: selectedFiles
        }
        dispatch(createReply(newReply))
            .then((response: any) => socket.emit("newReply", {
                postID: card._id,
                actorID: user.userID,
                targetID: card.authorID,
                actionID: response.payload._id,
                actionType: "reply",
                postType: card.type
            }))
        openReplyModal()
    }
    const likeButton = () => {
        const likeData: NewLike = {
            postID: card._id,
            parentType: card.type,
            authorID: user.userID,
            parentAuthorID: card.authorID
        };

        dispatch(like(likeData))
            .then((response) => socket.emit("newLike", {
                postID: card._id,
                actorID: user.userID,
                targetID: card.authorID,
                actionID: response.payload._id,
                actionType: "like",
                postType: card.type
            }))
    };

    const unlikeButton = async () => {
        const likeData: UnlikeData = {
            likeID: card.likeID !== null ? card.likeID : '',
            authorID: user.userID,
        };
        socket.emit("unlike", {
            actionID: card.likeID,
            actorID: user.userID,
            targetID: card.authorID
        })
        dispatch(unlike(likeData))

    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files) {
            const filesArray = Array.from(files);
            setSelectedFiles(filesArray);
        }
    };

    const removeSelectedFile = (index: number) => {
        const updatedFiles = [...selectedFiles];
        updatedFiles.splice(index, 1);
        setSelectedFiles(updatedFiles);
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
                    handleFileChange={handleFileChange}
                    fileInputID='cardInputFileID'
                    removeSelectedFile={removeSelectedFile}
                    selectedFiles={selectedFiles}
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
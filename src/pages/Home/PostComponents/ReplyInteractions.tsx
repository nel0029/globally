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
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const [repostCaption, setRepostCaption] = useState("")


    //functions
    const likeButton = () => {
        const likeData: NewLike = {
            postID: reply._id,
            parentType: reply.type,
            authorID: user.userID,
            parentAuthorID: reply.authorID
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



    const createNewReply = () => {
        const newReply: NewReply = {
            postID: reply._id,
            parentType: reply.type,
            authorID: user.userID,
            caption: replyCaption,
            files: selectedFiles
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
                    selectedFiles={selectedFiles}
                    handleFileChange={handleFileChange}
                    removeSelectedFile={removeSelectedFile}
                    fileInputID={reply._id}
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
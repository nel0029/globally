import React, { useState } from 'react'
import { RepostDataProps } from '../../../types/PostTypes'
import { useDispatch, useSelector } from 'react-redux'
import { createReply, like, unlike, createRepost } from '../../../redux/asynActions/postAsynActions';
import { NewLike, NewReply, NewRepost, UnlikeData } from '../../../types/PostActionTypes';
import { AppDispatch } from '../../../redux/store'
import CardInteractions from './CardInteractions'
import CardReplyModal from './CardReplyModal'
import CardRepostModal from './CardRepostModal'



const RepostInteractions = (repost: RepostDataProps) => {
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
            postID: repost._id,
            parentType: repost.type,
            authorID: repost.authorID,
        };
        dispatch(like(likeData));
    };

    const unlikeButton = () => {
        const likeData: UnlikeData = {
            likeID: repost.likeID !== null ? repost.likeID : '',
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
            postID: repost._id,
            parentType: repost.type,
            authorID: user.userID,
            caption: replyCaption,
            file: selectedFiles
        }
        dispatch(createReply(newReply))
        openReplyModal()
    }

    const createNewRepost = () => {
        const newRepost: NewRepost = {
            postID: repost._id,
            parentType: repost.type,
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
        <div className='w-full flex flex-col '
            onClick={(event: any) => event.stopPropagation()} >
            <CardInteractions
                isLiked={repost.isLiked}
                likeButton={likeButton}
                unlikeButton={unlikeButton}
                likesCount={repost.likesCount}
                repliesCount={repost.repliesCount}
                repostsCount={repost.repostsCount}
                openReplyModal={openReplyModal}
                openRepostModal={openRepostModal} />
            {replyModal &&
                <CardReplyModal
                    setModal={setReplyModal}
                    authorUserName={repost.postAuthorUserName}
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
                    fileInputID={repost._id}
                    confirmButtonFunctions={[createNewReply, openReplyModal]}
                    cancelButtonFunctions={[openReplyModal]} />
            }

            {repostModal &&
                <CardRepostModal
                    setModal={setRepostModal}
                    avatarURL={user.avatarURL}
                    authorAvatarURL={repost.postAuthorAvatarURL}
                    firstName={user.userFirstName}
                    middleName={user.userMiddleName}
                    lastName={user.userLastName}
                    userName={user.userName}
                    repostCaption={repostCaption}
                    postAuthorFirstName={repost.postAuthorFirstName}
                    postAuthorMiddleName={repost.postAuthorMiddleName}
                    postAuthorLastName={repost.postAuthorLastName}
                    postAuthorUserName={repost.postAuthorUserName}
                    parentCaption={repost.caption}
                    setRepostCaption={setRepostCaption}
                    parentMediaURL={repost.mediaURL}
                    confirmButtonFunctions={[createNewRepost, openRepostModal]}
                    cancelButtonFunctions={[openRepostModal]} />
            }
        </div>
    )
}

export default RepostInteractions
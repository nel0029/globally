import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import IonIcon from '@reacticons/ionicons'
import MenuContainer from '../../../common/MenuContainer'
import MenuItem from '../../../common/MenuItem'
import MenuButton from '../../../common/MenuButton'
import ConfirmButton from '../../../common/ConfirmButton'
import CancelButton from '../../../common/CancelButton'
import DeleteButton from '../../../common/DeleteButton'
import Modal from '../../../common/Modal'
import { CardDetailsProps } from './CardDetails'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../../../redux/store'
import { updatePost, deletePost, updateReply, updateRepost, deleteReply, deleteRepost } from '../../../redux/asynActions/postAsynActions'
import { UpdatePostData } from '../../../types/PostActionTypes'
import TextAreaInput from '../../../common/TextAreaInput'
import socket from '../../../sockets/socket'



interface DeleteDataProps {
    authorID: string
    postID: string
}

interface CardHeaderProps extends CardDetailsProps {
    updateAction: string
    deleteAction: string
}

const CardDetailsHeaderMenu: React.FC<CardHeaderProps> = ({ updateAction, deleteAction, ...card }) => {

    const dispatch = useDispatch<AppDispatch>();
    const user = useSelector((state: any) => state.user.userData)
    const [editModal, setEditModal] = useState(false)
    const [deleteModal, setDeleteModal] = useState(false)
    const [initialPostCaption, setInitialPostCaption] = useState(card.caption);
    const [postCaption, setPostCaption] = useState(card.caption);
    const authorized = (card.postAuthorUserName == user.userName)
    const navigate = useNavigate()



    const openEditModal = () => {
        setEditModal(!editModal)
        if (editModal == false) {
            document.body.style.overflow = 'hidden'
            setPostCaption(initialPostCaption)
        } else {
            document.body.style.overflow = 'auto'
        }
    }

    const editPost = () => {
        const payload: UpdatePostData = {
            _id: card._id,
            authorID: user.userID,
            caption: postCaption
        }


        switch (updateAction) {
            case "reply":
                dispatch(updateReply(payload))
                break
            case "repost":
                dispatch(updateRepost(payload))
                break
            default:
                dispatch(updatePost(payload))
                break
        }
        setInitialPostCaption(postCaption); // Update the initial value after editing

    };

    const openDeleteModal = () => {
        setDeleteModal(!deleteModal)
    }

    const removePost = () => {
        const payload: DeleteDataProps = {
            authorID: user.userID,
            postID: card._id,
        }

        switch (updateAction) {
            case "reply":
                socket.emit("deleteReply", {
                    actorID: user.userID,
                    targetID: card.authorID,
                    actionID: card._id,
                })
                dispatch(deleteReply(payload))
                break
            case "repost":
                socket.emit("deleteRepost", {
                    actorID: user.userID,
                    targetID: card.authorID,
                    actionID: card._id,

                })
                dispatch(deleteRepost(payload))
                break
            default:
                dispatch(deletePost(payload))
                break
        };
        openDeleteModal()
        navigate(-1)
    }

    return (
        <div>
            <div className='z-10'>
                <MenuContainer >
                    {card.authorID !== user.userID ? (
                        <MenuItem>
                            {card.isFollowedAuthor ? (
                                <MenuButton>
                                    <IonIcon name='person-remove-outline' />
                                    <p className='whitespace-nowrap'>
                                        Unfollow <span className='font-bold'>@{card.postAuthorUserName}</span>
                                    </p>

                                </MenuButton>
                            ) : (
                                <MenuButton >
                                    <IonIcon name='person-add-outline' />
                                    <p className='whitespace-nowrap'>
                                        Follow <span className='font-bold'>@{card.postAuthorUserName}</span>
                                    </p>
                                </MenuButton>
                            )}
                        </MenuItem>) : ''}

                    {authorized && (
                        <MenuItem>
                            <MenuButton onClick={[openEditModal]}>
                                <IonIcon name='pencil-outline' />
                                <p className='whitespace-nowrap'>
                                    Edit Post Caption
                                </p>
                            </MenuButton>
                        </MenuItem>)}

                    {authorized && (
                        <MenuItem>
                            <button
                                onClick={openDeleteModal}
                                className='w-full px-2 py-1 flex flex-row items-center gap-x-2 text-base'>
                                <IonIcon name='trash-outline' />
                                <p className='whitespace-nowrap'>
                                    Delete Post
                                </p>
                            </button>
                        </MenuItem>
                    )}

                </MenuContainer>
            </div>
            {
                editModal && (
                    <Modal setModal={setEditModal}>
                        <div className='w-full flex flex-row justify-start items-center gap-x-2 py-1'>
                            <img className='w-[40px] rounded-full' src={card.postAuthorAvatarURL.url} />
                            <div className='flex-grow flex flex-col justify-center leading-none'>
                                <p className='text-base font-bold'>
                                    {card.postAuthorFirstName} {card.postAuthorMiddleName} {card.postAuthorLastName}
                                </p>
                                <p className='text-sm'>
                                    @{card.postAuthorUserName}
                                </p>
                            </div>
                        </div>
                        <div className='w-full'>
                            <TextAreaInput
                                placeholder='Edit your post'
                                body={postCaption}
                                setBody={setPostCaption} />
                        </div>
                        <div className='w-full'>
                            <p>{99 - postCaption.length} characters remaining</p>
                        </div>
                        <div className='w-full flex flex-row justify-end gap-x-2'>
                            <CancelButton onClick={[openEditModal]}>
                                Cancel
                            </CancelButton>
                            <ConfirmButton onClick={[editPost, openEditModal]}>
                                Update
                            </ConfirmButton>

                        </div>
                    </Modal>)
            }
            {
                deleteModal && (
                    <Modal setModal={setDeleteModal}>
                        <div className='font-bold'>Deleting Post</div>
                        <div className='py-5'>
                            <p className='break-all text-center'> Are you sure you want to delete this Post?</p>
                        </div>
                        <div className='w-full flex justify-end items-center gap-x-2'>

                            <CancelButton onClick={[openDeleteModal]}>
                                Cancel
                            </CancelButton>
                            <DeleteButton onClick={[removePost]}>
                                Delete
                            </DeleteButton>
                        </div>
                    </Modal>)
            }
        </div>

    )
}

export default CardDetailsHeaderMenu
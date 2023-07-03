import React, { useState } from 'react'
import { ReplyDataProps } from '../../../types/PostTypes'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import MenuContainer from '../../../common/MenuContainer';
import MenuItem from '../../../common/MenuItem';
import Modal from '../../../common/Modal';
import IonIcon from '@reacticons/ionicons';
import ConfirmButton from '../../../common/ConfirmButton';
import CancelButton from '../../../common/CancelButton';
import { AppDispatch } from '../../../redux/store';
import { DeleteReplyData, GetUserDetailsData, UpdateReply } from '../../../types/PostActionTypes';
import { deleteReply, getUserDetails, updateReply } from '../../../redux/asynActions/postAsynActions';
import CardHeader from './CardHeader';
import DeleteButton from '../../../common/DeleteButton';
import { CardProps } from './Card';
import MenuButton from '../../../common/MenuButton';
import TextAreaInput from '../../../common/TextAreaInput';
import socket from '../../../sockets/socket';

export interface HeaderProps {
    reply: CardProps
    authorized: boolean
}

const ReplyHeader: React.FC<HeaderProps> = ({ reply, authorized }) => {
    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>()
    const user = useSelector((state: any) => state.user.userData)
    const [editModal, setEditModal] = useState(false)
    const [deleteModal, setDeleteModal] = useState(false)
    const [initialReplyCaption, setInitialReplyCaption] = useState(reply.caption);
    const [replyCaption, setReplyCaption] = useState(reply.caption);


    const openEditModal = () => {
        setEditModal(!editModal)
        if (editModal == false) {
            document.body.style.overflow = 'hidden'
            setReplyCaption(initialReplyCaption)
        } else {
            document.body.style.overflow = 'auto'
        }
    }

    const openDeleteModal = () => {
        setDeleteModal(!deleteModal)
    }

    const editReply = () => {
        const updateReplyData: UpdateReply = {
            _id: reply._id,
            authorID: user.userID,
            caption: replyCaption
        }
        dispatch(updateReply(updateReplyData));
        setInitialReplyCaption(replyCaption); // Update the initial value after editing
    };


    const removeReply = () => {
        const deleteReplyData: DeleteReplyData = {
            authorID: user.userID,
            postID: reply._id
        }
        socket.emit("deleteReply", {
            actorID: user.userID,
            targetID: reply.authorID,
            actionID: reply._id,
        })

        dispatch(deleteReply(deleteReplyData))
        openDeleteModal()
    }


    return (
        <div className='w-full flex flex-row flex-shrink'>
            <CardHeader
                firstName={reply.postAuthorFirstName}
                middleName={reply.postAuthorMiddleName}
                lastName={reply.postAuthorLastName}
                userName={reply.postAuthorUserName}
                createdAt={reply.createdAt} />

            <div className='overflow-visible'>
                <MenuContainer >
                    {reply.authorID !== user.userID ? (
                        <MenuItem>
                            {reply.isFollowedAuthor ? (
                                <MenuButton>
                                    <IonIcon name='person-remove-outline' />
                                    <p className='whitespace-nowrap'>
                                        Unfollow <span className='font-bold'>@{reply.postAuthorUserName}</span>
                                    </p>

                                </MenuButton>
                            ) : (
                                <MenuButton >
                                    <IonIcon name='person-add-outline' />
                                    <p className='whitespace-nowrap'>
                                        Follow <span className='font-bold'>@{reply.postAuthorUserName}</span>
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
                                    Delete Reply
                                </p>
                            </button>
                        </MenuItem>
                    )}

                </MenuContainer>
            </div>

            {editModal && (
                <Modal setModal={setEditModal}>
                    <div className='w-full flex flex-row justify-start items-center gap-x-2 py-1'>
                        <img className='w-[40px] rounded-full' src={reply.postAuthorAvatarURL.url} />
                        <div className='flex-grow flex flex-col justify-center leading-none'>
                            <p className='text-base font-bold'>
                                {reply.postAuthorFirstName} {reply.postAuthorMiddleName} {reply.postAuthorLastName}
                            </p>
                            <p className='text-sm'>
                                @{reply.postAuthorUserName}
                            </p>
                        </div>
                    </div>
                    <div className='w-full'>
                        <TextAreaInput
                            placeholder='Edit your reply'
                            body={replyCaption}
                            setBody={setReplyCaption} />
                    </div>
                    <div className='w-full'>
                        <p>{99 - replyCaption.length} characters remaining</p>
                    </div>
                    <div className='w-full flex flex-row justify-end gap-x-2'>
                        <CancelButton onClick={[openEditModal]}>
                            Cancel
                        </CancelButton>
                        <ConfirmButton onClick={[editReply, openEditModal]}>
                            Update
                        </ConfirmButton>

                    </div>
                </Modal>)}
            {deleteModal && (
                <Modal setModal={setDeleteModal}>
                    <div className='font-bold'>Deleting Post</div>
                    <div className='py-5'>
                        <p className='break-all text-center'> Are you sure you want to delete this Post?</p>
                    </div>
                    <div className='w-full flex justify-end items-center gap-x-2'>

                        <CancelButton onClick={[openDeleteModal]}>
                            Cancel
                        </CancelButton>
                        <DeleteButton onClick={[removeReply]}>
                            Delete
                        </DeleteButton>
                    </div>
                </Modal>)}

        </div>

    )
}

export default ReplyHeader
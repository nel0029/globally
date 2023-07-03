import React, { useState } from 'react'
import { RepostDataProps } from '../../../types/PostTypes'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import MenuContainer from '../../../common/MenuContainer';
import MenuItem from '../../../common/MenuItem';
import MenuButton from '../../../common/MenuButton';
import Modal from '../../../common/Modal';
import IonIcon from '@reacticons/ionicons';
import ConfirmButton from '../../../common/ConfirmButton';
import CancelButton from '../../../common/CancelButton';
import DeleteButton from '../../../common/DeleteButton';
import { AppDispatch } from '../../../redux/store';
import { DeleteRepostData, GetUserDetailsData, UpdateRepost } from '../../../types/PostActionTypes';
import { deleteRepost, getUserDetails, updateRepost } from '../../../redux/asynActions/postAsynActions';
import CardHeader from './CardHeader';
import { CardProps } from './Card';
import TextAreaInput from '../../../common/TextAreaInput';
import socket from '../../../sockets/socket';

export interface HeaderProps {
    repost: CardProps
    authorized: boolean
}


const Rerepost: React.FC<HeaderProps> = ({ repost, authorized }) => {
    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>()
    const user = useSelector((state: any) => state.user.userData)
    const [editModal, setEditModal] = useState(false)
    const [deleteModal, setDeleteModal] = useState(false)
    const [initialRepostCaption, setInitialRepostCaption] = useState(repost.caption);
    const [repostCaption, setRepostCaption] = useState(repost.caption);


    const dateAndTime = new Date(repost.createdAt)
    const formattedDateAndTime = `${dateAndTime.toLocaleTimeString('en-us', {
        timeZone: 'Asia/Manila',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
    })} | ${dateAndTime.toLocaleDateString('en-us', {
        timeZone: 'Asia/Manila',
        month: '2-digit',
        day: '2-digit',
        year: 'numeric',
    })}`;

    const userProfile = (event: any) => {

        const data: GetUserDetailsData = {
            userName: repost.postAuthorUserName,
            authorID: user.userID
        }
        dispatch(getUserDetails(data))

        navigate(`/${repost.postAuthorUserName}`)
        event.stopPropagation()
    }

    const openEditModal = () => {
        setEditModal(!editModal)
        if (editModal == false) {
            document.body.style.overflow = 'hidden'
            setRepostCaption(initialRepostCaption)
        } else {
            document.body.style.overflow = 'auto'
        }
    }

    const openDeleteModal = () => {
        setDeleteModal(!deleteModal)
    }

    const editRepost = () => {
        const updateRepostData: UpdateRepost = {
            _id: repost._id,
            authorID: user.userID,
            caption: repostCaption
        }
        dispatch(updateRepost(updateRepostData));
        setInitialRepostCaption(repostCaption); // Update the initial value after editing
    };


    const removeRepost = () => {
        const deleteRepostData: DeleteRepostData = {
            authorID: user.userID,
            postID: repost._id
        }

        socket.emit("deleteRepost", {
            actorID: user.userID,
            targetID: repost.authorID,
            actionID: repost._id,

        })
        dispatch(deleteRepost(deleteRepostData))
        openDeleteModal()
    }
    return (
        <div className='w-full flex flex-row flex-shrink'>
            <CardHeader
                firstName={repost.postAuthorFirstName}
                middleName={repost.postAuthorMiddleName}
                lastName={repost.postAuthorLastName}
                userName={repost.postAuthorUserName}
                createdAt={repost.createdAt} />

            <div className='overflow-visible'>
                <MenuContainer >
                    {repost.authorID !== user.userID ? (
                        <MenuItem>
                            {repost.isFollowedAuthor ? (
                                <MenuButton>
                                    <IonIcon name='person-remove-outline' />
                                    <p className='whitespace-nowrap'>
                                        Unfollow <span className='font-bold'>@{repost.postAuthorUserName}</span>
                                    </p>

                                </MenuButton>
                            ) : (
                                <MenuButton >
                                    <IonIcon name='person-add-outline' />
                                    <p className='whitespace-nowrap'>
                                        Follow <span className='font-bold'>@{repost.postAuthorUserName}</span>
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
                                    Delete Repost
                                </p>
                            </button>
                        </MenuItem>
                    )}
                </MenuContainer>
            </div>

            {editModal && (
                <Modal setModal={setEditModal}>
                    <div className='w-full flex flex-row justify-start items-center gap-x-2 py-1'>
                        <img className='w-[40px] rounded-full' src={repost.postAuthorAvatarURL.url} />
                        <div className='flex-grow flex flex-col justify-center leading-none'>
                            <p className='text-base font-bold'>
                                {repost.postAuthorFirstName} {repost.postAuthorMiddleName} {repost.postAuthorLastName}
                            </p>
                            <p className='text-sm'>
                                @{repost.postAuthorUserName}
                            </p>
                        </div>
                    </div>
                    <div className='w-full'>
                        <TextAreaInput
                            placeholder='Edit your post'
                            body={repostCaption}
                            setBody={setRepostCaption} />
                    </div>
                    <div className='w-full'>
                        <p>{99 - repostCaption.length} characters remaining</p>
                    </div>
                    <div className='w-full flex flex-row justify-end gap-x-2'>
                        <CancelButton onClick={[openEditModal]}>
                            Cancel
                        </CancelButton>
                        <ConfirmButton onClick={[editRepost, openEditModal]}>
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
                        <DeleteButton onClick={[removeRepost]}>
                            Delete
                        </DeleteButton>
                    </div>
                </Modal>)}

        </div>

    )
}

export default Rerepost
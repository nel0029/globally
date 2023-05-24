import React, { useContext, useState, useRef, useEffect, useMemo } from 'react'
import IonIcon from '@reacticons/ionicons';
import { NavLink, useNavigate } from 'react-router-dom';
import { PostsDataProps } from '../../../types/PostTypes';
import MenuContainer from '../../../common/MenuContainer';
import MenuItem from '../../../common/MenuItem';
import { useDispatch, useSelector } from 'react-redux';
import Modal from '../../../common/Modal';
import { deletePost, updatePost } from '../../../redux/asynActions/postAsynActions';
import { AppDispatch } from '../../../redux/store';
import { DeletePostData, UpdatePost } from '../../../types/PostActionTypes';


export default function PostHeader(postHeaderObject: PostsDataProps) {
    const dispatch = useDispatch<AppDispatch>();
    const user = useSelector((state: any) => state.posts.userData)
    const [editModal, setEditModal] = useState(false)
    const [deleteModal, setDeleteModal] = useState(false)
    const [postHeader, setPostHeader] = useState(postHeaderObject)
    const [initialPostCaption, setInitialPostCaption] = useState(postHeaderObject.caption);
    const [postCaption, setPostCaption] = useState(postHeaderObject.caption);
    const navigate = useNavigate()
    const authorized = (postHeader.userName == user.userName)

    const userProfile = (event: any) => {
        navigate(`/${postHeader.userName}`)
        event.stopPropagation()
    }
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
        const updatePostData: UpdatePost = {
            actionType: 'update-post',
            postID: postHeaderObject._id,
            userID: user.userID,
            caption: postCaption
        }
        dispatch(updatePost(updatePostData));
        setInitialPostCaption(postCaption); // Update the initial value after editing
    };

    const openDeleteModal = () => {
        setDeleteModal(!deleteModal)
    }

    const removePost = () => {
        const deletePostData: DeletePostData = {
            userID: user.userID,
            postID: postHeaderObject._id,
            actionType: "delete-post",
        }
        dispatch(deletePost(deletePostData))
        openDeleteModal()
    }
    const dateAndTime = new Date(postHeader.createdAt)
    const formattedDateAndTime = dateAndTime.toLocaleString('en-us', {
        timeZone: 'Asia/Manila',
        month: '2-digit',
        day: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    })
    return (
        <div
            className='relative flex flex-row w-full h-auto justify-center items-center pb-1'>
            <div className='flex-1 flex flex-col justify-center gap-x-2 flex-grow leading-none'>

                <div
                    onClick={userProfile}
                    className=' flex-wrap flex flex-row items-center gap-x-2 text-xs md:text-base'>
                    <div className='hover:underline hover:text-secondary font-bold'>
                        {postHeader.postAuthorFirstName} {postHeader.postAuthorMiddleName} {postHeader.postAuthorLastName}
                    </div>
                    <div className=' font-light'>
                        @{postHeader.userName}
                    </div>
                </div>
                <div className='text-xs xl:text-sm text-gray-500'>
                    ● {formattedDateAndTime}
                </div>
            </div>
            <MenuContainer >
                {postHeader.userName !== user.userName ? (<MenuItem>
                    <button
                        className='w-full px-2 py-1 flex flex-row items-center gap-x-2 text-base'>
                        <IonIcon name='add-outline' />
                        <p className='whitespace-nowrap'>
                            Follow <span className='font-bold'>@{postHeader.userName}</span>
                        </p>
                    </button>
                </MenuItem>) : ''}

                {authorized && (
                    <MenuItem>
                        <button
                            onClick={openEditModal}
                            className='w-full px-2 py-1 flex flex-row items-center gap-x-2 text-base'>
                            <IonIcon name='pencil-outline' />
                            <p className='whitespace-nowrap'>
                                Edit Post Caption
                            </p>
                        </button>
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
            {editModal && (
                <Modal setModal={setEditModal}>
                    <div className='w-full flex flex-row justify-start items-center gap-x-2 py-1'>
                        <img className='w-[40px] rounded-full' src={postHeader.avatarURL} />
                        <div className='flex-grow flex flex-col justify-center leading-none'>
                            <p className='text-base font-bold'>
                                {postHeader.postAuthorFirstName} {postHeader.postAuthorMiddleName} {postHeader.postAuthorLastName}
                            </p>
                            <p className='text-sm'>
                                @{postHeader.userName}
                            </p>
                        </div>
                    </div>
                    <div className='w-full'>
                        <textarea
                            maxLength={99}
                            value={postCaption}
                            onChange={(event) => setPostCaption(event.target.value)}
                            className='border w-full h-[150px] resize-none rounded-lg p-1'
                            placeholder='Create a new post'
                        />
                    </div>
                    <div className='w-full'>
                        <p>{99 - postCaption.length} characters remaining</p>
                    </div>
                    <div className='w-full flex flex-row justify-end gap-x-2'>
                        <button
                            className='rounded-lg border-2 border-slate-400 px-3 py-1'
                            onClick={() => { openEditModal() }}>
                            Cancel
                        </button>
                        <button
                            className='rounded-lg border-2 border-secondary bg-secondary px-3 text-white py-1'
                            onClick={() => {
                                editPost(),
                                    openEditModal()
                            }}>
                            Submit Changes
                        </button>
                    </div>
                </Modal>)}
            {deleteModal && (
                <Modal setModal={setDeleteModal}>
                    <div className='font-bold'>Deleting Post</div>
                    <div className='py-5'>
                        <p className='break-all text-center'> Are you sure you want to delete this Post?</p>
                    </div>
                    <div className='w-full flex justify-end items-center gap-x-2'>
                        <button onClick={() => setDeleteModal(!deleteModal)} className='px-3 py-1 rounded border border-light_gray bg-light_gray'>
                            Cancel
                        </button>
                        <button onClick={removePost}
                            className='px-3 py-1 rounded border border-secondary bg-secondary '>
                            Delete
                        </button>
                    </div>
                </Modal>)}
        </div>
    )
}

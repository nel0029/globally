import React, { useContext, useState, useRef, useEffect, useMemo } from 'react'
import { IonIcon } from '@ionic/react'
import { NavLink, useNavigate } from 'react-router-dom';
import { PostsDataProps } from '../../../types/PostTypes';
import MenuContainer from '../../../common/MenuContainer';
import MenuItem from '../../../common/MenuItem';
import { useDispatch, useSelector } from 'react-redux';
import Modal from '../../../common/Modal';
import { deletePost, getUserDetails, updatePost } from '../../../redux/asynActions/postAsynActions';
import { AppDispatch } from '../../../redux/store';
import { DeletePostData, GetUserDetailsData, UpdatePostData } from '../../../types/PostActionTypes';
import CancelButton from '../../../common/CancelButton';
import ConfirmButton from '../../../common/ConfirmButton';
import MenuButton from '../../../common/MenuButton';
import CardHeader from './CardHeader';
import DeleteButton from '../../../common/DeleteButton';
import { CardProps } from './Card';
import TextAreaInput from '../../../common/TextAreaInput';
import FollowButtonsCotainer from '../../../common/FollowButtonsCotainer';

export interface HeaderProps {
    post: CardProps
    authorized: boolean
}

const post: React.FC<HeaderProps> = ({ post, authorized }) => {
    const dispatch = useDispatch<AppDispatch>();
    const user = useSelector((state: any) => state.user.userData)
    const [editModal, setEditModal] = useState(false)
    const [deleteModal, setDeleteModal] = useState(false)
    const [initialPostCaption, setInitialPostCaption] = useState(post.caption);
    const [postCaption, setPostCaption] = useState(post.caption);
    const navigate = useNavigate()

    const userProfile = (event: any) => {

        const data: GetUserDetailsData = {
            userName: post.postAuthorUserName,
            authorID: user.userID
        }
        dispatch(getUserDetails(data))

        navigate(`/${post.postAuthorUserName}`)

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
        const updatePostData: UpdatePostData = {
            _id: post._id,
            authorID: user.userID,
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
            authorID: user.userID,
            postID: post._id,
        }
        dispatch(deletePost(deletePostData))

        openDeleteModal()
    }
    return (
        <div className=' w-full flex flex-row flex-shrink'>
            <CardHeader
                firstName={post.postAuthorFirstName}
                middleName={post.postAuthorMiddleName}
                lastName={post.postAuthorLastName}
                userName={post.postAuthorUserName}
                createdAt={post.createdAt} />

            <div className='overflow-visible'>
                <MenuContainer >

                    {post.authorID !== user.userID ? (
                        <FollowButtonsCotainer
                            authorID={post.authorID}
                            postAuthorUserName={post.postAuthorUserName}
                            isFollowedAuthor={post.isFollowedAuthor}
                            followID={post.followID} />
                    ) : null}

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

            {editModal && (
                <Modal setModal={setEditModal}>
                    <div className='w-full flex flex-row justify-start items-center gap-x-2 py-1'>
                        <img className='w-[40px] rounded-full' src={post.postAuthorAvatarURL.url} />
                        <div className='flex-grow flex flex-col justify-center leading-none'>
                            <p className='text-base font-bold'>
                                {post.postAuthorFirstName} {post.postAuthorMiddleName} {post.postAuthorLastName}
                            </p>
                            <p className='text-sm'>
                                @{post.postAuthorUserName}
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
                        <DeleteButton onClick={[removePost]}>
                            Delete
                        </DeleteButton>
                    </div>
                </Modal>)}

        </div>

    )
}

export default post
import React from 'react'
import Modal from '../../../common/Modal'
import ConfirmButton from '../../../common/ConfirmButton'
import CancelButton from '../../../common/CancelButton'

interface CardEditModalProps {
    editModal: boolean
    setModal: React.Dispatch<React.SetStateAction<boolean>>
    avatarURL: string
    postAuthorFirstName: string
    postAuthorMiddleName: string
    postAuthorLastName: string
    userName: string
    postCaption: string
    setPostCaption: React.Dispatch<React.SetStateAction<string>>
    openEditModal: () => void
    editPost: () => void
}


const CardEditModal: React.FC<CardEditModalProps> = ({
    editModal,
    setModal,
    avatarURL,
    postAuthorFirstName,
    postAuthorMiddleName,
    postAuthorLastName,
    userName,
    postCaption,
    setPostCaption,
    openEditModal,
    editPost
}) => {
    return (
        <div>
            {editModal && (
                <Modal setModal={setModal}>
                    <div className='w-full flex flex-row justify-start items-center gap-x-2 py-1'>
                        <img className='w-[40px] rounded-full' src={avatarURL} />
                        <div className='flex-grow flex flex-col justify-center leading-none'>
                            <p className='text-base font-bold'>
                                {postAuthorFirstName} {postAuthorMiddleName} {postAuthorLastName}
                            </p>
                            <p className='text-sm'>
                                @{userName}
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
                        <CancelButton onClick={[openEditModal]}>
                            Cancel
                        </CancelButton>
                        <ConfirmButton onClick={[editPost]}>
                            Update
                        </ConfirmButton>

                    </div>
                </Modal>)}
        </div>
    )
}

export default CardEditModal
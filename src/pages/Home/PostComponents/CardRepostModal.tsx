import React from 'react'
import Modal from '../../../common/Modal'
import CardAvatar from './CardAvatar'
import CardCaption from './CardCaption'
import CancelButton from '../../../common/CancelButton'
import ConfirmButton from '../../../common/ConfirmButton'
import CardMedia from './CardMedia'

interface CardRepostModalProps {
    setModal: React.Dispatch<React.SetStateAction<boolean>>;
    avatarURL: string
    authorAvatarURL: string
    firstName: string
    middleName: string
    lastName: string
    userName: string
    repostCaption: string
    setRepostCaption: React.Dispatch<React.SetStateAction<string>>;
    postAuthorFirstName: string
    postAuthorMiddleName: string
    postAuthorLastName: string
    postAuthorUserName: string
    parentMediaURL: string[]
    confirmButtonFunctions: (() => void)[]
    cancelButtonFunctions: (() => void)[]
    parentCaption: string
}


const CardRepostModal: React.FC<CardRepostModalProps> = ({
    setModal,
    avatarURL,
    authorAvatarURL,
    firstName,
    middleName,
    lastName,
    userName,
    repostCaption,
    setRepostCaption,
    postAuthorFirstName,
    postAuthorMiddleName,
    postAuthorLastName,
    postAuthorUserName,
    parentMediaURL,
    confirmButtonFunctions,
    cancelButtonFunctions,
    parentCaption
}) => {

    const handleConfirmButtonClick = () => {
        confirmButtonFunctions.forEach((func) => {
            if (typeof func === 'function') {
                func();
            }
        });
    };

    const handleCancelButtonClick = () => {
        cancelButtonFunctions.forEach((func) => {
            if (typeof func === 'function') {
                func();
            }
        });
    };
    return (
        <Modal setModal={setModal}>

            <div className='w-full flex flex-row justify-center items-start p-2 gap-x-2'>
                <CardAvatar userName={userName} avatarURL={avatarURL} />
                <div className='flex flex-col flex-1 flex-shrink'>
                    <div className='leading-4 p-1'>
                        <div className='flex flex-row gap-x-1 font-bold'>
                            {firstName} {middleName} {lastName}
                        </div>
                        <div className='text-xs'>
                            @{userName}
                        </div>
                    </div>
                    <div className='w-full rounded-lg'>
                        <textarea
                            maxLength={99}
                            value={repostCaption}
                            onChange={(event) => setRepostCaption(event.target.value)}
                            className='w-full min-h-[50px] bg-transparent resize-none outline-none border-none p-1'
                            placeholder='Add a caption'
                        />
                        <div className='border rounded-lg flex flex-row w-full p-2 gap-x-1'>
                            <div>
                                <CardAvatar userName={postAuthorUserName} avatarURL={authorAvatarURL} />
                            </div>
                            <div className=''>
                                <div className='leading-5 py-1 '>
                                    <div className='flex flex-row gap-x-1 font-bold'>
                                        {postAuthorFirstName} {postAuthorMiddleName} {postAuthorLastName}
                                    </div>
                                    <div className='text-xs'>
                                        @{postAuthorUserName}
                                    </div>
                                </div>
                                <CardCaption caption={parentCaption} />
                                <div className='min-w-full max-w-[300px]'>
                                    <CardMedia mediaURL={parentMediaURL} />
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className='flex flex-row justify-end items-center'>
                        <CancelButton onClick={[handleCancelButtonClick]}>
                            Cancel
                        </CancelButton>
                        <ConfirmButton onClick={[handleConfirmButtonClick]}>
                            Repost
                        </ConfirmButton>
                    </div>
                </div>

            </div>

        </Modal>
    )
}

export default CardRepostModal
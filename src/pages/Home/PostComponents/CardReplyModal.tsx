import React from 'react'
import Modal from '../../../common/Modal'
import IonIcon from '@reacticons/ionicons'
import ConfirmButton from '../../../common/ConfirmButton'
import CancelButton from '../../../common/CancelButton'
import CardAvatar from './CardAvatar'
import TextAreaInput from '../../../common/TextAreaInput'


interface CardReplyModalProps {
    setModal: React.Dispatch<React.SetStateAction<boolean>>;
    authorUserName: string
    avatarURL: string
    firstName: string
    middleName: string
    lastName: string
    userName: string
    replyCaption: string
    setReplyCaption: React.Dispatch<React.SetStateAction<string>>
    mediaInput: boolean
    replyMediaUrlsBody: string
    setReplyMediaUrlsBody: React.Dispatch<React.SetStateAction<string>>
    addMediaUrls: () => void
    openMediaInput: () => void
    cancelButtonFunctions: (() => void)[]
    confirmButtonFunctions: (() => void)[]

}

const CardReplyModal: React.FC<CardReplyModalProps> = ({
    setModal,
    authorUserName,
    avatarURL,
    firstName,
    middleName,
    lastName,
    userName,
    replyCaption,
    setReplyCaption,
    mediaInput,
    replyMediaUrlsBody,
    setReplyMediaUrlsBody,
    addMediaUrls,
    openMediaInput,
    cancelButtonFunctions,
    confirmButtonFunctions,

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
            <div className='w-full flex'>
                Reply to {authorUserName}
            </div>
            <div className='w-full flex flex-row justify-start items-center gap-x-2 py-1'>
                <CardAvatar avatarURL={avatarURL} />
                <div className='flex-grow flex flex-col justify-center leading-none'>
                    <p className='text-base font-bold'>
                        {firstName} {middleName} {lastName}
                    </p>
                    <p className='text-sm'>
                        @{userName}
                    </p>
                </div>
            </div>
            <div className='w-full'>
                <TextAreaInput
                    placeholder='Reply'
                    body={replyCaption}
                    setBody={setReplyCaption} />
            </div>
            <div className='w-full'>
                <p>{99 - replyCaption.length} characters remaining</p>
            </div>
            {mediaInput && <div className='w-full flex flex-row'>
                <input value={replyMediaUrlsBody} onChange={(event: any) => setReplyMediaUrlsBody(event.target.value)} className='border-none outline-none bg-transparent flex-grow' type='text' placeholder='Paste here the link'></input>
                <button onClick={addMediaUrls} className='flex justify-center items-center border pl-3 pr-5'>
                    <IonIcon name="add" />
                    <p>Add Media</p>
                </button>
            </div>}

            <div className='w-full flex flex-row justify-between'>
                <button
                    onClick={openMediaInput}
                    className='border rounded-lg px-3 py-1'>
                    Media
                </button>
                <div className='flex justify-end items-center gap-x-1 flex-grow'>

                    <CancelButton onClick={[handleCancelButtonClick]} >
                        Cancel
                    </CancelButton>
                    <ConfirmButton onClick={[handleConfirmButtonClick]}>
                        Reply
                    </ConfirmButton>
                </div>
            </div>
        </Modal>
    )
}

export default CardReplyModal
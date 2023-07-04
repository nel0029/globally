import React from 'react'
import Modal from '../../../common/Modal'
import { IonIcon } from '@ionic/react'
import ConfirmButton from '../../../common/ConfirmButton'
import CancelButton from '../../../common/CancelButton'
import CardAvatar from './CardAvatar'
import TextAreaInput from '../../../common/TextAreaInput'
import MediaButton from '../../../common/MediaButton'
import CircularProgress from '../../../common/CircularProgress'

interface MediaProps {
    id: string,
    url: string
}

interface CardReplyModalProps {
    setModal: React.Dispatch<React.SetStateAction<boolean>>;
    authorUserName: string
    avatarURL: MediaProps
    firstName: string
    middleName: string
    lastName: string
    userName: string
    replyCaption: string
    setReplyCaption: React.Dispatch<React.SetStateAction<string>>
    cancelButtonFunctions: (() => void)[]
    confirmButtonFunctions: (() => void)[]
    handleFileChange: (val: any) => void
    selectedFiles: File[]
    fileInputID: string
    removeSelectedFile: (val: any) => void
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
    cancelButtonFunctions,
    confirmButtonFunctions,
    handleFileChange,
    selectedFiles,
    fileInputID,
    removeSelectedFile
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
            <form
                onSubmit={(event: React.FormEvent<HTMLFormElement>) => event.preventDefault()}
                className="w-full flex flex-col justify-center items-center">
                <div className='w-full flex'>
                    Reply to {authorUserName}
                </div>
                <div className='w-full flex flex-row justify-start items-center gap-x-2 py-1'>
                    <CardAvatar avatarURL={avatarURL.url} />
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
                <div className="w-full flex flex-row items-center">
                    {selectedFiles.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                            {selectedFiles.map((file, index) => (
                                <div
                                    key={index}
                                    className='relative'>
                                    <div className="w-24 h-24 rounded-lg flex items-center justify-center" >
                                        <img className="w-full h-full object-cover rounded-lg" src={URL.createObjectURL(file)} alt={`Preview ${index}`} />
                                    </div>

                                    <button className="absolute top-0 right-0 text-lg text-red-500 cursor-pointer"
                                        onClick={() => removeSelectedFile(index)}>

                                        <IonIcon
                                            name="close"

                                        />
                                    </button>
                                </div>

                            ))}
                        </div>
                    )}

                </div>

                <div className='w-full flex flex-row justify-between'>
                    <label htmlFor={fileInputID}>
                        <MediaButton />
                    </label>
                    <input
                        type="file"
                        id={fileInputID}
                        name="file"
                        accept="image/*"
                        multiple
                        style={{ display: 'none' }}
                        onChange={handleFileChange}
                    />
                    <div className='flex justify-end items-center gap-x-1 flex-grow'>
                        <CircularProgress percentage={replyCaption.length} max={99} width={32} />
                        <CancelButton onClick={[handleCancelButtonClick]} >
                            Cancel
                        </CancelButton>
                        <ConfirmButton onClick={[handleConfirmButtonClick]}>
                            Reply
                        </ConfirmButton>
                    </div>
                </div>
            </form>
        </Modal>
    )
}

export default CardReplyModal
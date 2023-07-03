import React, { useState, useContext } from 'react';
import IonIcon from '@reacticons/ionicons';
import { useDispatch, useSelector } from 'react-redux';
import { createPost } from '../../../redux/asynActions/postAsynActions';
import { AppDispatch } from '../../../redux/store';
import ConfirmButton from '../../../common/ConfirmButton';
import { NewPost } from '../../../types/PostActionTypes';
import TextAreaInput from '../../../common/TextAreaInput';
import CircularProgress from '../../../common/CircularProgress';
import MediaButton from '../../../common/MediaButton';

export default function CreateNewPostInput() {
    const user = useSelector((state: any) => state.user.userData);

    const dispatch = useDispatch<AppDispatch>();
    const [postBody, setPostBody] = useState('');
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]); // Explicitly define the type for selectedFiles
    const [hasPoll, setHaspoll] = useState(false)
    const [poll, setPoll] = useState<boolean>(false)
    const [option, setOption] = useState<string>("")
    const [pollOptionList, setPollOptionList] = useState<string[]>([])

    const createNewPost = () => {
        const newPost: NewPost = {
            authorID: user.userID,
            caption: postBody,
            files: selectedFiles,
            hasPoll: hasPoll,
            pollOptions: pollOptionList
        };

        dispatch(createPost(newPost));

        setPostBody('');
        setSelectedFiles([]);
        setPollOptionList([])
        setPoll(false)
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files) {
            const filesArray = Array.from(files);

            if (selectedFiles.length + filesArray.length > 10) {
                event.preventDefault();
                alert(`Cannot upload files more than 10`);
                return;
            }

            setSelectedFiles((prevFiles) => [...prevFiles, ...filesArray]);
        }
    };


    const removeSelectedFile = (index: number) => {
        const updatedFiles = [...selectedFiles];
        updatedFiles.splice(index, 1);
        setSelectedFiles(updatedFiles);

    };


    const openPoll = () => {
        setPoll(!poll)
        setHaspoll(!hasPoll)
        setPollOptionList([])
    }


    const optionListLength = pollOptionList.length
    const isMaxOption = optionListLength >= 5
    const isMinOption = optionListLength < 2

    const addOption = () => {
        setPollOptionList((prev: string[]) => [...prev, option]
        )
        setOption("")
    }

    const removeOption = (index: number) => {
        const updatedOptionList = [...pollOptionList]
        updatedOptionList.splice(index, 1)
        setPollOptionList(updatedOptionList)

    }

    const handleOptionOnChange = (event: any) => {
        setOption(event.target.value)
    }

    return (
        <div className="w-full  flex flex-col p-2">
            <form onSubmit={(event: React.FormEvent<HTMLFormElement>) => event.preventDefault()} className="w-full flex flex-col justify-center items-center">
                <TextAreaInput body={postBody} setBody={setPostBody} placeholder="Create a new post" />

                {selectedFiles.length > 0 && (
                    <div className="w-full flex flex-row items-center justify-start py-2 gap-x-2 overflow-x-auto flex-nowrap flex-shrink snap-mandatory scroll-px-9 transform-gpu no-scroll-bar sm:scroll-bar-horizontal">
                        {selectedFiles.map((file, index) => (
                            <div
                                key={index}
                                className='relative'>
                                <div className="w-16 h-16 rounded-lg flex items-center justify-center" >
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


                {poll && (
                    <div className='w-full flex flex-col gap-y-1 py-2'>
                        {pollOptionList.map((option: string, index: number) => (
                            <div key={index} className="flex items-center border dark:border-Dark400 p-2 rounded-lg text-base">

                                <div className="flex-1">{option}</div>
                                <div
                                    onClick={() => removeOption(index)}
                                    className='p-1 text-primary hover:text-opacity-60 cursor-pointer flex justify-center items-center'>
                                    <IonIcon name='trash-outline' />
                                </div>
                            </div>
                        ))}
                        <div className={`${isMaxOption ? 'hidden' : 'flex'} w-full flex-row items-center justify-center gap-x-2`}>
                            <div className='h-10 rounded-lg border dark:border-Dark400 flex-1'>
                                <input
                                    type="text"
                                    placeholder='Add Option'
                                    maxLength={25}
                                    value={option}
                                    onChange={handleOptionOnChange}
                                    disabled={isMaxOption}
                                    className='w-full h-full bg-transparent outline-none border-none p-1'
                                />
                            </div>
                            <CircularProgress percentage={option.length} max={25} width={30} />
                            <button
                                onClick={addOption}
                                disabled={isMaxOption}
                                className='flex justify-center items-center text-3xl text-secondary cursor-pointer hover:text-opacity-60 p-1 border dark:border-Dark400 rounded-lg'
                            >
                                <IonIcon name='add-outline' />
                            </button>
                        </div>
                    </div>
                )}
                {isMinOption && poll ? (
                    <div className='text-gray-500'>
                        Add atleast two option
                    </div>
                ) : null}
                <div className="w-full flex flex-row justify-between gap-x-2 py-2">
                    <div className='flex flex-row items-center gap-x-2'>
                        <div>
                            <label htmlFor="fileInput">
                                <MediaButton hasDisabled={poll} />
                            </label>
                            <input
                                type="file"
                                id="fileInput"
                                name="file"
                                accept="image/*"
                                multiple={selectedFiles.length < 10 ? true : undefined}
                                disabled={poll || selectedFiles.length >= 10}
                                style={{ display: 'none' }}
                                onChange={handleFileChange}

                            />
                        </div>
                        <button
                            onClick={openPoll}
                            disabled={selectedFiles.length > 0 ? true : false}
                            className={`flex justify-center items-center text-3xl text-secondary ${selectedFiles.length > 0 ? 'cursor-default text-opacity-60' : 'cursor-pointer hover:text-opacity-60'}`}>
                            <IonIcon name="list-outline" />
                        </button>
                    </div>
                    <div className="flex flex-row items-center gap-x-2">
                        <CircularProgress max={99} width={32} percentage={postBody.length} />

                        <ConfirmButton
                            disabled={isMinOption && poll}
                            onClick={[createNewPost]}>
                            Post
                        </ConfirmButton>
                    </div>
                </div>
            </form>
        </div>
    );
}

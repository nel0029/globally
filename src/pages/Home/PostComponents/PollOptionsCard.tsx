import React, { useState } from 'react'
import { PollResponse } from '../../../types/PostActionTypes'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../../../redux/store'
import { createNewPollResponse } from '../../../redux/asynActions/postAsynActions'
import { IonIcon } from '@ionic/react'

interface OptionProps {
    _id?: string,
    body?: string,
    count?: number
}

interface PollOptionListProps {
    options?: OptionProps[],
    postID?: string,
    hasChoosed?: boolean,
    optionChoosedID?: string,
    pollRespondentsCount?: number
}

const PollOptionsCard: React.FC<PollOptionListProps> = ({ options, postID, hasChoosed, optionChoosedID, pollRespondentsCount }) => {
    const user = useSelector((state: any) => state.user.userData)
    const [selectedOptionID, setSelectedOptionID] = useState<string>('')
    const dispatch = useDispatch<AppDispatch>()
    const isOptionSelected = (ID: string): boolean => selectedOptionID === ID
    const totalRespondents = pollRespondentsCount ? pollRespondentsCount : 0

    const handleOptionChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        const optionID = event.currentTarget.value;
        setSelectedOptionID(optionID);
        const pollResponseData: PollResponse = {
            postID: postID || '',
            optionID: optionID,
            respondentID: user.userID || '',
        };
        dispatch(createNewPollResponse(pollResponseData));
        event.stopPropagation();
    };

    return (
        <div
            onClick={(event: any) => event.stopPropagation()}
            className='w-full flex flex-col justify-center items-center gap-y-2 pb-2 flex-shrink'>
            {options && options.map((option: OptionProps, index: number) => (
                <label
                    key={index}
                    className={` relative w-full flex gap-x-2 items-center border dark:border-Dark400 p-2 rounded-lg text-base cursor-pointer`}>
                    <input
                        type='radio'
                        name='pollOption'
                        value={option._id}
                        checked={isOptionSelected(option._id ?? '')}
                        onChange={handleOptionChange}
                        disabled={hasChoosed ? true : false}
                        className='peer sr-only'
                    />
                    <div className={`${option._id === optionChoosedID ? 'text-secondary1' : ''} z-10 flex items-center justify-center`}>
                        <IonIcon name={`${option._id === optionChoosedID ? 'checkmark-circle' : 'checkmark-circle-outline'}`} />
                    </div>
                    <div
                        onClick={(event: any) => event.stopPropagation()}
                        className={`${hasChoosed ? ' cursor-default' : 'peer-checked:text-secondary peer-hover:text-secondary'} w-full z-10`}>
                        {option.body}
                    </div>
                    <div className='z-1 absolute bg-secondary top-0 left-0 right-0 bottom-0 bg-opacity-40 rounded-lg'
                        style={{ width: `${(option.count ? (option.count / totalRespondents) * 100 : 0)}%` }}>

                    </div>
                    <div>
                        {(option.count ? (option.count / totalRespondents) * 100 : 0)}%
                    </div>

                </label>
            ))}
            {hasChoosed && (
                totalRespondents > 1 ? (
                    <div className='w-full text-gray-400'>
                        You and {totalRespondents - 1} others responds to this poll
                    </div>
                ) : (
                    <div className='w-full text-gray-400'>
                        You responds to this poll
                    </div>
                )
            )}
        </div>
    )
}

export default PollOptionsCard
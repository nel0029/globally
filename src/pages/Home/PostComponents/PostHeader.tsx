import React from 'react'
import IonIcon from '@reacticons/ionicons';
import { NavLink } from 'react-router-dom';

export default function PostHeader(props: any) {
    const {
        avatarUrl,
        postAuthorFirstName,
        postAuthorMiddleName,
        postAuthorLastName,
        postAuthorUserID,
        postDateAndTime
    } = props
    return (
        <div className='flex flex-row w-full h-auto justify-center items-center'>
            <div className='flex justify-center items-center w-[40px] h-[40px] mx-2  '>
                <NavLink to={`/${postAuthorUserID}`}>
                    <img className='w-full h-full rounded-full hover:ring-black hover:ring-2' src={avatarUrl}></img>
                </NavLink>
            </div>
            <div className=' flex flex-col flex-grow'>
                <NavLink
                    to={`/${postAuthorUserID}`}
                    className='hover:underline hover:text-secondary text-lg font-bold'>
                    <h1>
                        {postAuthorFirstName} {postAuthorMiddleName} {postAuthorLastName}
                    </h1>
                </NavLink>
                <small className='text-xs'>
                    <span className=' text-gray-950 font-semibold'>
                        @{postAuthorUserID}
                    </span>
                    <span className='text-gray-500 ml-1'>
                        | {postDateAndTime}
                    </span>
                </small>
            </div>
            {/*
            <div className='text-[30px] border flex justify-center items-center p-0.5 rounded-full mx-2'>
                <IonIcon name="ellipsis-horizontal-outline"></IonIcon>
            </div> 
            */}
        </div>
    )
}

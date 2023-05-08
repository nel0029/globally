import React, { useContext, useState } from 'react'
import IonIcon from '@reacticons/ionicons';
import { NavLink } from 'react-router-dom';
import { PostsContext } from '../../../context/PostsContext';
import { PostsDataProps, PostCommentsProps } from '../../../types/PostTypes';
import MenuContainer from '../../../common/MenuContainer';
import MenuItem from '../../../common/MenuItem';



export default function CommentHeader(commentHeader: PostCommentsProps) {

    return (
        <div className='flex flex-row flex-grow h-auto justify-between items-center'>
            <div className=' flex flex-col border'>
                <div className='flex flex-row justify-start items-center gap-x-1'>
                    <NavLink
                        to={`/${commentHeader.commentAuthorUserID}`}
                        className='hover:underline hover:text-secondary text-base text-gray-950 font-bold'>
                        {commentHeader.commentAuthorFirstName} {commentHeader.commentAuthorMiddleName} {commentHeader.commentAuthorLastName}
                    </NavLink>
                    <p className=' text-sm font-semibold'>
                        @{commentHeader.commentAuthorUserID}
                    </p>
                    <div className='flex flex-row items-center outline outline-1 outline-secondary text-secondary hover:bg-secondary rounded-lg text-xs hover:text-white pl-1 pr-3 py-[1px] hover:cursor-pointer '>
                        <IonIcon name='add' />
                        <p className=''>
                            Follow
                        </p>
                    </div>
                </div>
                <p className='text-xs font-extralight text-gray-500'>
                    ● {commentHeader.commentDateAndTime}
                </p>
            </div>

            <div className='border'>
                <MenuContainer >
                    <MenuItem> follow </MenuItem>
                    <MenuItem> follow </MenuItem>
                </MenuContainer>
            </div>

        </div>
    )
}

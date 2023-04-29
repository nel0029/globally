import React, { useContext, useState, useRef, useEffect, useMemo } from 'react'
import IonIcon from '@reacticons/ionicons';
import { NavLink } from 'react-router-dom';
import { PostContext } from '../../../context/PostContext';
import { PostsDataProps } from '../../../types/PostTypes';
import MenuContainer from '../../../common/MenuContainer';
import MenuItem from '../../../common/MenuItem';


export default function PostHeader(postHeaderObject: PostsDataProps) {

    const [postHeader, setPostHeader] = useState(postHeaderObject)


    return (
        <div className='relative flex flex-row w-full h-auto justify-center items-center pb-1'>
            <div className=' flex flex-col justify-center gap-x-2 flex-grow leading-none'>

                <div className='flex flex-row items-center gap-x-2 text-sm md:text-base'>
                    <NavLink
                        to={`/${postHeader.postAuthorUserID}`}
                        className='hover:underline hover:text-secondary font-bold'>
                        {postHeader.postAuthorFirstName} {postHeader.postAuthorMiddleName} {postHeader.postAuthorLastName}
                    </NavLink>
                    <div className='font-semibold'>
                        @{postHeader.postAuthorUserID}
                    </div>
                </div>
                <div className='text-xs xl:text-sm text-gray-500'>
                    ● {postHeader.postDateAndTime}
                </div>
            </div>
            <MenuContainer >
                <MenuItem>Option 1</MenuItem>
                <MenuItem>Option 2</MenuItem>
                <MenuItem>Option 3</MenuItem>
                <MenuItem>Option 4</MenuItem>
                <MenuItem>Option 5</MenuItem>
                <MenuItem>Option 6</MenuItem>
                <div className='flex items-center pl-1 pr-3 cursor-pointer'>
                    <div className='text-xs'>
                        <IonIcon name='add' />
                    </div>
                    <p className='text-sm'>Follow</p>
                </div>
            </MenuContainer>
        </div>
    )
}

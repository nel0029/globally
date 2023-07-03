import React from 'react'
import IonIcon from '@reacticons/ionicons'
import CancelButton from '../../../common/CancelButton'
import ConfirmButton from '../../../common/ConfirmButton'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../../../redux/store'
import { follow, unfollow } from '../../../redux/asynActions/postAsynActions'
import { FollowData, UnfollowData } from '../../../types/PostActionTypes'


interface FollowBlockContainerProps {
    isFollowedUser: boolean,
    userFollowingID: string,
    followID: string | null
}


const FollowBlockContainer: React.FC<FollowBlockContainerProps> = ({ isFollowedUser, userFollowingID, followID }) => {

    const user = useSelector((state: any) => state.user.userData)
    const dispatch = useDispatch<AppDispatch>()

    const followUser = () => {
        const data: FollowData = {
            userFollowingID: userFollowingID,
            userID: user.userID
        }

        dispatch(follow(data))
    }

    const unfollowUser = () => {
        const data: UnfollowData = {
            followID: followID,
            userID: user.userID
        }

        dispatch(unfollow(data))
    }

    return (
        <div className='flex flex-row items-center p-2 gap-x-2'>
            {isFollowedUser ? (
                <CancelButton
                    className='p-2 md:pl-4 md:pr-6 md:py-1 rounded-full'
                    onClick={[unfollowUser]} >
                    <div className='text-sm sm:text-base flex flex-row items-center gap-x-2'>
                        <IonIcon name='person-remove-outline' />
                        <span className='hidden md:flex'>
                            Unfollow
                        </span>
                    </div>
                </CancelButton>) : (
                <ConfirmButton
                    className='p-2 md:pl-4 md:pr-6 md:py-1 rounded-full'
                    onClick={[followUser]} >
                    <div className='text-sm sm:text-base flex flex-row items-center gap-x-2'>
                        <IonIcon name='person-add-outline' />
                        <span className='hidden md:flex'>
                            Follow
                        </span>
                    </div>
                </ConfirmButton>)}

        </div>
    )
}

export default FollowBlockContainer
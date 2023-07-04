import React from 'react'
import { UserDetails } from '../../../redux/postSlice'
import { useNavigate } from 'react-router'
import ConfirmButton from '../../../common/ConfirmButton'
import CancelButton from '../../../common/CancelButton'
import { FollowData, UnfollowData } from '../../../types/PostActionTypes'
import { follow, unfollow } from '../../../redux/asynActions/postAsynActions'
import { useSelector, useDispatch } from 'react-redux'
import { AppDispatch } from '../../../redux/store'

export interface UserProps {
    _id: string,
    avatarURL: string,
    firstName: string,
    middleName: string,
    lastName: string,
    userName: string,
    bio: string,
    isUserFollowed?: boolean,
    followID?: string | null,
    inProfileRoute: boolean

}

const UserCard: React.FC<UserProps> = ({ avatarURL, firstName, middleName, lastName, userName, bio, isUserFollowed, followID, _id, inProfileRoute }) => {
    const navigate = useNavigate()
    const goToUserProfile = () => {
        navigate(`/${userName}`)
    }

    const user = useSelector((state: any) => state.user.userData)
    const dispatch = useDispatch<AppDispatch>()

    const followUser = () => {
        const data: FollowData = {
            userFollowingID: _id,
            userID: user.userID
        }


        dispatch(follow(data))
    }

    const unfollowUser = () => {
        const data: UnfollowData = {
            followID: followID || '',
            userID: user.userID
        }

        dispatch(unfollow(data))
    }

    return (
        <div
            onClick={goToUserProfile}
            className='w-full flex flex-row justify-around cursor-pointer bg-white dark:bg-Dark200 rounded-lg p-2'>
            <div className='px-2 '>
                <div className='w-[60px] h-[60px] rounded-[50%]'>
                    <img
                        className='w-full h-full object-cover aspect-square rounded-[50%]'
                        src={avatarURL} />
                </div>
            </div>
            <div className='flex flex-grow flex-col justify-start items-start flex-shrink overflow-x-hidden leading-none gap-y-1'>
                <div
                    className='flex flex-row flex-shrink hover:underline hover:text-secondary font-bold overflow-hidden text-ellipsis whitespace-nowrap cursor-pointer gap-x-1' >
                    <span>
                        {firstName}
                    </span>
                    <span>
                        {middleName}
                    </span>
                    <span>
                        {lastName}
                    </span>
                </div>
                <div
                    className='flex-shrink text-gray-400 font-light overflow-hidden text-ellipsis whitespace-nowrap '>
                    @{userName}
                </div>
                <div>
                    {bio}
                </div>
            </div>

            {inProfileRoute && (
                <div onClick={(event: any) => event.stopPropagation()}>
                    {user.userID === _id ? (null) : (isUserFollowed ? (
                        <CancelButton onClick={[unfollowUser]}>
                            Unfollow
                        </CancelButton>) : (
                        <ConfirmButton onClick={[followUser]}>
                            Follow
                        </ConfirmButton>))}
                </div>
            )}
        </div>
    )
}

export default UserCard
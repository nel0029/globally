import React, { useEffect } from 'react'
import { useParams } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../../../redux/store'
import UserCard, { UserProps } from './UserCard'
import { GetUserFollowingData } from '../../../types/PostActionTypes'
import { getUserFollowing } from '../../../redux/asynActions/postAsynActions'


const UserFollowingList = () => {
    const { userName } = useParams<{ userName: string }>()
    const user = useSelector((state: any) => state.user.userData)
    const userFollowing = useSelector((state: any) => state.posts.userFollowing)
    const dispatch = useDispatch<AppDispatch>()

    useEffect(() => {
        const data: GetUserFollowingData = {
            userName: userName || '',
            userID: user.userID
        }

        dispatch(getUserFollowing(data))
    }, [])
    return (
        <div className='w-full flex  flex-col justify-center px-2 gap-y-2'>
            {userFollowing?.map((users: any) => {
                return <UserCard
                    key={users._id}
                    _id={users._id}
                    avatarURL={users.avatarURL}
                    firstName={users.userFirstName}
                    middleName={users.userMiddleName}
                    lastName={users.userLastName}
                    userName={users.userName}
                    bio={users.bio}
                    isUserFollowed={users.isUserFollowed}
                    followID={users.followID}
                    inProfileRoute={true} />
            })}
        </div>
    )
}

export default UserFollowingList
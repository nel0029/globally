import React, { useEffect } from 'react'
import { useParams } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../../../redux/store'
import UserCard, { UserProps } from './UserCard'
import { GetUserFollowerData } from '../../../types/PostActionTypes'
import { getUserFollowers } from '../../../redux/asynActions/postAsynActions'


const UserFollowerList = () => {
    const { userName } = useParams<{ userName: string }>()
    const user = useSelector((state: any) => state.user.userData)
    const userFollowing = useSelector((state: any) => state.posts.userFollowers)
    const dispatch = useDispatch<AppDispatch>()

    useEffect(() => {
        const data: GetUserFollowerData = {
            userName: userName || '',
            userID: user.userID
        }

        dispatch(getUserFollowers(data))
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
                    isUserFollowed={users.isFollowedUser}
                    followID={users.followID}
                    inProfileRoute={true} />
            })}
        </div>
    )
}

export default UserFollowerList
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../redux/store'
import { follow, unfollow } from '../redux/asynActions/postAsynActions'
import { FollowData, UnfollowData } from '../types/PostActionTypes'
import MenuButton from './MenuButton'
import MenuItem from './MenuItem'
import { IonIcon } from '@ionic/react'


interface FollowButtonsCotainerProps {
    authorID: string
    postAuthorUserName: string
    isFollowedAuthor: boolean,
    followID: string | null
}

const FollowButtonsCotainer: React.FC<FollowButtonsCotainerProps> = ({ authorID, postAuthorUserName, isFollowedAuthor, followID }) => {
    const user = useSelector((state: any) => state.user.userData)
    const dispatch = useDispatch<AppDispatch>()



    const handleOnClick = () => {

        const followUser = () => {
            const data: FollowData = {
                userFollowingID: authorID,
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

        if (isFollowedAuthor === true) {
            return unfollowUser
        }
        else {
            return followUser
        }


    }

    return (
        <div className='w-full flex flex-row items-center'>
            {authorID !== user.userID ? (
                <MenuItem>
                    <MenuButton onClick={[handleOnClick()]}>
                        <IonIcon name={`${isFollowedAuthor === true ? "person-remove-outline" : "person-add-outline"}`} />
                        <p className='whitespace-nowrap'>
                            {isFollowedAuthor === true ? "Unfollow" : "Follow"} <span className='font-bold'>@{postAuthorUserName}</span>
                        </p>
                    </MenuButton>
                </MenuItem>) : ''}
        </div>
    )
}

export default FollowButtonsCotainer
import React, { useEffect } from 'react'
import { useParams } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../../../redux/store'
import { getAllLikesByUser } from '../../../redux/asynActions/postAsynActions'
import Card, { CardProps } from '../../Home/PostComponents/Card'
import { GetAllUserLikes } from '../../../types/PostActionTypes'

const LikedPostCardList = () => {
    const { userName } = useParams<{ userName: string }>()
    const dispatch = useDispatch<AppDispatch>()
    const user = useSelector((state: any) => state.user.userData)

    const data: GetAllUserLikes = {
        userName: userName || '',
        userID: user.userID
    }

    useEffect(() => {
        dispatch(getAllLikesByUser(data))
    }, [dispatch, userName, user.userID])

    const allLikedPosts = useSelector((state: any) => state.posts.userLikesList)

    return (
        <div className='w-full flex flex-col-reverse items-center justify-center gap-y-2 px-2'>
            {allLikedPosts?.map((post: CardProps) => {
                return <Card key={post._id} {...post} />
            })}
        </div>
    )
}

export default LikedPostCardList
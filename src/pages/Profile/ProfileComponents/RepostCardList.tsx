import React, { useEffect } from 'react'
import { useParams } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../../../redux/store'
import { getAllRepostsByUser } from '../../../redux/asynActions/postAsynActions'
import { RepostDataProps } from '../../../types/PostTypes'
import Card from '../../Home/PostComponents/Card'

const RepostCardList = () => {
    const { userName } = useParams<{ userName: string }>()
    const dispatch = useDispatch<AppDispatch>()
    const user = useSelector((state: any) => state.user.userData)

    const data: any = {
        userName: userName || '',
        authorID: user.userID
    }

    useEffect(() => {
        dispatch(getAllRepostsByUser(data))
    }, [dispatch, userName, user.userID])

    const allPosts = useSelector((state: any) => state.posts.userRepostsList)

    return (
        <div className='flex w-full flex-col-reverse justify-center items-center gap-y-4'>
            {allPosts?.map((post: RepostDataProps) => {
                return <Card key={post._id} {...post} />
            })}
        </div>
    )
}

export default RepostCardList
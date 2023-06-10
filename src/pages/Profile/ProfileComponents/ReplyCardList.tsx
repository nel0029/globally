import React, { useEffect } from 'react'
import { useParams } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../../../redux/store'
import { getAllRepliesByUser } from '../../../redux/asynActions/postAsynActions'
import ReplyCard from '../../Home/PostComponents/ReplyCard'
import { ReplyDataProps } from '../../../types/PostTypes'
import Card from '../../Home/PostComponents/Card'


const ReplyCardList = () => {
    const { userName } = useParams<{ userName: string }>()
    const dispatch = useDispatch<AppDispatch>()
    const user = useSelector((state: any) => state.user.userData)

    const data: any = {
        userName: userName || '',
        authorID: user.userID
    }

    useEffect(() => {
        dispatch(getAllRepliesByUser(data))
    }, [dispatch, userName, user.userID])

    const allPosts: ReplyDataProps[] = useSelector((state: any) => state.posts.userRepliesList)

    return (
        <div className='w-full flex flex-col-reverse items-center justify-center gap-y-2 px-2'>
            {allPosts && allPosts.map((post: ReplyDataProps) => {
                return <Card key={post._id} {...post} />
            })}
        </div>
    )
}

export default ReplyCardList
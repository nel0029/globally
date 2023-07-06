import React, { useEffect } from 'react'
import { useParams } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../../../redux/store'
import { getAllPostsByUser } from '../../../redux/asynActions/postAsynActions'
import Card, { CardProps } from '../../Home/PostComponents/Card'
import PostCard from '../../Home/PostComponents/PostCard'

const PostCardList = () => {
    const { userName } = useParams<{ userName: string }>()
    const dispatch = useDispatch<AppDispatch>()
    const user = useSelector((state: any) => state.user.userData)

    const data: any = {
        userName: userName || '',
        authorID: user.userID
    }

    useEffect(() => {
        dispatch(getAllPostsByUser(data))
    }, [dispatch, userName, user.userID])

    const allPosts = useSelector((state: any) => state.posts.userPostsList)


    return (
        <div className='flex w-full flex-col-reverse justify-center items-center gap-y-4'>
            {allPosts?.map((post: CardProps) => {
                return <Card key={post._id} {...post} />
            })}
        </div>
    )
}

export default PostCardList
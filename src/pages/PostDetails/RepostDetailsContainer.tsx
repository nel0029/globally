import CardRepostDetails, { CardRepostDetailsProps } from './PostDetailsComponent/CardRepostDetails';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector, useStore } from 'react-redux';
import { getRepostDetails, getAllRepliesByPostID } from '../../redux/asynActions/postAsynActions';
import { AppDispatch } from '../../redux/store';
import { useParams, useNavigate } from 'react-router-dom';
import { PostsDataProps, ReplyDataProps } from '../../types/PostTypes';
import { PostDetailsData, RepliesByPostIDData } from '../../types/PostActionTypes';
import Header from '../../common/Header';
import BackButton from '../../common/BackButton';
import Card from '../Home/PostComponents/Card';



const RepostDetailsContainer = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { userName, postID } = useParams<{ userName: string; postID: string }>();
    const postDetails: CardRepostDetailsProps = useSelector((state: any) => state.posts.postDetails || null);
    const postReplies: ReplyDataProps[] = useSelector((state: any) => state.posts.postReplies || null)
    const user = useSelector((state: any) => state.user.userData);
    const navigate = useNavigate()

    const postData: PostDetailsData = {
        postID: postID || '',
        userName: userName || '',
        authorID: user.userID || '',
    };

    useEffect(() => {
        dispatch(getRepostDetails(postData))

    }, [dispatch, userName, postID, user.userID])


    const data: RepliesByPostIDData = {
        postID: postID || '',
        userName: userName || '',
        authorID: user.userID || '',
        postType: "reply"
    }

    useEffect(() => {

        dispatch(getAllRepliesByPostID(data))
    }, [dispatch, userName, postID, user.userID])



    const goBack = () => {
        navigate(-1)
    }

    const goToReply = (userName: string, postID: string) => {
        navigate(`/${userName}/replies/${postID}`)
    }
    return (
        <div className='w-full flex flex-col items-center justify-center gap-y-2'>
            <Header >
                <BackButton />
                <div className='text-lg font-bold'>
                    Repost
                </div>
            </Header>

            <div className='w-full flex flex-col items-center px-2 gap-y-2'>
                {postDetails !== null ? (
                    <div className='w-full'>
                        <CardRepostDetails {...postDetails} />
                    </div>) : (<div> Post didn't exists </div>)}

                <div className='w-full flex flex-col-reverse items-center gap-y-2'>
                    {postReplies !== null ? (
                        postReplies.map((reply: ReplyDataProps) => {
                            return (
                                <div
                                    className='w-full cursor-pointer'
                                    key={reply._id}
                                    onClick={() => goToReply(reply.postAuthorUserName, reply._id)}>
                                    <Card isInHomeRoute={false} {...reply} />
                                </div>
                            )
                        })
                    ) : (<div> No replies for this post </div>)}
                </div>
            </div>
        </div>
    )
}

export default RepostDetailsContainer
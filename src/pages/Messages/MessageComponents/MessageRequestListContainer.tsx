import React, { useEffect, useState } from 'react'
import socket from '../../../sockets/socket'
import { useSelector, useDispatch } from 'react-redux'
import { AppDispatch } from '../../../redux/store'
import { useNavigate } from 'react-router'
import { getConversationRequestList } from '../../../redux/asynActions/messageAsyncActions'
import Header from '../../../common/Header'
import TitleText from '../../../common/TitleText'
import { ConversationRequestsProps } from '../../../redux/messageSlice'
import CardAvatar from '../../Home/PostComponents/CardAvatar'
import IonIcon from '@reacticons/ionicons'
import CardHeader from '../../Home/PostComponents/CardHeader'
import ConversationRequestCard from './ConversationRequestCard'



const MessageRequestListContainer = () => {
    const user = useSelector((state: any) => state.user.userData)
    const conversationList: any[] = useSelector((state: any) => state.messages.conversationRequestList)
    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate()


    useEffect(() => {
        const data = {
            userID: user.userID
        }

        dispatch(getConversationRequestList(data))
    }, [])



    const goToMessages = () => navigate('/messages');

    const createNewConvo = () => navigate('/messages/new')

    const openConvo = (conversationID: string) => navigate(`/messages/r/requests/${conversationID}`)

    return (

        <div className='w-full sticky top-0 h-screen overflow-auto flex-grow flex flex-col gap-y-2 lg:border-r lg:dark:border-Dark300'>
            <Header>
                <div
                    onClick={goToMessages}
                    className="flex justify-center items-center p-2 rounded-full hover:bg-slate-200 dark:hover:bg-Dark300 cursor-pointer"
                >
                    <IonIcon name="arrow-back-outline" />
                </div>
                <TitleText >
                    Message Requests
                </TitleText>

            </Header>

            <div className='flex flex-col px-2'>

                {conversationList && conversationList.length > 0 ? (
                    conversationList?.map((conversation: ConversationRequestsProps) => (

                        <ConversationRequestCard
                            onClick={() => openConvo(conversation._id)}
                            avatarURL={conversation.requesterAvatarURL}
                            userName={conversation.userName ? conversation.userName : ''}
                            firstName={conversation.requesterFirstName ? conversation.requesterFirstName : ''}
                            middleName={conversation.requesterMiddleName ? conversation.requesterMiddleName : ''}
                            lastName={conversation.requesterLastName ? conversation.requesterLastName : ''}
                            hasUnseenMessages={conversation.hasUnseenMessages}
                            createdAt={conversation.createdAt}
                            lastMessage={conversation.lastMessage}
                            lastMessageTimestamps={conversation.lastMessageTimestamps}
                            isActive={conversation.isActive} />
                    ))
                ) : (
                    //No Conversations
                    <div className='w-full text-center'> No Message Request </div>

                )}

            </div>
        </div>

    )
}

export default MessageRequestListContainer
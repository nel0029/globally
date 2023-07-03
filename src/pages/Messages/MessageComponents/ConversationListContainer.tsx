import React, { useEffect, useState } from 'react'
import socket from '../../../sockets/socket'
import { useSelector, useDispatch } from 'react-redux'
import { AppDispatch } from '../../../redux/store'
import { useNavigate } from 'react-router'
import { getConversationList } from '../../../redux/asynActions/messageAsyncActions'
import Header from '../../../common/Header'
import TitleText from '../../../common/TitleText'
import { ConversationListProps, ConversationMembersProps } from '../../../redux/messageSlice'
import CardAvatar from '../../Home/PostComponents/CardAvatar'
import IonIcon from '@reacticons/ionicons'
import CardHeader from '../../Home/PostComponents/CardHeader'
import ConversationCard from './ConversationCard'



const ConversationListContainer = () => {
    const user = useSelector((state: any) => state.user.userData)
    const conversationList: any[] = useSelector((state: any) => state.messages.conversationList)
    const sortedConversationList = [...conversationList]; // Create a shallow copy


    sortedConversationList.sort((a, b) => {
        const timestampA = new Date(a.lastMessageTimestamps);
        const timestampB = new Date(b.lastMessageTimestamps);
        return timestampA.getTime() - timestampB.getTime();
    });
    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate()

    useEffect(() => {
        const data = {
            userID: user.userID
        }
        dispatch(getConversationList(data))
    }, [])


    const createNewConvo = () => navigate('/messages/new')

    const openConvo = (conversationID: string) => navigate(`/messages/${conversationID}`)

    const goToMessageRequets = () => navigate('/messages/r/requests')

    return (

        <div className='w-full sticky top-0 h-screen overflow-auto flex-grow flex flex-col gap-y-2 lg:border-r lg:dark:border-Dark300'>
            <Header>
                <TitleText >
                    Conversations
                </TitleText>
                <div className='flex justify-center items-center'>
                    <button
                        onClick={createNewConvo}
                        className='flex justify-center items-center p-1 text-2xl rounded-full hover:bg-slate-200 dark:hover:bg-Dark300 cursor-pointer'>
                        <IonIcon name='create-outline' />
                    </button>
                </div>
            </Header>

            <div className='px-2'>
                {/* <div className='w-full flex flex-row gap-x-2'>
                    <div className='flex flex-row justify-center items-center flex-grow gap-x-1 border dark:border-Dark300 rounded-full'>
                        <div className='text-lg flex gap-x-2 justify-center items-center p-2'>
                            <IonIcon name='search-outline' />
                        </div>
                        <input
                            className='flex-grow bg-transparent outline-none border-none '
                            type="text"
                            placeholder='Search for existing conversation' />
                    </div>

                </div> */}
                {/* <div
                    onClick={goToMessageRequets}
                    className='flex flex-row items-center gap-x-2 py-2 hover:bg-black hover:dark:bg-white hover:bg-opacity-10 dark:hover:bg-opacity-10  cursor-pointer'>
                    <div className='flex flex-row justify-center items-center text-2xl border dark:border-Dark300 p-2 rounded-full'>
                        <IonIcon name='chatbox-ellipses-outline' />
                    </div>
                    <div>
                        Message Requests
                    </div>
                </div> */}
                <div className='flex-[1] flex flex-col-reverse'>
                    {sortedConversationList && sortedConversationList.length > 0 ? (
                        sortedConversationList?.map((conversation: ConversationListProps) => (

                            <ConversationCard
                                key={conversation._id}
                                onClick={() => openConvo(conversation._id)}
                                avatarURL={conversation.avatarURL}
                                userName={conversation.userName ? conversation.userName : ''}
                                firstName={conversation.receiverFirstName ? conversation.receiverFirstName : ''}
                                middleName={conversation.receiverMiddleName ? conversation.receiverMiddleName : ''}
                                lastName={conversation.receiverLastName ? conversation.receiverLastName : ''}
                                createdAt={conversation.createdAt}
                                lastMessage={conversation.lastMessage}
                                lastMessageTimestamps={conversation.lastMessageTimestamps}
                                isActive={conversation.isActive}
                                unseenMessagesCount={conversation.unseenMessagesCount} />

                        ))
                    ) : (
                        //No Conversations
                        <div className='w-full text-center flex justify-center items-center flex-grow'> No Conversation </div>
                        // <ConversationCard
                        //     onClick={() => openConvo('jhsdjasjdashkdas')}
                        //     avatarURL=''
                        //     userName='someone29'
                        //     firstName='Charlie'
                        //     middleName='S.'
                        //     lastName='Puth'
                        //     hasUnseenMessages={true}
                        //     createdAt='June 19, 2023'
                        //     lastMessage="Hello Universe"
                        //     lastMessageTimeStamps="June 19, 2023"
                        //     isActive={true} />
                    )}
                </div>
            </div>
        </div>

    )
}

export default ConversationListContainer
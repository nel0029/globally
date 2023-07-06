import React, { useEffect, useState, useRef } from 'react'
import { useParams, useNavigate } from 'react-router'
import { useSelector, useDispatch } from 'react-redux'
import socket from '../../../sockets/socket'
import Header from '../../../common/Header'
import { IonIcon } from '@ionic/react'
import { arrowBackOutline, paperPlane } from 'ionicons/icons'
import MessageBubble from './MessageBubble'
import CardAvatar from '../../Home/PostComponents/CardAvatar'
import { getConversationInfo, getAllMessages, getUnseenMessagesCount } from '../../../redux/asynActions/messageAsyncActions'
import { AppDispatch } from '../../../redux/store'
import { MessageDataProps, createNewConvo, updateConvo } from '../../../redux/messageSlice'
import { useLocation } from 'react-router'
import { createNewMessage } from '../../../redux/messageSlice'


const ConversationContainer = () => {
    const { conversationID } = useParams<string>()
    const user = useSelector((state: any) => state.user.userData)
    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate();
    const messageContainerRef = useRef<HTMLDivElement | null>(null);
    const conversationInfo = useSelector((state: any) => state.messages.conversationInfo) || {}
    const messages = useSelector((state: any) => state.messages.messages) || [];
    const location = useLocation()
    const [messageText, setMessageText] = useState("")
    const [focused, setFocused] = useState(false)

    useEffect(() => {
        const data = {
            conversationID: conversationID,
            userID: user.userID
        };

        dispatch(getConversationInfo(data))
            .then(() => dispatch(getAllMessages(data)))
    }, [conversationID]);


    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    useEffect(() => {
        const data = {
            conversationID: conversationID,
            memberID: user.userID
        }

        socket.emit('joinConversation', data);

        return () => {
            socket.emit("leaveConversation", data)
        }
    }, [location.pathname])

    useEffect(() => {
        const data = {
            userID: user.userID
        }
        dispatch(getUnseenMessagesCount(data))
    }, [])


    const goBack = () => navigate('/messages');

    const scrollToBottom = () => {
        if (messageContainerRef.current) {
            messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
        }
    };

    const handleSendMessage = () => {

        const data = {
            text: messageText,
            conversationID: conversationID,
            senderID: user.userID

        }

        socket.emit("sendMessage", data)
        scrollToBottom();
        setMessageText('')
    };
    const handleFocus = () => {
        setFocused(!focused)
    }

    return (
        <div className={`${focused ? 'absolute' : 'fixed '} sm:sticky top-0 bottom-0 dark:bg-Dark100 bg-slate-100 w-full overflow-y-auto flex flex-col lg:border-l dark:border-Dark300`}>
            {conversationInfo && (
                <div className='flex flex-col flex-grow'>
                    <Header>
                        <div className='flex flex-row items-center '>
                            <div className='flex-[1] flex flex-row items-center'>
                                <div
                                    onClick={goBack}
                                    className="flex lg:hidden justify-center items-center p-2 rounded-full hover:bg-slate-200 dark:hover:bg-Dark300 cursor-pointer">
                                    <IonIcon icon={arrowBackOutline} />
                                </div>
                                <div className='flex flex-row gap-x-2'>
                                    <CardAvatar
                                        width="32px"
                                        height="32px"
                                        avatarURL={conversationInfo.avatarURL?.url}
                                    />
                                    <div className='flex flex-row gap-x-1'>
                                        <span>{conversationInfo.receiverFirstName}</span>
                                        <span>{conversationInfo.receiverMiddleName}</span>
                                        <span>{conversationInfo.receiverLastName}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Header>
                    <div className="flex flex-col flex-[1] p-2 gap-y-2 overflow-y-auto" ref={messageContainerRef}>
                        {messages && messages.length > 0 ? (
                            messages.map((message: MessageDataProps) => (
                                <MessageBubble
                                    key={message._id}
                                    senderID={message.senderID}
                                    text={message.text}
                                    createdAt={message.createdAt}
                                />
                            ))
                        ) : (
                            <div>No messages</div>
                        )}


                    </div>
                    <div className="sticky bottom-0 w-full flex flex-row px-2 flex-shrink overflow-x-hidden">
                        <div className="flex-grow">
                            <input
                                placeholder="Aa"
                                className="w-full bg-transparent border dark:border-Dark300 outline-none p-2 rounded-lg"
                                type="text"
                                value={messageText}
                                onChange={(event: any) => setMessageText(event.target.value)}
                            />
                        </div>
                        <button className="p-2 flex flex-row items-center gap-x-2" onClick={handleSendMessage}>
                            <IonIcon icon={paperPlane} />
                        </button>
                    </div>
                </div>
            )}
        </div>

    )
}

export default ConversationContainer
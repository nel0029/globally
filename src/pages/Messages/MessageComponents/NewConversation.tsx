import React, { useRef, useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router';
import { IonIcon } from '@ionic/react'
import { arrowBackOutline, paperPlane } from 'ionicons/icons'
import Header from '../../../common/Header';
import TitleText from '../../../common/TitleText';
import MessageBubble from './MessageBubble';
import socket from '../../../sockets/socket';
import { useSelector, useDispatch } from 'react-redux';
import { searchUser } from '../../../redux/asynActions/userAsyncActions';
import useDebounce from '../../Register/Hooks/useDebounce';
import { AppDispatch } from '../../../redux/store';
import { UserData } from '../../../redux/usersSlice';
import UserMessageCard from './UserMessageCard';
import { deleteConvoInfo, deleteReceiverInfo, deleteUserList, createNewConvo, createNewMessage } from '../../../redux/messageSlice';
import { getConvoInfoByUserID } from '../../../redux/asynActions/messageAsyncActions';

const NewConversation = () => {
    const user = useSelector((state: any) => state.user.userData);
    const userList = useSelector((state: any) => state.messages.userList);
    const responseConvoInfo = useSelector((state: any) => state.messages.responseConvoInfo);
    const responseReceiverInfo = useSelector((state: any) => state.messages.responseReceiverInfo);
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const messageContainerRef = useRef<HTMLDivElement | null>(null);
    const [messageText, setMessageText] = useState("");
    const [selectedReceiver, setSelectedReceiver] = useState({});
    const [userName, setUserName] = useState("");
    const userNameDebounced = useDebounce(userName, 1000);


    const goToMessages = () => navigate('/messages');
    useEffect(() => {
        dispatch(deleteReceiverInfo())
    }, [])

    useEffect(() => {
        if (responseConvoInfo) {
            navigate(`/messages/${responseConvoInfo._id}`);
            dispatch(deleteConvoInfo());
            setMessageText("");
            setSelectedReceiver({});
            setUserName("");
            dispatch(deleteUserList());
        }
    }, [responseConvoInfo]);

    useEffect(() => {
        const data = {
            userName: userNameDebounced
        };
        dispatch(searchUser(data));
    }, [userNameDebounced, userName]);

    useEffect(() => {
        scrollToBottom();
    }, []);

    const scrollToBottom = () => {
        if (messageContainerRef.current) {
            messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
        }
    };

    const handleChange = (event: any) => {
        const userID = event.currentTarget.value;
        const selectedUser = userList.find((user: any) => user._id === userID);
        setSelectedReceiver(selectedUser);
        const data = {
            senderID: user.userID,
            receiverID: selectedUser._id
        };
        dispatch(getConvoInfoByUserID(data));
        dispatch(deleteUserList());
    };

    const handleSendMessage = () => {
        const data = {
            senderID: user.userID,
            receiverID: responseReceiverInfo._id,
            text: messageText
        };

        socket.emit("createNewMessage", data);
        scrollToBottom();
    };



    const userListMemoized = useMemo(() => userList, [userList]);
    const responseConvoInfoMemoized = useMemo(() => responseConvoInfo, [responseConvoInfo]);
    const responseReceiverInfoMemoized = useMemo(() => responseReceiverInfo, [responseReceiverInfo]);

    return (
        <div className="h-[100dvh] fixed sm:sticky top-0 bottom-0 dark:bg-Dark100 bg-slate-100 flex-grow w-full overflow-hidden flex flex-col lg:border-l dark:border-Dark300">
            <Header>
                <div
                    onClick={goToMessages}
                    className="flex lg:hidden justify-center items-center p-2 rounded-full hover:bg-slate-200 dark:hover:bg-Dark300 cursor-pointer"
                >
                    <IonIcon icon={arrowBackOutline} />
                </div>
                <div className="py-1 flex-[1] flex flex-row items-center gap-x-2">
                    {responseReceiverInfoMemoized ? (
                        <UserMessageCard
                            _id={responseReceiverInfoMemoized._id}
                            avatarURL={responseReceiverInfoMemoized.avatarURL}
                            firstName={responseReceiverInfoMemoized.userFirstName}
                            middleName={responseReceiverInfoMemoized.userMiddleName}
                            lastName={responseReceiverInfoMemoized.userLastName}
                            userName={responseReceiverInfoMemoized.userName}
                        />
                    ) : (
                        <div className='flex-[1] flex flex-row items-center gap-x-2'>
                            <div className="font-bold">To:</div>
                            <div className='flex-1 relative'>
                                <input
                                    placeholder="Username"
                                    className="w-full flex-shrink bg-transparent border-none outline-none"
                                    type="text"
                                    value={userName}
                                    onChange={(event: any) => setUserName(event.target.value)}
                                />
                            </div>
                        </div>
                    )}

                    {userListMemoized && (
                        <div className='absolute border dark:border-Dark300 bg-white dark:bg-Dark200 rounded-lg top-[100%] right-0 left-0'>
                            {userListMemoized.map((user: any) => (
                                <label
                                    key={user._id}
                                    className='flex flex-row items-center'
                                >
                                    <input
                                        value={user._id}
                                        onChange={(event: any) => handleChange(event)}
                                        className='peer sr-only'
                                        type="radio"
                                    />

                                    <UserMessageCard
                                        _id={user.userID}
                                        avatarURL={user.avatarURL}
                                        firstName={user.userFirstName}
                                        middleName={user.userMiddleName}
                                        lastName={user.userLastName}
                                        userName={user.userFirstName}
                                    />
                                </label>
                            ))}
                        </div>
                    )}
                </div>
            </Header>
            <div className="flex flex-grow flex-col flex-[1] p-2 gap-y-2 overflow-y-auto" ref={messageContainerRef}>
                {/* Message content */}
            </div>
            <div className="w-full flex flex-row px-2 flex-shrink overflow-x-hidden ">
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
    );
};

export default NewConversation;

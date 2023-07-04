import React, { useEffect } from 'react'
import Header from '../../common/Header'
import TitleText from '../../common/TitleText'
import { IonIcon } from '@ionic/react'
import { useSelector, useDispatch } from 'react-redux'
import { AppDispatch } from '../../redux/store'
import { NotificationsProps } from '../../redux/messageSlice'
import { getAllNotifications } from '../../redux/asynActions/messageAsyncActions'
import { useNavigate } from 'react-router'
import CardAvatar from '../Home/PostComponents/CardAvatar'

const Notifications = () => {

    useEffect(() => {
        const data = {
            userID: user.userID
        }
        dispatch(getAllNotifications(data))

    }, [])


    const user = useSelector((state: any) => state.user.userData)
    const notifications = useSelector((state: any) => state.messages.notificationList)

    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate()





    const date = (createdAt: string) => {
        const dateAndTime = new Date(createdAt)
        const formattedDateAndTime = `${dateAndTime.toLocaleTimeString('en-us', {
            timeZone: 'Asia/Manila',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
        })} • ${dateAndTime.toLocaleDateString('en-us', {
            timeZone: 'Asia/Manila',
            month: '2-digit',
            day: '2-digit',
            year: 'numeric',
        })}`;

        return formattedDateAndTime
    }


    const iconToRender = (actionType: string) => {
        switch (actionType) {
            case "like":
                return (
                    <div className='flex justify-center items-center text-xl text-primary'>
                        <IonIcon name="heart" />
                    </div>
                )

            case "reply":
                return (
                    <div className='flex justify-center items-center text-xl text-secondary1'>
                        <IonIcon name="chatbox" />
                    </div>
                )
            case "repost":
                return (
                    <div className='flex justify-center items-center text-xl text-secondary' >
                        <IonIcon name="arrow-redo" />
                    </div>
                )
            default: return null
        }
    }

    const notificationTextToRender = (actionType: string) => {
        let notificationText
        switch (actionType) {
            case "like":
                return notificationText = "liked your"
            case "reply":
                return notificationText = "replied to your"
            case "repost":
                return notificationText = "reposted your"
            default: return null
        }
    }

    const route = (postType: string) => {
        if (postType === "post") {
            return "posts"
        } else if (postType === "reply") {
            return "replies"
        } else if (postType === "repost") {
            return "reposts"

        } else {
            return ""
        }
    }


    return (
        <div className='h-screen flex flex-col'>
            <Header>
                <TitleText>
                    <div className='py-0.5'>
                        Notifications
                    </div>
                </TitleText>
            </Header>
            <div className=' flex flex-col-reverse px-1 mt-2 gap-y-2'>
                {notifications?.length > 0 ? (notifications.map((notification: NotificationsProps) => (
                    <div
                        key={notification._id}
                        className='w-full border dark:border-Dark300 bg-white dark:bg-Dark200 rounded-lg p-1 flex flex-row items-center gap-x-2' >

                        <div className='px-1'>
                            <CardAvatar
                                userName={notification.actorUserName}
                                avatarURL={notification.actorAvatarURL.url} />
                        </div>

                        <div className='flex flex-col flex-wrap'>
                            <div className='flex flex-row items-center gap-x-1 flex-wrap'>
                                <div
                                    onClick={() => navigate(`/${notification.actorUserName}`)}
                                    className='font-bold hover:text-secondary hover:underline cursor-pointer'>
                                    {notification.actorUserName}
                                </div>
                                {iconToRender(notification.actionType)}
                                <div>
                                    {notificationTextToRender(notification.actionType)}
                                </div>
                                <div
                                    onClick={() => navigate(`/${notification.actorUserName}/${route(notification.postType)}/${notification.postID}`)}
                                    className='font-bold hover:text-secondary1 hover:underline cursor-pointer'>
                                    {notification.postType}
                                </div>

                            </div>
                            <div className='text-gray-400 text-sm flex flex-row items-center'>
                                {date(notification.createdAt)}
                            </div>
                        </div>
                    </div>
                ))) : (
                    <div className='flex-grow flex flex-col gap-y-2 justify-center items-center'>

                        <div className='text-4xl font-extrabold'>No notifications</div>
                        <div>
                            All your notifactions are found here
                        </div>

                    </div>
                )}
            </div>
        </div>
    )
}

export default React.memo(Notifications);
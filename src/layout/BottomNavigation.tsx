import React, { useState } from 'react'
import { IonIcon } from '@ionic/react'
import {
    homeOutline,
    personOutline,
    mailOutline,
    notificationsOutline
} from 'ionicons/icons'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../redux/store'
import { useLocation } from 'react-router'
import { useNavigate } from 'react-router'
import { resetNotificationsCount } from '../redux/messageSlice'
import socket from '../sockets/socket'



const BottomNavigation = () => {
    const user = useSelector((state: any) => state.user.userData)
    const location = useLocation()
    const [activeTab, setActiveTab] = useState(location.pathname);
    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>()

    const goToHome = () => {
        navigate('/')
        setActiveTab('/')
    }

    const goToUserProfile = () => {
        navigate(`/${user.userName}`)
        setActiveTab(`/${user.userName}`)
    }


    const goToMessages = () => {
        navigate(`/messages`)
        setActiveTab(`/messages`)
    }

    const goToNotifications = () => {
        navigate(`/notifications`)
        setActiveTab(`/notifications`)
        dispatch(resetNotificationsCount())

        const data = {
            userID: user.userID
        }
        socket.emit("resetNotificationsCount", data)
    }


    const goToAccountSettings = () => {
        navigate('/account/setting')
        setActiveTab('/account/setting')
    }

    return (
        <div className='sticky bottom-0 w-full flex sm:hidden flex-row items-center justify-around py-2 bg-white dark:bg-Dark300'>
            <div onClick={goToHome}>
                <IonIcon icon={homeOutline} />
            </div>
            <div onClick={goToUserProfile}>
                <IonIcon icon={personOutline} />
            </div>
            <div onClick={goToMessages} >
                <IonIcon icon={mailOutline} />
            </div>
            <div onClick={goToNotifications} >
                <IonIcon icon={notificationsOutline} />
            </div>
            <div
                onClick={goToAccountSettings}
                className='w-[20px] h-[20px]'>
                <img src={user.avatarURL} />
            </div>
        </div>
    )
}

export default BottomNavigation
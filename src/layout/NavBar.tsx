import React, { useState } from 'react'
import ConfirmButton from '../common/ConfirmButton'
import { useNavigate, useLocation } from 'react-router'
import MenuItem from '../common/MenuItem'
import IonIcon from '@reacticons/ionicons'
import Header from '../common/Header'
import TitleText from '../common/TitleText'
import NavItems from '../common/NavItems'
import { useSelector, useDispatch } from 'react-redux'
import { AppDispatch } from '../redux/store'
import { setMode } from '../redux/themeSlice'



const NavBar = () => {

    const user = useSelector((state: any) => state.user.userData)
    const mode = useSelector((state: any) => state.theme.darkMode)
    const location = useLocation()
    const [activeTab, setActiveTab] = useState(location.pathname);
    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>()
    const [darkMode, setDarkMode] = useState(mode)

    const isAuthenticated = localStorage.getItem('token')

    const goToHome = () => {
        navigate('/')
        setActiveTab('/')
    }

    const goToUserProfile = () => {
        navigate(`/${user.userName}`)
        setActiveTab(`/${user.userName}`)
    }


    const setThemeMode = () => {
        setDarkMode(!darkMode)
        dispatch(setMode(darkMode))
    }
    return (
        <div className='max-w-[300px] h-screen flex-grow sticky hidden sm:flex flex-col items-center justify-center left-0 top-0 bottom-0 border-r dark:border-Dark300'>
            <Header>
                <div className="flex justify-center items-center text-[32px] rounded-full text-secondary">
                    <IonIcon name="earth" />
                </div>
                <div className="w-full hidden md:flex items-center justify-center md:justify-start flex-row">
                    <TitleText>
                        Globally
                    </TitleText>
                </div>
            </Header>

            <div className='w-full flex flex-col flex-grow justify-between items-center p-2 gap-y-2'>
                <div className='w-full flex flex-col items-center md:items-start text-2xl gap-y-4'>
                    <div
                        onClick={goToHome}
                        className={`${activeTab === '/' ? ' text-secondary ' : ''} flex flex-row items-center gap-x-2 p-2 md:pl-4 md:pr-6 py-1 cursor-pointer hover:text-secondary hover:scale-110`}>
                        <IonIcon name="home-outline" />
                        <div className='hidden md:flex items-center'>
                            Home
                        </div>
                    </div>

                    <div
                        onClick={goToUserProfile}
                        className={`${activeTab === `/${user.userName}` ? ' text-secondary' : ''} flex flex-row items-center gap-x-2 p-2 md:pl-4 md:pr-6 py-1 cursor-pointer hover:text-secondary hover:scale-110`}>
                        <IonIcon name="person-outline" />
                        <div className='hidden md:flex items-center'>
                            Profile
                        </div>
                    </div>

                    <div className={`${activeTab === '/notifications' ? ' text-secondary ' : ''} flex flex-row items-center gap-x-2 p-2 md:pl-4 md:pr-6 py-1 cursor-pointer hover:text-secondary hover:scale-110`}>
                        <IonIcon name="at-outline" />
                        <div className='hidden md:flex items-center'>
                            People
                        </div>
                    </div>

                    <div className={`${activeTab === '/notifications' ? ' text-secondary ' : ''} flex flex-row items-center gap-x-2 p-2 md:pl-4 md:pr-6 py-1 cursor-pointer hover:text-secondary hover:scale-110`}>
                        <IonIcon name="mail-outline" />
                        <div className='hidden md:flex items-center'>
                            Messages
                        </div>
                    </div>

                    <div className={`${activeTab === '/notifications' ? ' text-secondary ' : ''} flex flex-row items-center gap-x-2 p-2 md:pl-4 md:pr-6 py-1 cursor-pointer hover:text-secondary hover:scale-110`}>
                        <IonIcon name="notifications-outline" />
                        <div className='hidden md:flex items-center'>
                            Notifications
                        </div>
                    </div>
                </div>

                <div className='w-full flex flex-col items-center md:items-start gap-y-2'>
                    <div className={`${activeTab === '/notifications' ? ' text-secondary ' : ''} flex flex-row items-center text-xl gap-x-2 p-2 md:pl-4 md:pr-6 py-1 cursor-pointer hover:text-secondary hover:scale-110`}>
                        <div className=' w-7 h-7 flex justify-center items-center rounded-full'>
                            <img
                                className='w-full h-full object-contain aspect-square rounded-full'
                                src={user.avatarURL} />
                        </div>
                        <div className='hidden md:flex items-center'>
                            Account Settings
                        </div>
                    </div>

                    <div
                        onClick={setThemeMode}
                        className={`${darkMode ? ' text-secondary ' : ''} flex flex-row items-center text-xl gap-x-2 p-2 md:pl-4 md:pr-6 py-1 cursor-pointer hover:text-secondary hover:scale-110`}>
                        <IonIcon name="moon-outline" />
                        <div className='hidden md:flex items-center'>
                            Dark Mode
                        </div>
                    </div>

                    {isAuthenticated ? (
                        <div className={`${activeTab === '/notifications' ? ' text-secondary ' : ''} flex flex-row items-center text-xl gap-x-2 p-2 md:pl-4 md:pr-6 py-1 cursor-pointer hover:text-secondary hover:scale-110`}>
                            <IonIcon name="power-outline" />
                            <div className='hidden md:flex items-center'>
                                Log Out
                            </div>
                        </div>) : (
                        <div className={`${activeTab === '/notifications' ? ' text-secondary ' : ''} flex flex-row items-center text-xl gap-x-2 p-2 md:pl-4 md:pr-6 py-1 cursor-pointer hover:text-secondary hover:scale-110`}>
                            <IonIcon name="enter-outline" />
                            <div className='hidden md:flex items-center'>
                                Log In
                            </div>
                        </div>
                    )}
                </div>
            </div>

        </div>

    )
}

export default NavBar
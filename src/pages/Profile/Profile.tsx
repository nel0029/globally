import IonIcon from '@reacticons/ionicons'
import React, { useEffect, useState, useRef, useMemo } from 'react'
import { Outlet, useParams } from 'react-router'
import Header from '../../common/Header'
import BackButton from '../../common/BackButton'
import TitleText from '../../common/TitleText'
import ConfirmButton from '../../common/ConfirmButton'
import CancelButton from '../../common/CancelButton'
import { useSelector, useDispatch } from 'react-redux'
import { AppDispatch } from '../../redux/store'
import { getUserDetails } from '../../redux/asynActions/postAsynActions'
import { useLocation, useNavigate } from 'react-router'
import CoverPhoto from './ProfileComponents/CoverPhoto'
import { UserDetails } from '../../redux/postSlice'
import UserDetailsAvatar from './ProfileComponents/UserDetailsAvatar'
import FollowBlockContainer from './ProfileComponents/FollowBlockContainer'


export default function Profile() {
    const { userName } = useParams<{ userName: string }>()
    const user = useSelector((state: any) => state.user.userData)
    const dispatch = useDispatch<AppDispatch>()
    const location = useLocation();
    const [activeTab, setActiveTab] = useState(location.pathname);
    const navigate = useNavigate()

    const [scrollPositions, setScrollPositions] = useState<{ [key: string]: number }>({});


    const data = {
        userName: userName || '',
        authorID: user.userID || ''
    }


    useEffect(() => {
        dispatch(getUserDetails(data))
        console.log("Rerendered")
    }, [dispatch, userName])

    const userDetails: UserDetails = useSelector((state: any) => state.posts.userDetails)

    const goToUserPosts = () => {
        navigate(`/${userDetails?.userName}`, { replace: true })
        handleTabChange(activeTab)
        setActiveTab(`/${userDetails?.userName}`)
    }

    const goToUserReplies = () => {
        navigate(`/${userDetails?.userName}/replies`, { replace: true })
        handleTabChange(activeTab)
        setActiveTab(`/${userDetails?.userName}/replies`)
    }

    const goToUserReposts = () => {
        navigate(`/${userDetails?.userName}/reposts`, { replace: true })
        handleTabChange(activeTab)
        setActiveTab(`/${userDetails?.userName}/reposts`)
    }

    const goToUserLikes = () => {
        navigate(`/${userDetails?.userName}/likes`, { replace: true })
        handleTabChange(activeTab)
        setActiveTab(`/${userDetails?.userName}/likes`)
    }

    ////////////////////////////




    const handleTabChange = (tabUrl: string) => {
        setActiveTab(tabUrl);
    };

    const handleScroll = () => {
        const currentScrollPosition = window.scrollY;
        console.log('Current Scroll Position:', currentScrollPosition);
        setScrollPositions({ ...scrollPositions, [activeTab]: currentScrollPosition });
    };

    useEffect(() => {


        window.addEventListener('scroll', handleScroll);

        // Clean up the event listener on component unmount
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [activeTab, scrollPositions]);

    return (
        <div className='w-full dark:bg-Dark100 flex flex-col items-center'>
            <Header>
                <BackButton />
                <div className='flex flex-col leading-6'>
                    <TitleText>
                        <div className='w-full flex flex-row items-center'>
                            <span>{userDetails?.userFirstName}</span>
                            <span>{userDetails?.userMiddleName}</span>
                            <span>{userDetails?.userLastName}</span>
                        </div>
                    </TitleText>
                    <div className='flex items-center text-xs xl:text-sm text-gray-400'>
                        {userDetails?.allPostsCount} Posts
                    </div>
                </div>
            </Header>

            <CoverPhoto coverPhotoURL={userDetails?.coverPhotoURL} />
            <div className='w-full flex flex-col p-2 flex-wrap'>
                <div className='relative max-h-[60px] w-1/4 h-full'>
                    <UserDetailsAvatar avatarURL={userDetails?.avatarURL} />
                </div>
                <div className='w-full flex flex-row items-center justify-end '>

                    {user.userID === userDetails?._id ? (
                        <ConfirmButton
                            className='p-2 md:pl-4 md:pr-6 rounded-full'
                            onClick={[() => navigate('/accounts')]} >
                            <div className='text-sm sm:text-base flex flex-row items-center gap-x-2'>
                                <IonIcon name='cog-outline' />
                                <span className='hidden md:flex'>
                                    Edit Profile
                                </span>
                            </div>
                        </ConfirmButton>
                    ) : (
                        <FollowBlockContainer
                            isFollowedUser={userDetails?.isFollowedUser}
                            followID={userDetails?.followID}
                            userFollowingID={userDetails?._id} />)
                    }


                </div>
                <div className='w-full flex flex-col justify-center px-2'>
                    <TitleText>
                        <div className='w-full flex flex-row items-center gap-x-1'>
                            <span>{userDetails?.userFirstName}</span>
                            <span>{userDetails?.userMiddleName}</span>
                            <span>{userDetails?.userLastName}</span>
                        </div>
                    </TitleText>

                    <div className='text-base'>
                        {userDetails?.bio}
                    </div>
                    <div className='w-full flex flex-row items-center gap-x-2 flex-wrap '>
                        <div className='text-sm flex flex-row items-center gap-x-1'>
                            <span className='font-semibold'>
                                {userDetails?.followingsCount}
                            </span>
                            <span className='font-semibold text-gray-400'>
                                Following
                            </span>
                        </div>
                        <div className='text-sm flex flex-row items-center gap-x-1'>
                            <span className='font-semibold'>
                                {userDetails?.followersCount}
                            </span>
                            <span className='font-semibold text-gray-400'>
                                Followers
                            </span>
                        </div>
                    </div>
                </div>

            </div>
            <div className='w-full p-2 flex flex-row items-center justify-start gap-x-2 overflow-x-auto flex-nowrap flex-shrink snap-mandatory scroll-px-9 transform-gpu no-scrollbar'>
                <div
                    onClick={goToUserPosts}
                    className={`${activeTab === `/${userDetails?.userName}` ? 'border-b-4 border-secondary font-bold' : ''} py-1 px-5 flex-shrink-0 flex-1 flex flex-row justify-center items-center hover:bg-opacity-20 cursor-pointer`}>
                    Posts
                </div>
                <div
                    onClick={goToUserReplies}
                    className={`${activeTab === `/${userDetails?.userName}/replies` ? 'border-b-4 border-secondary font-bold' : ''} py-1 px-5 flex-shrink-0 flex-1 flex flex-row justify-center items-center hover:bg-opacity-20 cursor-pointer`}>
                    Replies
                </div>
                <div
                    onClick={goToUserReposts}
                    className={`${activeTab === `/${userDetails?.userName}/reposts` ? 'border-b-4 border-secondary font-bold' : ''} py-1 px-5 flex-shrink-0 flex-1 flex flex-row justify-center items-center hover:bg-opacity-20 cursor-pointer`}>
                    Reposts
                </div>
                <div
                    onClick={goToUserLikes}
                    className={`${activeTab === `/${userDetails?.userName}/likes` ? 'border-b-4 border-secondary font-bold' : ''} py-1 px-5 flex-shrink-0 flex-1 flex flex-row justify-center items-center hover:bg-opacity-20 cursor-pointer`}>
                    Likes
                </div>
            </div>
            <div

                className='w-full'
                onScroll={handleScroll}>
                <Outlet />
            </div>

        </div>
    )
}

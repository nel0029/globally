import { IonIcon } from '@ionic/react'
import { cogOutline } from 'ionicons/icons'
import React, { useEffect, useState, useRef, useMemo } from 'react'
import { Outlet, useParams } from 'react-router'
import Header from '../../common/Header'
import BackButton from '../../common/BackButton'
import TitleText from '../../common/TitleText'
import ConfirmButton from '../../common/ConfirmButton'
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

    const goToUserFollowing = () => {
        navigate(`/${userDetails?.userName}/following`)
    }

    const goToUserFollowers = () => {
        navigate(`/${userDetails?.userName}/followers`)
    }

    ////////////////////////////




    const handleTabChange = (tabUrl: string) => {
        setActiveTab(tabUrl);
    };

    const handleScroll = () => {
        const currentScrollPosition = window.scrollY;

        setScrollPositions({ ...scrollPositions, [activeTab]: currentScrollPosition });
    };

    useEffect(() => {


        window.addEventListener('scroll', handleScroll);

        // Clean up the event listener on component unmount
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [activeTab, scrollPositions]);

    const isInUserProfile = location.pathname === `/${user.userName}`
    return (
        <div className='w-full flex flex-col items-center justify-center gap-y-2 overflow-hidden flex-shrink'>
            <Header>
                {!isInUserProfile && <BackButton />}
                <div className='flex flex-col leading-6'>
                    <TitleText>
                        <div className='w-full flex flex-row items-center gap-x-1'>
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

            <div className='w-full flex flex-col gap-y-2 flex-shrink overflow-hidden'>
                <div className='w-full'>
                    <CoverPhoto coverPhotoURL={userDetails?.coverPhotoURL.url} />
                </div>
                <div className='w-full flex flex-col p-2 flex-wrap'>
                    <div className='relative max-h-[60px] w-1/4 h-full'>
                        <UserDetailsAvatar avatarURL={userDetails?.avatarURL} />
                    </div>
                    <div className='w-full flex flex-row items-center justify-end '>

                        {user.userID === userDetails?._id ? (
                            <ConfirmButton
                                className='p-2 md:pl-4 md:pr-6 rounded-full'
                                onClick={[() => navigate('/account/setting')]} >
                                <div className='text-sm sm:text-base flex flex-row items-center gap-x-2'>
                                    <IonIcon icon={cogOutline} />
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
                            <div
                                onClick={goToUserFollowing}
                                className='text-sm flex flex-row items-center gap-x-1 group relative cursor-pointer'>
                                <span className='font-semibold '>
                                    {userDetails?.followingsCount}
                                </span>
                                <span className='font-semibold text-gray-400 '>
                                    Following
                                </span>
                                <div className='hidden group-hover:flex absolute left-0 right-0 bottom-[2px] border-b-2 border-gray-400'></div>
                            </div>
                            <div
                                onClick={goToUserFollowers}
                                className='text-sm flex flex-row items-center gap-x-1 group relative cursor-pointer'>
                                <span className='font-semibold'>
                                    {userDetails?.followersCount}
                                </span>
                                <span className='font-semibold text-gray-400'>
                                    Followers
                                </span>
                                <div className='hidden group-hover:flex absolute left-0 right-0 bottom-[2px] border-b-2 border-gray-400'></div>
                            </div>
                        </div>
                    </div>

                </div>

                <div className='w-full overflow-x-auto flex flex-row border-b dark:border-Dark300 mb-2'>
                    <div
                        onClick={goToUserPosts}
                        className={`${activeTab === `/${userDetails?.userName}` ? 'border-b-4 border-secondary font-bold' : ''} flex justify-center items-center py-1 px-3 hover:bg-opacity-20 cursor-pointer`}>
                        Posts
                    </div>
                    <div
                        onClick={goToUserReplies}
                        className={`${activeTab === `/${userDetails?.userName}/replies` ? 'border-b-4 border-secondary font-bold' : ''} flex justify-center items-center py-1 px-3 hover:bg-opacity-20 cursor-pointer`}>
                        Replies
                    </div>
                    <div
                        onClick={goToUserReposts}
                        className={`${activeTab === `/${userDetails?.userName}/reposts` ? 'border-b-4 border-secondary font-bold' : ''} flex justify-center items-center py-1 px-3 hover:bg-opacity-20 cursor-pointer`}>
                        Reposts
                    </div>
                    <div
                        onClick={goToUserLikes}
                        className={`${activeTab === `/${userDetails?.userName}/likes` ? 'border-b-4 border-secondary font-bold' : ''} flex justify-center items-center py-1 px-3 hover:bg-opacity-20 cursor-pointer`}>
                        Likes
                    </div>
                </div>
            </div>
            <div
                className='w-full px-2'
                onScroll={handleScroll}>
                <Outlet />
            </div>
        </div>
    )
}

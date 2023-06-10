import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home/Home';
import Profile from '../pages/Profile/Profile';
import Register from '../pages/Register/Register';
import LogIn from '../pages/LogIn/LogIn';
import PostDetailsContainer from '../pages/PostDetails/PostDetailsContainer';
import ReplyDetailsContainer from '../pages/PostDetails/ReplyDetailsContainer';
import RepostDetailsContainer from '../pages/PostDetails/RepostDetailsContainer';
import PostCardList from '../pages/Profile/ProfileComponents/PostCardList';
import ReplyCardList from '../pages/Profile/ProfileComponents/ReplyCardList';
import RepostCardList from '../pages/Profile/ProfileComponents/RepostCardList';
import { useSelector } from 'react-redux';
import PrivateRoutes from './PrivateRoutes';
import LikedPostCardList from '../pages/Profile/ProfileComponents/LikedPostCardList';

export default function RoutePage() {
    const userDetails = useSelector((state: any) => state.posts.userDetails)
    const allPosts = useSelector((state: any) => state.posts.userPostsList)
    const user = useSelector((state: any) => state.user.userData)
    return (
        <Routes>
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<LogIn />} />

            <Route element={<PrivateRoutes />}>
                <Route path='/' element={<Home />} />
                <Route path='/:userName' element={<Profile />}>
                    <Route path='' element={<PostCardList />} />
                    <Route path='replies' element={<ReplyCardList />} />
                    <Route path='reposts' element={<RepostCardList />} />
                    <Route path='likes' element={<LikedPostCardList />} />
                </Route>
                <Route path='/:userName/posts/:postID' element={<PostDetailsContainer />} />
                <Route path='/:userName/replies/:postID' element={<ReplyDetailsContainer />} />
                <Route path='/:userName/reposts/:postID' element={<RepostDetailsContainer />} />
            </Route>

        </Routes>
    );
}

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home/Home';
import PostDetails from '../pages/Home/DropDown';
import Profile from '../pages/Profile/Profile';

export default function RoutePage() {
    return (
        <Routes>
            <Route path='/' element={<Home />}></Route>
            <Route path='/:userid' element={<Profile />}></Route>
            {/*} <Route path='/:userid/post/:postid' element={<PostDetails />}></Route> */}
        </Routes >
    )
}

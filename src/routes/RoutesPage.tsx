/** @format */

import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home/Home";
import Profile from "../pages/Profile/Profile";
import Register from "../pages/Register/Register";
import LogIn from "../pages/LogIn/LogIn";
import PostDetailsContainer from "../pages/PostDetails/PostDetailsContainer";
import ReplyDetailsContainer from "../pages/PostDetails/ReplyDetailsContainer";
import RepostDetailsContainer from "../pages/PostDetails/RepostDetailsContainer";
import PostCardList from "../pages/Profile/ProfileComponents/PostCardList";
import ReplyCardList from "../pages/Profile/ProfileComponents/ReplyCardList";
import RepostCardList from "../pages/Profile/ProfileComponents/RepostCardList";
import { useSelector } from "react-redux";
import PrivateRoutes from "./PrivateRoutes";
import LikedPostCardList from "../pages/Profile/ProfileComponents/LikedPostCardList";
import UserFollowingList from "../pages/Profile/ProfileComponents/UserFollowingList";
import UsersList from "../pages/Profile/UsersList";
import UserFollowerList from "../pages/Profile/ProfileComponents/UserFollowerList";
import Messages from "../pages/Messages/Messages";
import Notifications from "../pages/Notifications/Notifications";
import AccountSettings from "../pages/AccountSettings/AccountSettings";

interface RoutePageProps {
  pos: number;
}

const RoutePage: React.FC<RoutePageProps> = ({ pos }) => {
  return (
    <Routes>
      <Route element={<PrivateRoutes />}>
        <Route path="/" element={<Home />} />
        <Route path="/:userName" element={<UsersList />}>
          <Route path="following" element={<UserFollowingList />} />
          <Route path="followers" element={<UserFollowerList />} />
        </Route>
        <Route path="/:userName" element={<Profile scrollPos={pos} />}>
          <Route path="" element={<PostCardList />} />
          <Route path="replies" element={<ReplyCardList />} />
          <Route path="reposts" element={<RepostCardList />} />
          <Route path="likes" element={<LikedPostCardList />} />
        </Route>

        <Route path="/messages/*" element={<Messages />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/account/setting" element={<AccountSettings />} />

        <Route
          path="/:userName/posts/:postID"
          element={<PostDetailsContainer />}
        />
        <Route
          path="/:userName/replies/:postID"
          element={<ReplyDetailsContainer />}
        />
        <Route
          path="/:userName/reposts/:postID"
          element={<RepostDetailsContainer />}
        />
      </Route>
    </Routes>
  );
};

export default RoutePage;

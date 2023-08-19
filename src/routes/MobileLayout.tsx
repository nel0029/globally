/** @format */

import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home/Home";
import Profile from "../pages/Profile/Profile";
import PostDetailsContainer from "../pages/PostDetails/PostDetailsContainer";
import ReplyDetailsContainer from "../pages/PostDetails/ReplyDetailsContainer";
import RepostDetailsContainer from "../pages/PostDetails/RepostDetailsContainer";
import PostCardList from "../pages/Profile/ProfileComponents/PostCardList";
import ReplyCardList from "../pages/Profile/ProfileComponents/ReplyCardList";
import RepostCardList from "../pages/Profile/ProfileComponents/RepostCardList";
import PrivateRoutes from "./PrivateRoutes";
import LikedPostCardList from "../pages/Profile/ProfileComponents/LikedPostCardList";
import UserFollowingList from "../pages/Profile/ProfileComponents/UserFollowingList";
import UsersList from "../pages/Profile/UsersList";
import UserFollowerList from "../pages/Profile/ProfileComponents/UserFollowerList";
import Messages from "../pages/Messages/Messages";
import Notifications from "../pages/Notifications/Notifications";
import AccountSettings from "../pages/AccountSettings/AccountSettings";
import Explore from "../pages/Explore/Explore";
import SearchResultsTop from "../pages/Explore/ExploreComponents/SearchResultsTop";
import SearchResultsPosts from "../pages/Explore/ExploreComponents/SearchResultsPosts";
import SearchResultsUsers from "../pages/Explore/ExploreComponents/SearchResultsUsers";
import SearchResults from "../pages/Explore/ExploreComponents/SearchResults";
import TrendingHashtags from "../pages/Explore/ExploreComponents/TrendingHashtags";
import Settings from "../pages/Settings/Settings";
import MobileLayoutWithBottomNav from "./MobileLayoutWithBottomNav";
import MobileLayoutFullScreen from "./MobileLayoutFullScreen";

const MobileLayout = () => {
  return (
    <div className="w-full h-auto flex flex-col overflow-y-auto">
      <Routes>
        {/* Full Screen */}
        <Route element={<PrivateRoutes />}>
          <Route element={<MobileLayoutFullScreen />}>
            <Route path="/account/setting" element={<AccountSettings />} />
            <Route path="/settings" element={<Settings />} />
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

            <Route path="/:userName" element={<UsersList />}>
              <Route path="following" element={<UserFollowingList />} />
              <Route path="followers" element={<UserFollowerList />} />
            </Route>

            <Route path="/:userName" element={<Profile />}>
              <Route index element={<PostCardList />} />
              <Route path="replies" element={<ReplyCardList />} />
              <Route path="reposts" element={<RepostCardList />} />
              <Route path="likes" element={<LikedPostCardList />} />
            </Route>
          </Route>
          <Route element={<MobileLayoutWithBottomNav />}>
            <Route path="/" element={<Home />} />
            <Route path="/messages/*" element={<Messages />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/explore/*" element={<Explore />}>
              <Route index element={<TrendingHashtags />} />
              <Route path="search" element={<SearchResults />}>
                <Route path="top/*" element={<SearchResultsTop />} />
                <Route path="posts/*" element={<SearchResultsPosts />} />
                <Route path="users/*" element={<SearchResultsUsers />} />
              </Route>
            </Route>
          </Route>
        </Route>
      </Routes>
    </div>
  );
};

export default MobileLayout;

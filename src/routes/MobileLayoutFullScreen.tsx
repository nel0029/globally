/** @format */

import React, { useState, useEffect } from "react";
import { useLocation } from "react-router";
import { Route, Routes } from "react-router";
import PrivateRoutes from "./PrivateRoutes";
import SearchResults from "../pages/Explore/ExploreComponents/SearchResults";
import SearchResultsTop from "../pages/Explore/ExploreComponents/SearchResultsTop";
import SearchResultsPosts from "../pages/Explore/ExploreComponents/SearchResultsPosts";
import SearchResultsUsers from "../pages/Explore/ExploreComponents/SearchResultsUsers";
import AccountSettings from "../pages/AccountSettings/AccountSettings";
import Settings from "../pages/Settings/Settings";
import PostDetailsContainer from "../pages/PostDetails/PostDetailsContainer";
import ReplyDetailsContainer from "../pages/PostDetails/ReplyDetailsContainer";
import RepostDetailsContainer from "../pages/PostDetails/RepostDetailsContainer";
import UsersList from "../pages/Profile/UsersList";
import UserFollowingList from "../pages/Profile/ProfileComponents/UserFollowingList";
import UserFollowerList from "../pages/Profile/ProfileComponents/UserFollowerList";
import Profile from "../pages/Profile/Profile";
import PostCardList from "../pages/Profile/ProfileComponents/PostCardList";
import ReplyCardList from "../pages/Profile/ProfileComponents/ReplyCardList";
import RepostCardList from "../pages/Profile/ProfileComponents/RepostCardList";
import LikedPostCardList from "../pages/Profile/ProfileComponents/LikedPostCardList";

const MobileLayoutFullScreen = () => {
  return (
    <div className={` w-full h-full overflow-auto flex flex-col`}>
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route path="/explore/search" element={<SearchResults />}>
            <Route path="top/*" element={<SearchResultsTop />} />
            <Route path="posts/*" element={<SearchResultsPosts />} />
            <Route path="users/*" element={<SearchResultsUsers />} />
          </Route>
          <Route path="/account/setting" element={<AccountSettings />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/:userName" element={<Profile />}>
            <Route path="" element={<PostCardList />} />
            <Route path="replies" element={<ReplyCardList />} />
            <Route path="reposts" element={<RepostCardList />} />
            <Route path="likes" element={<LikedPostCardList />} />
          </Route>
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
        </Route>
      </Routes>
    </div>
  );
};

export default MobileLayoutFullScreen;

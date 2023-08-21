/** @format */

import React, { useState } from "react";
import { Route, Routes } from "react-router";
import PrivateRoutes from "./PrivateRoutes";
import Home from "../pages/Home/Home";
import Messages from "../pages/Messages/Messages";
import Notifications from "../pages/Notifications/Notifications";
import Explore from "../pages/Explore/Explore";
import TrendingHashtags from "../pages/Explore/ExploreComponents/TrendingHashtags";
import BottomNavigation from "../layout/BottomNavigation";
import SearchResults from "../pages/Explore/ExploreComponents/SearchResults";
import SearchResultsTop from "../pages/Explore/ExploreComponents/SearchResultsTop";
import SearchResultsPosts from "../pages/Explore/ExploreComponents/SearchResultsPosts";
import SearchResultsUsers from "../pages/Explore/ExploreComponents/SearchResultsUsers";

const MobileLayoutWithBottomNav = () => {
  return (
    <div className="w-full h-full flex flex-col">
      <div className="w-full flex flex-col pb-[76px]">
        <Routes>
          {/* With Bottom Nav */}
          <Route element={<PrivateRoutes />}>
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
        </Routes>
      </div>
      <BottomNavigation />
    </div>
  );
};

export default MobileLayoutWithBottomNav;

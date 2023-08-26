/** @format */

import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../redux/store";
import { searchWords } from "../../../redux/asynActions/exploreAsyncActions";
import { setQueryWords } from "../../../redux/exploreSlice";
import Card, { CardProps } from "../../Home/PostComponents/Card";
import CoverPhoto from "../../Profile/ProfileComponents/CoverPhoto";
import UserCard from "../../Profile/ProfileComponents/UserCard";

const SearchResultsTop = () => {
  const location = useLocation();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const user = useSelector((state: any) => state.user.userData);
  const topResults = useSelector((state: any) => state.explore.topResults);
  const querWords = useSelector((state: any) => state.explore.querWords);

  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get("q");

  useEffect(() => {
    const data = {
      query: encodeURIComponent(query ? query : ""),
      userID: user?.userID,
    };

    if (topResults === null) {
      dispatch(searchWords(data));
    } else {
      if (querWords !== null && querWords === query) {
        console.log(topResults);
      } else {
        dispatch(setQueryWords(query));
        dispatch(searchWords(data));
      }
    }
  }, [topResults?.length, query]);

  const goToMatchedPosts = () => {
    navigate(`/explore/search/posts?q=${query}`);
  };

  const goToMatchedUsers = () => {
    navigate(`/explore/search/users?q=${query}`);
  };

  return (
    <div className="w-full flex flex-col items-center gap-y-1 ">
      {topResults?.matchedUsers?.length > 0 && (
        <div className="w-full flex flex-col gap-y-2">
          <React.Fragment>
            {topResults?.matchedUsers?.map((user: any) => (
              <UserCard
                key={user._id}
                userName={user?.userName}
                firstName={user.userFirstName}
                middleName={user.userMiddleName}
                lastName={user.userLastName}
                avatarURL={user.avatarURL}
                verified={user.verified}
                bio={user.bio}
                rounded="rounded-lg"
              />
            ))}
            <div className="py-1 text-secondary ">
              <span onClick={goToMatchedUsers} className="cursor-pointer">
                View all
              </span>
            </div>
          </React.Fragment>
        </div>
      )}

      {topResults?.allPosts?.length > 0 && (
        <div className="w-full flex flex-col gap-y-2">
          <React.Fragment>
            {topResults?.allPosts?.map((post: CardProps) => (
              <Card
                isInHomeRoute={true}
                key={post._id}
                _id={post._id}
                authorID={post.authorID}
                postAuthorFirstName={post.postAuthorFirstName}
                postAuthorMiddleName={post.postAuthorMiddleName}
                postAuthorLastName={post.postAuthorLastName}
                postAuthorUserName={post.postAuthorUserName}
                postAuthorAvatarURL={post.postAuthorAvatarURL}
                parentAuthorFirstName={post.parentAuthorFirstName}
                parentAuthorMiddleName={post.parentAuthorMiddleName}
                parentAuthorLastName={post.parentAuthorLastName}
                parentUserName={post.parentUserName}
                parentAvatarURL={post.parentAvatarURL}
                parentPostID={post.parentPostID}
                parentAuthorID={post.parentAuthorID}
                parentCaption={post.parentCaption}
                parentMediaURL={post.parentMediaURL}
                parentHasPoll={post.parentHasPoll}
                parentPollOptions={post.parentPollOptions}
                parentPollRespondentsCount={post.parentPollRespondentsCount}
                parentLikesCount={post.parentLikesCount}
                parentRepliesCount={post.parentRepliesCount}
                parentRepostCount={post.parentRepostCount}
                parentBGColor={post.parentBGColor}
                type={post.type}
                caption={post.caption}
                mediaURL={post.mediaURL}
                likeID={post.likeID}
                isLiked={post.isLiked}
                likesCount={post.likesCount}
                repliesCount={post.repliesCount}
                repostsCount={post.repostsCount}
                isFollowedAuthor={post.isFollowedAuthor}
                followID={post.followID}
                createdAt={post.createdAt}
                hasPoll={post.hasPoll}
                pollOptions={post.pollOptions}
                pollRespondentsCount={post.pollRespondentsCount}
                hasChoosed={post.hasChoosed}
                optionChoosedID={post.optionChoosedID}
                verified={post.verified}
                parentAuthorVerified={post.parentAuthorVerified}
              />
            ))}
            <div className="py-1 text-secondary ">
              <span onClick={goToMatchedPosts} className="cursor-pointer">
                View all
              </span>
            </div>
          </React.Fragment>
        </div>
      )}
    </div>
  );
};

export default SearchResultsTop;

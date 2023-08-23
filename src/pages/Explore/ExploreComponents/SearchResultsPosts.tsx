/** @format */

import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../redux/store";
import { searchPostsByWord } from "../../../redux/asynActions/exploreAsyncActions";
import { setQueryWords } from "../../../redux/exploreSlice";
import Card, { CardProps } from "../../Home/PostComponents/Card";

const SearchResultsPosts = () => {
  const location = useLocation();
  const dispatch = useDispatch<AppDispatch>();

  const user = useSelector((state: any) => state.user.userData);
  const matchedPosts = useSelector((state: any) => state.explore.matchedPosts);
  const querWords = useSelector((state: any) => state.explore.querWords);

  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get("q");

  useEffect(() => {
    const data = {
      queryWords: query,
      userID: user?.userID,
    };

    if (matchedPosts === null) {
      dispatch(searchPostsByWord(data));
    } else {
      if (querWords !== null && querWords === query) {
        console.log(matchedPosts);
      } else {
        dispatch(setQueryWords(query));
        dispatch(searchPostsByWord(data));
      }
    }
  }, [matchedPosts?.length]);

  return (
    <div className="w-full h-auto flex flex-col items-center gap-y-2">
      {matchedPosts?.map((post: CardProps) => (
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
    </div>
  );
};

export default SearchResultsPosts;

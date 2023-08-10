/** @format */

import React from "react";
import { IonIcon } from "@ionic/react";
import { personAddOutline, personRemoveOutline } from "ionicons/icons";
import CancelButton from "../../../common/CancelButton";
import ConfirmButton from "../../../common/ConfirmButton";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../redux/store";
import { follow, unfollow } from "../../../redux/asynActions/postAsynActions";
import { FollowData, UnfollowData } from "../../../types/PostActionTypes";

interface FollowBlockContainerProps {
  isFollowedUser: boolean;
  userFollowingID: string;
  followID: string | null;
}

const FollowBlockContainer: React.FC<FollowBlockContainerProps> = ({
  isFollowedUser,
  userFollowingID,
  followID,
}) => {
  const user = useSelector((state: any) => state.user.userData);
  const dispatch = useDispatch<AppDispatch>();

  const followUser = () => {
    const data: FollowData = {
      userFollowingID: userFollowingID,
      userID: user.userID,
    };

    dispatch(follow(data));
  };

  const unfollowUser = () => {
    const data: UnfollowData = {
      followID: followID,
      userID: user.userID,
    };

    dispatch(unfollow(data));
  };

  return (
    <div className="flex flex-row items-center p-2 gap-x-2">
      {isFollowedUser ? (
        <CancelButton
          className="pl-4 pr-6 py-1 rounded-full"
          onClick={[unfollowUser]}
        >
          <div className="text-sm sm:text-base flex flex-row items-center gap-x-2">
            <IonIcon icon={personRemoveOutline} />
            <span className="">Unfollow</span>
          </div>
        </CancelButton>
      ) : (
        <ConfirmButton
          className="pl-4 pr-6 py-1 rounded-full"
          onClick={[followUser]}
        >
          <div className="text-sm sm:text-base flex flex-row items-center gap-x-2">
            <IonIcon icon={personAddOutline} />
            <span className="">Follow</span>
          </div>
        </ConfirmButton>
      )}
    </div>
  );
};

export default FollowBlockContainer;

/** @format */

import React, { useState } from "react";
import { PollResponse } from "../../../types/PostActionTypes";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../redux/store";
import { createNewPollResponse } from "../../../redux/asynActions/postAsynActions";
import { IonIcon } from "@ionic/react";
import { squareOutline, checkbox } from "ionicons/icons";

interface OptionProps {
  _id?: string;
  body?: string;
  count?: number;
}

interface PollOptionListProps {
  options?: OptionProps[];
  postID?: string;
  hasChoosed?: boolean;
  optionChoosedID?: string;
  pollRespondentsCount?: number;
}

const PollOptionsCard: React.FC<PollOptionListProps> = ({
  options,
  postID,
  hasChoosed,
  optionChoosedID,
  pollRespondentsCount,
}) => {
  const user = useSelector((state: any) => state.user.userData);
  const [selectedOptionID, setSelectedOptionID] = useState<string>("");
  const dispatch = useDispatch<AppDispatch>();
  const isOptionSelected = (ID: string): boolean => selectedOptionID === ID;
  const totalRespondents = pollRespondentsCount ? pollRespondentsCount : 0;

  const handleOptionChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    event.preventDefault();
    const optionID = event.currentTarget.value;
    setSelectedOptionID(optionID);
    const pollResponseData: PollResponse = {
      postID: postID || "",
      optionID: optionID,
      respondentID: user?.userID || "",
    };
    dispatch(createNewPollResponse(pollResponseData));
    event.stopPropagation();
  };

  return (
    <div
      onClick={(event: any) => event.stopPropagation()}
      className="w-full flex flex-col justify-center items-center gap-y-2 flex-shrink"
    >
      {options &&
        options.map((option: OptionProps, index: number) => (
          <label
            key={index}
            className={` relative w-full flex gap-x-2 items-center border dark:border-Dark400 p-2 rounded-lg text-base cursor-pointer overflow-hidden`}
          >
            <input
              type="radio"
              name="pollOption"
              value={option._id}
              checked={isOptionSelected(option._id ?? "")}
              onChange={handleOptionChange}
              disabled={hasChoosed ? true : false}
              className="peer sr-only"
            />
            <div
              className={`${
                option._id === optionChoosedID ? "text-secondary" : ""
              } z-10 flex items-center justify-center`}
            >
              <IonIcon
                icon={`${
                  option._id === optionChoosedID ? checkbox : squareOutline
                }`}
              />
            </div>
            <div
              onClick={(event: any) => event.stopPropagation()}
              className={`${
                hasChoosed
                  ? " cursor-default"
                  : "peer-checked:text-secondary peer-hover:text-secondary"
              } z-10 w-full`}
            >
              {option.body}
            </div>
            <div
              className="z-1 absolute bg-secondary top-0 left-0 right-0 bottom-0 bg-opacity-20 "
              style={{
                width: `${
                  option.count
                    ? Math.round((option.count / totalRespondents) * 100)
                    : 0
                }%`,
              }}
            ></div>
            <div>
              {option.count
                ? Math.round((option.count / totalRespondents) * 100)
                : 0}
              %
            </div>
          </label>
        ))}
      {hasChoosed ? (
        totalRespondents > 1 ? (
          <div className="w-full text-gray-400 line-clamp-1">
            You and {totalRespondents - 1} others responds to this poll
          </div>
        ) : (
          <div className="w-full text-gray-400 line-clamp-1">
            You responds to this poll
          </div>
        )
      ) : totalRespondents > 1 ? (
        <div className="w-full text-gray-400 line-clamp-1">
          {totalRespondents} users respond to this poll
        </div>
      ) : (
        <div className="w-full text-gray-400 line-clamp-1">
          {totalRespondents} user responds to this poll
        </div>
      )}
    </div>
  );
};

export default PollOptionsCard;

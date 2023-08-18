/** @format */

import React, { useState, useContext } from "react";
import { IonIcon } from "@ionic/react";
import { close, trashOutline, addOutline, listOutline } from "ionicons/icons";
import { useDispatch, useSelector } from "react-redux";
import { createPost } from "../../../redux/asynActions/postAsynActions";
import { AppDispatch } from "../../../redux/store";
import ConfirmButton from "../../../common/ConfirmButton";
import { NewPost } from "../../../types/PostActionTypes";
import TextAreaInput from "../../../common/TextAreaInput";
import CircularProgress from "../../../common/CircularProgress";
import MediaButton from "../../../common/MediaButton";

export default function CreateNewPostInput() {
  const user = useSelector((state: any) => state.user.userData);

  const dispatch = useDispatch<AppDispatch>();
  const [postBody, setPostBody] = useState("");
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]); // Explicitly define the type for selectedFiles
  const [hasPoll, setHaspoll] = useState(false);
  const [poll, setPoll] = useState<boolean>(false);
  const [option, setOption] = useState<string>("");
  const [pollOptionList, setPollOptionList] = useState<string[]>([]);
  const [hasBackgroundColor, setHasBackgroundColor] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState("");

  const bgColorOptions = [
    "",
    "#ff2052",
    "#1DA1F2",
    "#00a328",
    "#ffd166",
    "#073b4c",
  ];

  const createNewPost = () => {
    const newPost: NewPost = {
      authorID: user.userID,
      caption: postBody,
      file: selectedFiles[0],
      hasPoll: hasPoll,
      pollOptions: pollOptionList,
      bgColor: backgroundColor,
    };

    dispatch(createPost(newPost)).then(() => {
      setPostBody("");
      setSelectedFiles([]);
      setPollOptionList([]);
      setPoll(false);
      setBackgroundColor("");
      setHasBackgroundColor(false);
    });
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if (files && files.length > 0) {
      const file = files[0];

      if (selectedFiles.length + 1 > 10) {
        event.preventDefault();
        alert("Cannot upload more than 10 files");
        return;
      }

      setSelectedFiles((prevFiles) => [...prevFiles, file]);
    }
  };

  const removeSelectedFile = (index: number) => {
    const updatedFiles = [...selectedFiles];
    updatedFiles.splice(index, 1);
    setSelectedFiles(updatedFiles);
  };

  const openPoll = () => {
    setPoll(!poll);
    setHaspoll(!hasPoll);
    setPollOptionList([]);
  };

  const optionListLength = pollOptionList.length;
  const isMaxOption = optionListLength >= 5;
  const isMinOption = optionListLength < 2;

  const addOption = () => {
    setPollOptionList((prev: string[]) => [...prev, option]);
    setOption("");
  };

  const removeOption = (index: number) => {
    const updatedOptionList = [...pollOptionList];
    updatedOptionList.splice(index, 1);
    setPollOptionList(updatedOptionList);
  };

  const handleOptionOnChange = (event: any) => {
    const newValue = event.target.value;
    if (newValue.length > 25) {
      setOption(newValue.slice(0, 25));
    } else {
      setOption(newValue);
    }
  };

  return (
    <div className="w-full  flex flex-col p-2">
      <form
        onSubmit={(event: React.FormEvent<HTMLFormElement>) =>
          event.preventDefault()
        }
        className="w-full flex flex-col justify-center items-center"
      >
        <TextAreaInput
          maxLength={99}
          bgColor={backgroundColor}
          body={postBody}
          setBody={setPostBody}
          placeholder="Create a new post"
        />

        {selectedFiles.length > 0 && (
          <div className="w-full flex flex-row items-center justify-start py-2 gap-x-2 overflow-x-auto flex-nowrap flex-shrink snap-mandatory scroll-px-9 transform-gpu no-scroll-bar lg:scroll-bar-horizontal">
            {selectedFiles.map((file, index) => (
              <div key={index} className="relative">
                <div className="w-16 h-16 rounded-lg flex items-center justify-center">
                  <img
                    className="w-full h-full object-cover rounded-lg"
                    src={URL.createObjectURL(file)}
                    alt={`Preview ${index}`}
                  />
                </div>

                <button
                  className="absolute top-0 right-0 text-lg text-red-500 cursor-pointer"
                  onClick={() => removeSelectedFile(index)}
                >
                  <IonIcon icon={close} />
                </button>
              </div>
            ))}
          </div>
        )}

        {poll && (
          <div className="w-full flex flex-col gap-y-1 py-2">
            {pollOptionList.map((option: string, index: number) => (
              <div
                key={index}
                className="flex items-center border dark:border-Dark400 p-2 rounded-lg text-base"
              >
                <div className="flex-1">{option}</div>
                <div
                  onClick={() => removeOption(index)}
                  className="p-1 text-primary hover:text-opacity-60 cursor-pointer flex justify-center items-center"
                >
                  <IonIcon icon={trashOutline} />
                </div>
              </div>
            ))}
            <div
              className={`${
                isMaxOption ? "hidden" : "flex"
              } w-full flex-row items-center justify-center gap-x-2`}
            >
              <div className="h-10 rounded-lg border dark:border-Dark400 flex-1">
                <input
                  type="text"
                  placeholder="Add Option"
                  maxLength={25}
                  value={option}
                  onChange={handleOptionOnChange}
                  disabled={isMaxOption}
                  className="w-full h-full bg-transparent outline-none border-none p-1"
                />
              </div>
              <CircularProgress
                percentage={option.length}
                max={25}
                width={30}
              />
              <button
                onClick={addOption}
                disabled={isMaxOption}
                className="flex justify-center items-center text-3xl text-secondary cursor-pointer hover:text-opacity-60 p-1 border dark:border-Dark400 rounded-lg"
              >
                <IonIcon icon={addOutline} />
              </button>
            </div>
          </div>
        )}
        {isMinOption && poll ? (
          <div className="text-gray-500">Add atleast two option</div>
        ) : null}

        {/* Background Color*/}
        {hasBackgroundColor && (
          <div className="w-full flex flex-row items-center gap-x-2 pt-2">
            <div
              onClick={() => setHasBackgroundColor(false)}
              className="border-gray-500 dark:border-white border py-1 px-1 rounded text-primary flex justify-center items-center"
            >
              <IonIcon icon={close} />
            </div>
            {bgColorOptions.map((option: any) => (
              <label key={option} className="cursor-pointer">
                <input
                  type="radio"
                  value={option}
                  checked={backgroundColor === option}
                  onChange={(event: any) => {
                    setBackgroundColor(event.currentTarget.value);
                  }}
                  className="peer sr-only"
                />
                <div
                  style={{
                    backgroundColor: option,
                  }}
                  className={`border-gray-500 dark:border-white border p-3 rounded peer-checked:border-gray-500 dark:peer-checked:border-white peer-checked:border`}
                ></div>
              </label>
            ))}
          </div>
        )}
        <div className="w-full flex flex-row justify-between gap-x-2 py-2">
          <div className="flex flex-row items-center gap-x-2">
            <div
              onClick={() => setHasBackgroundColor(true)}
              style={{ background: backgroundColor }}
              className="border-gray-500 dark:border-white border p-3 rounded"
            ></div>
            <div>
              <label htmlFor="fileInput">
                <MediaButton hasDisabled={poll} />
              </label>
              <input
                type="file"
                id="fileInput"
                name="file"
                accept="image/*"
                disabled={
                  poll || hasBackgroundColor || selectedFiles.length > 0
                }
                style={{ display: "none" }}
                onChange={handleFileChange}
              />
            </div>
            <button
              onClick={openPoll}
              disabled={selectedFiles.length > 0 ? true : false}
              className={`flex justify-center items-center text-3xl text-secondary ${
                selectedFiles.length > 0
                  ? "cursor-default text-opacity-60"
                  : "cursor-pointer hover:text-opacity-60"
              }`}
            >
              <IonIcon icon={listOutline} />
            </button>
          </div>
          <div className="flex flex-row items-center gap-x-2">
            <CircularProgress
              max={99}
              width={32}
              percentage={postBody.length}
            />

            <ConfirmButton
              disabled={isMinOption && poll}
              onClick={[createNewPost]}
            >
              Post
            </ConfirmButton>
          </div>
        </div>
      </form>
    </div>
  );
}

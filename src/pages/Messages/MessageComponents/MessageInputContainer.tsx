/** @format */

import React from "react";
import { IonIcon } from "@ionic/react";
import { paperPlane } from "ionicons/icons";

interface MessageInputContainerProps {
  onClick: () => void;
  messageText: string;
  setMessageText: (val: any) => void;
}

const MessageInputContainer: React.FC<MessageInputContainerProps> = ({
  onClick,
  messageText,
  setMessageText,
}) => {
  return (
    <div className="sticky bottom-0 dark:bg-Dark100 bg-Light100 w-full flex flex-row px-2 py-4 flex-shrink overflow-x-hidden">
      <div className="flex-grow">
        <input
          placeholder="Aa"
          className="w-full bg-transparent border dark:border-Dark300 outline-none p-2 rounded-lg"
          type="text"
          value={messageText}
          onChange={(event: any) => setMessageText(event.target.value)}
        />
      </div>
      <button
        className="p-2 text-3xl flex flex-row items-center gap-x-2 text-secondary"
        onClick={onClick}
      >
        <IonIcon icon={paperPlane} />
      </button>
    </div>
  );
};

export default MessageInputContainer;

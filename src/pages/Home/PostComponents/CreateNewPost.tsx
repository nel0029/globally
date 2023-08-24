/** @format */

import React, { useContext } from "react";
import CreateNewPostInput from "./CreateNewPostInput";

export default function CreateNewPost() {
  return (
    <div className="w-full border-y-[0.5px] dark:border-Dark300">
      <CreateNewPostInput />
    </div>
  );
}

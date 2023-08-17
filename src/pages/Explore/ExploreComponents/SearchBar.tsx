/** @format */

import React, { useState } from "react";
import { IonIcon } from "@ionic/react";
import { search } from "ionicons/icons";
import { useSelector } from "react-redux";

interface SearchBarProps {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  onSubmit: (params: any) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ value, setValue, onSubmit }) => {
  const q = useSelector((state: any) => state.explore.queryWords);

  const [isFocused, setIsFocused] = useState<boolean>(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setValue(newValue);
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };
  return (
    <form
      className={`${
        isFocused
          ? "border border-secondary outline outline-1 outline-secondary"
          : "border dark:border-Dark400"
      } w-full flex flex-row items-center rounded-full py-1 px-2 gap-x-1 sticky top-0`}
      onSubmit={onSubmit}
    >
      <div
        className={`${
          isFocused ? "text-secondary" : ""
        } p-1 flex justify-center items-center`}
      >
        <IonIcon icon={search} />
      </div>
      <input
        className="w-full outline-none border-none bg-transparent py-1 text-xl font-semibold"
        type="text"
        placeholder={q ? q : "Search..."}
        value={value}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          handleChange(event)
        }
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
    </form>
  );
};

export default SearchBar;

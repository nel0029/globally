/** @format */

import React, { useState, useEffect } from "react";
import { IonIcon } from "@ionic/react";
import { search, close } from "ionicons/icons";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

interface SearchBarProps {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  onSubmit: (params: any) => void;
  isFocused: boolean;
  setIsFocused: React.Dispatch<React.SetStateAction<boolean>>;
}

const SearchBar: React.FC<SearchBarProps> = ({
  value,
  setValue,
  onSubmit,
  isFocused,
  setIsFocused,
}) => {
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get("q");

  const [placeholder, setPlaceHolder] = useState("");

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

  useEffect(() => {
    if (query) {
      setPlaceHolder(query);
    }
  }, [location.pathname, query]);

  const resetValue = () => {
    setValue("");
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
        className="w-full outline-none border-none bg-transparent py-1 font-semibold"
        type="text"
        placeholder={placeholder ? placeholder : "Search..."}
        value={value}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          handleChange(event)
        }
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      {value.length > 0 && (
        <div
          onClick={resetValue}
          className={`text-primary p-1 flex justify-center items-center `}
        >
          <IonIcon icon={close} />
        </div>
      )}
    </form>
  );
};

export default SearchBar;

/** @format */

import React from "react";
import { useLocation } from "react-router-dom";

const SearchResultsUsers = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get("q");
  return <div>{query}</div>;
};

export default SearchResultsUsers;

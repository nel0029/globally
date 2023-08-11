/** @format */

import React, {
  useState,
  useEffect,
  useContext,
  createContext,
  useReducer,
} from "react";
import CreateNewPost from "./PostComponents/CreateNewPost";
import { useSelector, useDispatch } from "react-redux/es/exports";
import { getPosts } from "../../redux/asynActions/postAsynActions";
import { AppDispatch } from "../../redux/store";
import Card from "./PostComponents/Card";
import Header from "../../common/Header";
import LoadingCard from "./PostComponents/LoadingCard";

export default function Home() {
  const posts = useSelector((state: any) => state.posts.PostData || []);

  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: any) => state.user.userData);
  const userID = localStorage.getItem("userID");

  useEffect(() => {
    if (posts.length !== 0) {
      setIsLoading(false);
    } else {
      setIsLoading(true);

      dispatch(getPosts(user.userID)).then((response: any) => {
        if (response.meta.requestStatus === "fulfilled") {
          setIsLoading(false);
        }
      });
    }
  }, []);

  return (
    <div className="flex-1 h-full w-full flex flex-col items-center justify-start gap-y-2 overflow-y-auto">
      <Header>
        <div className="flex justify-center items-center font-bold text-2xl rounded-full text-secondary">
          Home
        </div>
      </Header>

      <div className="w-full flex flex-col justify-start items-center gap-y-4 px-2 ">
        <CreateNewPost />
        <div className="flex w-full flex-col-reverse justify-center items-center gap-y-2">
          {isLoading ? (
            <div className="w-full flex flex-col justify-center items-center gap-y-4">
              <LoadingCard />
              <LoadingCard />
            </div>
          ) : (
            posts.map((post: any) => {
              return <Card isInHomeRoute={true} key={post._id} {...post} />;
            })
          )}
        </div>
      </div>
    </div>
  );
}

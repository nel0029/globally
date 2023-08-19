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

  useEffect(() => {
    if (posts.length !== 0) {
      setIsLoading(false);
    } else {
      setIsLoading(true);

      setTimeout(() => {
        dispatch(getPosts(user.userID)).then((response: any) => {
          if (response.meta.requestStatus === "fulfilled") {
            setIsLoading(false);
          }
        });
      }, 2000);
    }
  }, []);

  return (
    <div className="flex-1 w-full flex flex-col items-center justify-start gap-y-2 ">
      <Header>
        <div className="hidden xl:flex justify-center items-center font-bold text-2xl text-secondary">
          Home
        </div>
        <div className="flex-1 w-full flex xl:hidden flex-row justify-center items-center">
          <div className="flex justify-center items-center w-[32px] rounded-full text-secondary">
            <img
              className="w-[32px] rounded-full object-cover"
              src="/icon-512x512.png"
            />
          </div>
        </div>
      </Header>

      <div className="w-full flex flex-col justify-start items-center gap-y-2 px-2 ">
        <CreateNewPost />
        <div className="flex w-full flex-col-reverse justify-start items-center gap-y-2">
          {isLoading ? (
            <React.Fragment>
              <LoadingCard />
              <LoadingCard />
            </React.Fragment>
          ) : (
            <React.Fragment>
              <div className="p-2">No more posts</div>
              {posts.map((post: any) => (
                <Card isInHomeRoute={true} key={post._id} {...post} />
              ))}
            </React.Fragment>
          )}
        </div>
      </div>
    </div>
  );
}

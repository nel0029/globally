import { createContext } from "react";
import { PostsDataProps } from "../types/PostTypes";
import PostData from "../data/PostData";


export const PostsContext = createContext<{ postState: PostsDataProps[], dispatch: any }>({ postState: PostData, dispatch: () => { } })
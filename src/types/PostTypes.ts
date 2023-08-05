/** @format */

interface OptionProps {
  _id: string;
  body: string;
}

interface MediaProps {
  id: string;
  url: string;
}
export interface PostsDataProps {
  type: string;
  _id: string;
  postAuthorAvatarURL: MediaProps;
  postAuthorFirstName: string;
  postAuthorMiddleName: string;
  postAuthorLastName: string;
  postAuthorUserName: string;
  authorID: string;
  createdAt: string;
  caption: string;
  mediaURL: MediaProps[];
  isLiked: boolean;
  likeID: string | null;
  likesCount: number;
  repliesCount: number;
  repostsCount: number;
  bgColor?: string;
  isFollowedAuthor: boolean;
  followID: string | null;
  hasPoll?: boolean;
  pollID?: string;
  pollOptions?: OptionProps[];
}

export interface ReplyDataProps {
  parentPostID: string;
  parentType: string;
  parentAuthorID: string;
  parentUserName: string;
  type: string;
  _id: string;
  postAuthorAvatarURL: MediaProps;
  postAuthorFirstName: string;
  postAuthorMiddleName: string;
  postAuthorLastName: string;
  postAuthorUserName: string;
  authorID: string;
  createdAt: string;
  caption: string;
  mediaURL: MediaProps[];
  isLiked: boolean;
  likeID: string | null;
  likesCount: number;
  repliesCount: number;
  repostsCount: number;
  isFollowedAuthor: boolean;
  followID: string | null;
}

export interface RepostDataProps {
  parentPostID: string;
  parentType: string;
  parentAuthorID: string;
  parentUserName: string;
  parentAuthorFirstName: string;
  parentAuthorMiddleName: string;
  parentAuthorLastName: string;
  parentAvatarURL: MediaProps;
  parentCaption: string;
  parentMediaURL: MediaProps[];
  parentLikesCount: number;
  parentRepliesCount: number;
  parentRepostCount: number;
  type: string;
  _id: string;
  postAuthorAvatarURL: MediaProps;
  postAuthorFirstName: string;
  postAuthorMiddleName: string;
  postAuthorLastName: string;
  postAuthorUserName: string;
  authorID: string;
  createdAt: string;
  caption: string;
  mediaURL: MediaProps[];
  isLiked: boolean;
  likeID: string | null;
  likesCount: number;
  repliesCount: number;
  repostsCount: number;
  parentBGColor?: string;
  isFollowedAuthor: boolean;
  followID: string | null;
}

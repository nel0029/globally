export interface DeletePost {
    postID: string
}

export interface DeletePostData {
    authorID: string;
    postID: string;
}

export interface DeleteReply {
    postID: string,
    parentID: string
}

export interface DeleteReplyData {
    authorID: string;
    postID: string;
}

export interface DeleteRepost {
    postID: string,
    parentID: string
}

export interface DeleteRepostData {
    authorID: string;
    postID: string;
}

export interface Unlike {
    parentID: string
    authorID: string
    likeID: string | null; // Add likeID property
}

export interface LikeData {
    authorID: string;
    likeID: string;
}

export interface UnlikeData {
    authorID: string;
    likeID: string;
}

export interface Like {
    postID: string,
    parentType: string,
    authorID: string,
}

export interface NewPost {
    authorID: string,
    caption: string,
    mediaURL: string[]
}

export interface NewReply {
    postID: string,
    parentType: string,
    authorID: string,
    caption: string,
    mediaURL: string[]
}

export interface UpdatePostData {
    _id: string,
    authorID: string,
    caption: string
}

export interface UpdatedPost {
    _id: string,
    authorID: string,
    caption: string
}

export interface NewLike {
    postID: string,
    authorID: string
    parentType: string
}

export interface NewRepost {
    postID: string,
    parentType: string,
    authorID: string,
    caption: string,
}

export interface UpdateReply {
    _id: string,
    authorID: string,
    caption: string
}

export interface UpdateRepost {
    _id: string,
    authorID: string,
    caption: string
}

export interface PostDetailsData {
    postID: string,
    userName: string,
    authorID: string
}

export interface RepliesByPostIDData {
    postID: string,
    userName: string,
    authorID: string,
    postType: string
}

export interface ReplyDetailsData {
    postID: string,
    userName: string,
    authorID: string
}

export interface RepostDetailsData {
    postID: string,
    userName: string,
    authorID: string
}

export interface GetUserDetailsData {
    userName: string
    authorID: string
}

export interface FollowData {
    userFollowingID: string
    userID: string
}

export interface Follow {
    followID: string
    followingID: string
    followerID: string
}

export interface UnfollowData {
    followID: string | null
    userID: string
}

export interface Unfollow {
    followID: string | null
    followingID: string
}

export interface GetAllUserLikes {
    userID: string
    userName: string
}
export interface DeletePost {
    postID: string
}

export interface DeletePostData {
    userID: string;
    postID: string;
    actionType: string;
}

export interface Unlike {
    parentID: string
    likeID: string | null; // Add likeID property
}

export interface LikeData {
    userID: string;
    likeID: string;
    actionType: string;
    parentType: string;
}

export interface Like {
    actionType: string,
    postID: string,
    parentType: string,
    userID: string,
}

export interface NewPost {
    actionType: string,
    userName: string,
    caption: string,
    mediaURL: string[]
}

export interface UpdatePost {
    actionType: string,
    postID: string,
    userID: string,
    caption: string
}
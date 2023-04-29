export interface PostsDataProps {
    postID: number,
    avatarUrl: string,
    postAuthorFirstName: string,
    postAuthorMiddleName: string,
    postAuthorLastName: string,
    postAuthorUserID: string,
    postDateAndTime: string,
    postCaption: string,
    postImgUrls: string[],
    postLikes: PostLikesProps[],
    postComments: PostCommentsProps[],
    postReposts: PostReposts[],
}

export interface PostLikesProps {
    avatarUrl: string,
    userID: string,
    userFirstName: string,
    userMiddleName: string,
    userLastName: string,
    like: boolean,
    dateLiked: string
}

export interface CommentLikesProps {
    avatarUrl: string,
    userID: string,
    userFirstName: string,
    userMiddleName: string,
    userLastName: string,
    like: boolean,
    dateLiked: string
}



export interface PostCommentsProps {
    commentID: number,
    avatarUrl: string,
    commentAuthorFirstName: string,
    commentAuthorMiddleName: string,
    commentAuthorLastName: string,
    commentAuthorUserID: string,
    commentDateAndTime: string,
    commentCaption: string,
    commentImgUrls: string[],
    commentLikes: PostLikesProps[],
    commentReplies: PostCommentsProps[],
}

export interface PostReposts {
    userID: string,
    userFirstName: string,
    userMiddleName: string,
    userLastName: string,
    like: boolean,
    dateLiked: string
}
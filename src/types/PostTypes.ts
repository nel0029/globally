export interface PostsDataProps {
    type: string,
    _id: string,
    avatarURL: string,
    postAuthorFirstName: string,
    postAuthorMiddleName: string,
    postAuthorLastName: string,
    userName: string,
    createdAt: string,
    caption: string,
    mediaURL: string[],
    liked: boolean,
    likeID: string,
    likesCount: number
    repliesCount: number
    repostsCount: number
}

export interface PostLikesProps {
    userName: string,
    parentID: string,
}





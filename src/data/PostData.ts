interface Posts {
    postID: string,
    avatarUrl: string,
    postAuthorFirstName: string,
    postAuthorMiddleName: string,
    postAuthorLastName: string,
    postAuthorUserID: string,
    postDateAndTime: string,
    postCaption: string,
    postImgUrls: string[],
    postLikes: PostLikes[],
    postComments: Posts[],
    postReposts: PostReposts[],
}

interface PostLikes {
    userID: string,
    like: boolean,
    dateLiked: string
}
interface PostReposts {
    userID: string,
    dateReposted: string
}

const PostData: Posts[] = [
    {
        postID: "dgwedywegdihds",
        avatarUrl: "https://i.pinimg.com/550x/12/34/07/123407db7309943ded82fac871dec181.jpg",
        postAuthorFirstName: "John",
        postAuthorMiddleName: "Trump",
        postAuthorLastName: "Doe",
        postAuthorUserID: "johndoe_01",
        postDateAndTime: "February 2, 2023",
        postCaption: "New ProfilePicture",
        postImgUrls: ["https://i.pinimg.com/550x/12/34/07/123407db7309943ded82fac871dec181.jpg"],
        postLikes: [
            {
                userID: "donaldTrump",
                like: true,
                dateLiked: "February 3, 2023"
            }
        ],
        postComments: [
            {
                postID: "jhasdjasgkaldi",
                avatarUrl: "https://i.pinimg.com/550x/12/34/07/123407db7309943ded82fac871dec181.jpg",
                postAuthorFirstName: "Joe",
                postAuthorMiddleName: "",
                postAuthorLastName: "Biden",
                postAuthorUserID: "joeBidenOfficial",
                postDateAndTime: "February 4, 2023",
                postCaption: "Reply 1",
                postImgUrls: [],
                postLikes: [],
                postComments: [],
                postReposts: [],
            }
        ],
        postReposts: [],
    },
    {
        postID: "",
        avatarUrl: "",
        postAuthorFirstName: "",
        postAuthorMiddleName: "",
        postAuthorLastName: "",
        postAuthorUserID: "",
        postDateAndTime: "",
        postCaption: "",
        postImgUrls: [],
        postLikes: [],
        postComments: [],
        postReposts: [],
    }
]


export default PostData


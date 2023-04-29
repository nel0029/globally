interface PostProps {
    postAuthorName: string,
    postBody: string,
    comments: CommentProps[]
}

interface CommentProps {
    commentAuthorName: string,
    commentBody: string,
    replies: CommentProps[]
}

//export const POSTS: PostProps[] = []
export const POSTS: PostProps[] = [
    {
        postAuthorName: "Someone 1",
        postBody: "Post 1",
        comments: [
            {
                commentAuthorName: "Somebody 1",
                commentBody: "Comment 1",
                replies: [
                    {
                        commentAuthorName: "Somebody 3",
                        commentBody: "Reply 1",
                        replies: []
                    },
                    {
                        commentAuthorName: "Somebody 4",
                        commentBody: "Reply 2",
                        replies: [
                            {
                                commentAuthorName: "Somebody 5",
                                commentBody: "Reply on Reply 1",
                                replies: []
                            },
                        ]
                    },
                ]
            },
            {
                commentAuthorName: "Somebody 2",
                commentBody: "Comment 2",
                replies: []
            },
            {
                commentAuthorName: "",
                commentBody: "",
                replies: []
            },
        ]
    },
    {
        postAuthorName: "Joe Biden",
        postBody: "Hello World",
        comments: [

        ]
    },
]

const samplePost = {
    postAuthorName: "",
    postBody: "",
    comments: [

    ]
}

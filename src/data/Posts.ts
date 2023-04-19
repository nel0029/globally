interface Post {

    postAuthorName: string,
    postContent: string,
    comments: Comment[]
}

interface Comment {
    commentAuthorName: string,
    postContent: string,
    comments: Comment[]
}

export const POSTS: Post[] = [
    {

        postAuthorName: "Someone 1",
        postContent: "HelloWorld",
        comments: [
            {
                commentAuthorName: "Somebody 1",
                postContent: "Comment 1",
                comments: [
                    {
                        commentAuthorName: "Somebody 2",
                        postContent: "Reply 1",
                        comments: [
                            {
                                commentAuthorName: "Somebody 3",
                                postContent: "Reply 1.1",
                                comments: []
                            },
                            {
                                commentAuthorName: "Somebody 4",
                                postContent: "Reply 1.2",
                                comments: [
                                    {
                                        commentAuthorName: "Somebody 5",
                                        postContent: "Reply 1.2.1",
                                        comments: []
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        commentAuthorName: "Somebody 6",
                        postContent: "Reply 2",
                        comments: []
                    }
                ]
            },
            {
                commentAuthorName: "Somebody 7",
                postContent: "Comment 2",
                comments: []
            },
            {
                commentAuthorName: "Somebody 8",
                postContent: "Comment 3",
                comments: []
            }
        ]
    },
    {
        postAuthorName: "Someone 2",
        postContent: "Hi Cute",
        comments: [
            {
                commentAuthorName: "Somebody 9",
                postContent: "Comment 1",
                comments: []
            }
        ]
    },
    {
        postAuthorName: "Someone 3",
        postContent: "I Love You",
        comments: []
    }
]
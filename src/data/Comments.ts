interface Comment {
    postID: string,
    postAuthorName: string,
    postCaption: string,
    comments: Comment[]
}

const Comments: Comment[] = [
    {
        postID: "hajdhasdhiad",
        postAuthorName: "Hello Kitty",
        postCaption: "HEllo World",
        comments: [
            {
                postID: "hajdhafsfsdf",
                postAuthorName: "Any",
                postCaption: "Reply 1",
                comments: [
                    {
                        postID: "erewrfefd1",
                        postAuthorName: "fsdfsf",
                        postCaption: "Reply 1.1",
                        comments: [

                        ]
                    }
                ]
            },
            {
                postID: "trghrgfdgdg",
                postAuthorName: "sdfgrres",
                postCaption: "Reply 2",
                comments: [

                ]
            }
        ]
    },
    {

        postID: "tsasdsaas",
        postAuthorName: "Someone",
        postCaption: "Reply 3",
        comments: [

        ]

    }
]

export default Comments
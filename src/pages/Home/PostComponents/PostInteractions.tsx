import React, { useContext, useState } from 'react'
import IonIcon from '@reacticons/ionicons';
import { PostLikesProps, PostsDataProps } from '../../../types/PostTypes';
import { useDispatch, useSelector } from 'react-redux'
import { like, unlike } from '../../../redux/asynActions/postAsynActions';
import { AppDispatch } from '../../../redux/store';

interface CommentProps {
    post: PostsDataProps,
    comments: boolean,
    openComments: () => void;
}

interface NewLike {
    actionType: string,
    postID: string,
    parentType: string,
    userID: string
}

const PostInteractions: React.FC<CommentProps> = ({ post, comments, openComments }) => {
    const userID = useSelector((state: any) => state.posts.userData.userID)

    const dispatch = useDispatch<AppDispatch>();
    const [commentBox, setCommentBox] = useState(false)


    const [commentBody, setCommentBody] = useState("")



    const likeButton = () => {
        const likeData = {
            actionType: 'like',
            postID: post._id,
            parentType: post.type,
            userID: userID,
        };
        dispatch(like(likeData));
    };

    const unlikeButton = () => {
        const likeData = {
            actionType: 'unlike',
            likeID: post.likeID,
            parentType: post.type,
            userID: userID,
        };
        dispatch(unlike(likeData));
    };

    {/*const onComment = (event: any) => {

        const id: number = Math.ceil(Math.random() * 1000000000)
        const newComment: PostCommentsProps = {
            commentID: id,
            commentAuthorUserID: user.userID,
            avatarUrl: user.avatarUrl,
            commentAuthorFirstName: user.userFirstName,
            commentAuthorMiddleName: user.userMiddleName,
            commentAuthorLastName: user.userLastName,
            commentCaption: commentBody,
            commentImgUrls: [],
            commentDateAndTime: "April 25, 2023",
            commentLikes: [],
            commentReplies: []
        }
        dispatch(createComment({
            postID: post.postID,
            newComment: newComment
        }))
        event.preventDefault()
        setCommentBody("")
    }*/}

    return (
        <div className='w-full flex flex-col transition-all ease-in duration-1000 z-10 '
            onClick={(event: any) => event.stopPropagation()} >
            <div className='text-xl flex flex-row w-full py-1 border-y border-gray-300'>
                <div
                    onClick={post.liked ? unlikeButton : likeButton}
                    className={`post_interactions ${post.liked ? 'text-primary' : ''} hover:text-primary`}>
                    <IonIcon name={`${post.liked ? 'heart' : 'heart-outline'}`} ></IonIcon>
                    <h5 className="post_interactions_numbers">
                        {post.likesCount}
                    </h5>
                </div>
                <div
                    //onClick={() => setCommentBox(!commentBox)}
                    className="post_interactions hover:text-secondary1">
                    <IonIcon name="chatbox-outline" ></IonIcon>
                    <h5 className="post_interactions_numbers">
                        {post.repliesCount}
                    </h5>
                </div>
                <div className="post_interactions hover:text-secondary">
                    <IonIcon name="arrow-redo-outline" ></IonIcon>
                    <h5 className="post_interactions_numbers">
                        {post.repostsCount}
                    </h5>
                </div>

            </div>
        </div>

    )
}


export default PostInteractions
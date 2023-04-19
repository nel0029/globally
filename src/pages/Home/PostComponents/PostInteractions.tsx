import React from 'react'
import IonIcon from '@reacticons/ionicons';

export default function PostInteractions(props: any) {
    const {
        postLiked,
        postLikes,
        post,
        postReposts
    } = props


    console.log(post)
    return (
        <div className='w-full px-2'>
            <div className='text-xl flex flex-row w-full border-t-2 py-1'>
                <div className={`post_interactions ${postLiked ? "text-primary" : "text-black"} hover:text-primary`}>
                    <IonIcon name={`${postLiked ? "heart" : "heart-outline"}`} ></IonIcon>
                    <h5 className="post_interactions_numbers">
                        {postLikes.length}
                    </h5>
                </div>
                <div className="post_interactions hover:text-secondary1">
                    <IonIcon name="chatbox-outline" ></IonIcon>
                    <h5 className="post_interactions_numbers">
                        {post.postComments.length}
                    </h5>
                </div>
                <div className="post_interactions hover:text-secondary">
                    <IonIcon name="arrow-redo-outline" ></IonIcon>
                    <h5 className="post_interactions_numbers">
                        {/* {postReposts} */}
                    </h5>
                </div>
            </div>
        </div>

    )
}

import React from 'react'
import IonIcon from '@reacticons/ionicons'
import Comment from './Comment'
import { PostCommentsProps } from '../../../types/PostTypes'
import { useState, useContext } from 'react'
import { UserContext } from '../../../context/UserContext'
import { PostsContext } from '../../../context/PostsContext'
import { POSTACTIONS } from '../../../actions/POSTACTIONS'





const CommentReplies = (comment: PostCommentsProps) => {

    const user = useContext(UserContext)
    const { postState, dispatch } = useContext(PostsContext)

    return (
        <div className={`${comment.commentReplies.length > 0 ? 'track-line' : ''}`}>
            {comment.commentReplies.map((reply: PostCommentsProps, index: any) => (
                <Comment key={index} {...reply} />
            ))}
        </div>
    )
}


export default CommentReplies
import React, { useContext, useState } from 'react'
import IonIcon from '@reacticons/ionicons'
import { UserContext } from '../../../context/UserContext'
import { PostCommentsProps, PostLikesProps, PostsDataProps } from '../../../types/PostTypes'
import { PostsContext } from '../../../context/PostsContext'
import { POSTACTIONS } from '../../../actions/POSTACTIONS'
import CommentHeader from './CommentHeader'
import CommentContent from './CommentContent'
import CommentInteractions from './CommentInteractions'
import CommentsRepliesButton from './CommentsRepliesButton'
import CommentReplies from './CommentReplies'
import CommentAvatar from './CommentAvatar'
import RepliesContext from '../../../context/CommentsContext'
import CommentInput from './CommentInput'



const Comment = (comment: PostCommentsProps) => {

    const user = useContext(UserContext)
    const { postState, dispatch } = useContext(PostsContext)
    const [replyBox, setReplyBox] = useState(false)
    const [replies, setReplies] = useState(false)

    const openReplies = () => {
        setReplies(!replies)
    }

    const openReplyBox = () => {
        setReplyBox(!replyBox)
    }

    return (
        <div className='flex flex-col flex-1 my-1 rounded-lg
         transition-colors ease-linear duration-[5000]
        relative
        before:contents-[]
        before:absolute
        before:border-l-[3px]
        before:border-r-[0px]
        before:border-y-0
        before:mt-2
       before:border-solid
       before:border-light_gray
       before:left-[20px]
       before:w-[20px]
       before:h-[calc(100%)]
    '>
            <div className='flex flex-row gap-x-1'>
                < div className='flex z-10 flex-col pt-1 ' >
                    <CommentAvatar {...comment} />
                </div >

                <div className='flex flex-col flex-grow break-all'>
                    <div className='px-2 rounded-lg border bg-slate-100 py-2'>
                        <CommentHeader {...comment} />
                        <RepliesContext.Provider value={{ replies, setReplies, openReplies }}>
                            <CommentContent replyBox={replyBox} openReplyBox={openReplyBox} comment={comment} />
                        </RepliesContext.Provider>
                    </div>

                    <div className={`${replyBox ? 'w-full track-line' : 'w-full'}`}>
                        {replyBox ? (<CommentInput setReplies={setReplies} openReplyBox={openReplyBox} replyBox={replyBox} comment={comment} />) : null}
                    </div>

                    {comment.commentReplies.length > 0 ? (
                        <CommentsRepliesButton openReplies={openReplies} replies={replies} comment={comment} />
                    ) : (null)}
                </div>
            </div>


            <div className='pl-[30px] transition-all ease-in-out duration-1000'>
                {replies ? (<CommentReplies {...comment} />) : (<div />)}
            </div>


        </div >

    )
}

export default Comment
import { POSTACTIONS } from "../POSTACTIONS"

export const createPost = (data: any) => {
    return {
        type: POSTACTIONS.CREATEPOST,
        payload: data
    }
}

export const postLike = (data: any) => {
    return {
        type: POSTACTIONS.POSTLIKE,
        payload: data
    }
}

export const postComment = (data: any) => {
    return {
        type: POSTACTIONS.POSTCOMMENT,
        payload: data
    }
}
export const postRepost = () => {
    return {
        type: POSTACTIONS.POSTREPOST
    }
}

export const commentReply = (data: any) => {
    return {
        type: POSTACTIONS.COMMENTREPLY,
        payload: data
    }
}

export const commentLike = (data: any) => {
    return {
        type: POSTACTIONS.COMMENTLIKE,
        payload: data
    }
}


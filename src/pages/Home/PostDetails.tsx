import React from 'react'
import { useParams } from 'react-router-dom'

export default function PostDetails() {
    let { postid, userid } = useParams();
    return (
        <div>{userid} {postid}</div>
    )
}

import { useState, createContext } from "react"
import RepliesState from "../hooks/RepliesState"

export interface RepliesInterface {
    replies: boolean
    setReplies: (value: boolean) => void
    openReplies: () => void
}

interface RepliesProps {
    replies: boolean,
    setReplies: React.Dispatch<React.SetStateAction<boolean>>
}


const RepliesContext = createContext<RepliesInterface>({ replies: false, setReplies: () => { }, openReplies: () => { } })

export default RepliesContext
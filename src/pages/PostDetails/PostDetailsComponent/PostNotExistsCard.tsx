import React from 'react'

interface PostNotExistsCardProps {
    type: string
}

const PostNotExistsCard: React.FC<PostNotExistsCardProps> = ({ type }) => {
    return (
        <div className='w-full h-[200px] flex flex-col justify-center items-center rounded-lg border dark:border-Dark300'>
            <div >
                This {type} did not exists
            </div>
        </div>
    )
}

export default PostNotExistsCard
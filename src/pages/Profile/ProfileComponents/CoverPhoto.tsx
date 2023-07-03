import React from 'react'


interface CoverPhotoProps {
    coverPhotoURL?: string
}


const CoverPhoto: React.FC<CoverPhotoProps> = ({ coverPhotoURL }) => {
    return (
        <div className='w-full'>
            <div className='relative w-full aspect-3/1'>
                {coverPhotoURL ? (
                    <img
                        className='absolute object-cover w-full h-full'
                        src={coverPhotoURL} />
                ) : (
                    <div className='w-full h-full bg-secondary'></div>
                )}

            </div>
        </div>
    )
}

export default CoverPhoto
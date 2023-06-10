import React, { ReactNode } from 'react'

interface TitleTextProps {
    children: ReactNode
}

const TitleText: React.FC<TitleTextProps> = ({ children }) => {
    return (
        <div className='text-lg font-bold'>
            {children}
        </div>
    )
}

export default TitleText
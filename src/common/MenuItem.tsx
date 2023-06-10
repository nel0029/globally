import React, { ReactNode } from 'react'

interface MenuListProps {
    children: ReactNode
}

const MenuItem: React.FC<MenuListProps> = ({ children }) => {
    return (
        <div className='hover:bg-black hover:bg-opacity-10 dark:hover:bg-Dark400' >
            {children}
        </div>
    )
}


export default MenuItem
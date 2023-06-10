import React from 'react'

const NavItems = ({ children }: any) => {
    return (
        <div className='hover:bg-black hover:bg-opacity-10 rouned-full cursor-pointer flex flex-row items-center justify-center'>
            {children}
        </div>
    )
}

export default NavItems
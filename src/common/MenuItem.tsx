import React from 'react'

export default function MenuItem({ children }: any) {
    return (
        <div className='hover:bg-black hover:bg-opacity-10' >
            {children}
        </div>
    )
}

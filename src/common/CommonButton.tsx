import React, { ReactNode } from 'react'

interface CommonButtonProps {
    onClick: () => void,
    children: ReactNode,
    className?: string
}

const CommonButton: React.FC<CommonButtonProps> = ({ onClick, children, className }) => {
    return (
        <button
            onClick={onClick}
            className={`border rounded-full px-3 py-1 ${className}`}>
            {children}
        </button>
    )
}

export default CommonButton
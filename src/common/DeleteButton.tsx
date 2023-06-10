import React, { ReactNode } from 'react'

interface DeleteButtonProps {
    onClick: (() => void)[],
    children: ReactNode,
    className?: string
}

const DeleteButton: React.FC<DeleteButtonProps> = ({ onClick, children, className }) => {

    const handleOnClick = () => {
        onClick.forEach((func) => {
            if (typeof func === 'function') {
                func();
            }
        });
    };
    return (
        <button
            onClick={handleOnClick}
            className={`rounded-full border-2 border-primary bg-primary px-3 text-white py-1 ${className}`}>
            {children}
        </button>
    )
}

export default DeleteButton
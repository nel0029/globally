import React, { ReactNode } from 'react'

interface ConfirmButtonProps {
    onClick: (() => void)[],
    children: ReactNode,
    className?: string
}

const ConfirmButton: React.FC<ConfirmButtonProps> = ({ onClick, children, className }) => {

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
            className={`${className ? className : 'rounded-full  px-5 py-1'} border-2 border-secondary bg-secondary text-white`}>
            {children}
        </button>
    )
}

export default ConfirmButton
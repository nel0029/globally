import React, { ReactNode } from 'react'

interface ConfirmButtonProps {
    onClick: (() => void)[],
    children: ReactNode,
    className?: string
    disabled?: boolean
}

const ConfirmButton: React.FC<ConfirmButtonProps> = ({ onClick, children, className, disabled }) => {

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
            disabled={disabled}
            className={`${className ? className : 'rounded-full  px-5 py-1'} ${disabled ? 'bg-opacity-60 border-opacity-60 cursor-not-allowed' : 'bg-opacity-100'} border-2 border-secondary bg-secondary text-white`}>
            {children}
        </button>
    )
}

export default ConfirmButton
import React, { ReactNode } from 'react'

interface MenuButtonProps {
    children: ReactNode,
    onClick?: (() => void)[]
}

const MenuButton: React.FC<MenuButtonProps> = ({ children, onClick }) => {
    const handleClick = () => {
        if (onClick) {
            onClick.forEach((func) => {
                if (typeof func === 'function') {
                    func();
                }
            });
        }
    };

    return (
        <button
            onClick={handleClick}
            className='w-full px-2 py-1 flex flex-row items-center gap-x-2 text-base'>
            {children}
        </button>
    )
}

export default MenuButton
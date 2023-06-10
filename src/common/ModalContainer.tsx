import React, { useEffect, useRef } from 'react';

interface ModalContainerProps {
    children: React.ReactNode;
    setModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ModalContainer({ children, setModal }: ModalContainerProps) {
    const useOutsideDivAlerter = (menuRef: React.RefObject<HTMLDivElement>) => {
        useEffect(() => {
            const handleClickOutsideDiv = (event: MouseEvent) => {
                if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                    setModal(false);
                    console.log("Hello World!!");
                }
            };

            document.addEventListener("mousedown", handleClickOutsideDiv);

            return () => {
                document.removeEventListener("mousedown", handleClickOutsideDiv);
            };
        }, [menuRef, setModal]);
    };

    const menuRef = useRef<HTMLDivElement>(null);

    useOutsideDivAlerter(menuRef);

    return (
        <div
            onClick={(event: any) => event.stopPropagation()}
            ref={menuRef} className='z-[20] absolute max-w-full overflow-hidden w-[500px] flex flex-col justify-center items-center bg-white dark:bg-Dark200 p-2 rounded-lg'>
            {children}
        </div>
    );
}

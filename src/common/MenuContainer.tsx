import React, { useState, useRef, useEffect } from 'react'
import IonIcon from '@reacticons/ionicons'



const MenuContainer = ({ children, icon }: any) => {

    const [menu, setMenu] = useState(false)
    const openMenu = () => setMenu(!menu)

    const useOutsideDivAlerter = (menuRef: any) => {
        useEffect(() => {
            const handleClickOutsideDiv = (event: any) => {
                if (menuRef.current && !menuRef.current.contains(event.target)) {
                    setMenu(false);
                }
            };

            document.addEventListener("mousedown", handleClickOutsideDiv);

            return () => {
                document.removeEventListener("mousedown", handleClickOutsideDiv);
            };
        }, [menuRef]);
    }


    const menuRef = useRef<HTMLDivElement>(null)

    useOutsideDivAlerter(menuRef)


    return (

        <div ref={menuRef} className='relative flex justify-center items-center cursor-pointer rounded-full'
            onClick={(event: any) => event.stopPropagation()}>
            <div onClick={openMenu}
                className='flex justify-center items-center rounded-full text-lg p-0.5'>
                {icon ? icon : <IonIcon name="ellipsis-vertical"></IonIcon>}
            </div>
            <div
                onClick={openMenu}
                className='border bg-white z-10 absolute rounded-lg top-0 right-0 p-1'
                style={menu ? { display: 'inline-block' } : { display: 'none' }} >
                {children}
            </div>

        </div>
    )
}


export default MenuContainer
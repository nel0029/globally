import React, { useState, useRef, useEffect } from 'react'
import IonIcon from '@reacticons/ionicons'



const MenuContainer = ({ children }: any) => {

    const [menu, setMenu] = useState(false)
    const openMenu = () => setMenu(!menu)

    const useOutsideDivAlerter = (menuRef: any) => {
        useEffect(() => {
            const handleClickOutsideDiv = (event: any) => {
                if (menuRef.current && !menuRef.current.contains(event.target)) {
                    setMenu(false);
                    console.log("clicked");
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

        <div ref={menuRef} className='relative flex justify-center items-center cursor-pointer rounded-full'>
            <div onClick={openMenu}
                className='flex justify-center items-center rounded-full text-lg p-0.5'>
                <IonIcon name="ellipsis-vertical"></IonIcon>
            </div>
            <div
                onClick={openMenu}
                className=' bg-white z-10 absolute rounded-lg top-0 right-0 p-1 '
                style={menu ? { display: 'block' } : { display: 'none' }} >
                {children}
            </div>

        </div>
    )
}


export default MenuContainer
import React, { useState, useRef, useEffect } from 'react'
import { IonIcon } from '@ionic/react'
import { closeOutline, ellipsisHorizontal } from 'ionicons/icons'



const MenuContainer = ({ children }: any) => {

    const [menu, setMenu] = useState(false)
    const menuRef = useRef<HTMLDivElement>(null)

    const openMenu = (event: any) => {
        setMenu(!menu)
        event.stopPropagation()
    }


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

    useOutsideDivAlerter(menuRef)

    return (

        <div ref={menuRef} className='relative flex justify-center items-center cursor-pointer rounded-full  overflow-visible '
            onClick={openMenu}>

            <div className='flex justify-center items-center rounded-full text-lg p-2 hover:bg-slate-200 dark:hover:bg-Dark300'>
                <IonIcon name={menu ? closeOutline : ellipsisHorizontal} />
            </div>
            <div
                onClick={openMenu}
                className={`flex-col border dark:border-Dark300 z-10 absolute rounded-lg top-[100%] right-0 p-1 bg-white dark:bg-Dark300  ${menu ? 'flex' : 'hidden'}`} >
                {children}
            </div>

        </div>
    )
}


export default MenuContainer
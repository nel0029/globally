import { IonIcon } from '@ionic/react'
import React from 'react'

const BottomNavigation = () => {
    return (
        <div className='sticky top-0 w-full flex flex-row items-center justify-around py-2 bg-white'>
            <div>
                <IonIcon name='home-outline' />
            </div>
            <div>
                <IonIcon name='home-outline' />
            </div>
            <div>
                <IonIcon name='home-outline' />
            </div>
        </div>
    )
}

export default BottomNavigation
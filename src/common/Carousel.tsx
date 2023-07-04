import { IonIcon } from '@ionic/react'
import React, { useState, useReducer, useRef, TouchEventHandler } from 'react'
import { useNavigate, NavLink } from "react-router-dom"


const Carousel = ({ children: slides }: any,) => {

    const navigate = useNavigate()


    const [slide, setSlide] = useState(0);

    const [display, setDisplay] = useState('hidden ')

    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const handleMouseEnter = (event: any) => {

        setDisplay('flex ')
        event.stopPropagation()
    }

    const handleMouseLeave = (event: any) => {
        timeoutRef.current = setTimeout(() => {

            setDisplay('hidden ')
        }, 2500)


    }

    const prev = (event: any) => {
        if (slide === 0) {
            setSlide(0)
        } else {
            setSlide((prev: any) => prev - 1)
        }
        event.stopPropagation()

    }


    const next = (event: any) => {
        if (slide === slides.length - 1) {
            setSlide(slides.length - 1)
        } else {
            setSlide((prev: any) => prev + 1)
        }

        event.stopPropagation()

    }

    const [touchStartX, setTouchStartX] = useState<number | null>(null);

    const handleTouchStart: TouchEventHandler<HTMLDivElement> = (event) => {
        setTouchStartX(event.touches[0].clientX);


    };

    const handleTouchEnd: TouchEventHandler<HTMLDivElement> = (event) => {
        if (touchStartX === null) {
            return;
        }

        const touchEndX = event.changedTouches[0].clientX;
        const touchDiff = touchEndX - touchStartX;

        if (touchDiff > 0) {
            prev(event);
        } else if (touchDiff < 0) {
            next(event);
        }

        setTouchStartX(null);


    };
    return (
        <div className='w-full relative group transition ease-out duration-500 z-1'
            onMouseLeave={handleMouseLeave}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
        >
            <div className='w-full flex overflow-hidden gap-y-2'>
                <div
                    className='w-full flex transition-transform ease-out duration-500'
                    style={{ transform: `translateX(-${slide * 100}%)` }} >

                    {slides}

                </div>


                <div
                    className={`${display} group-hover:flex w-full h-full absolute z-1 items-center justify-between p-4 top-0`}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave} >
                    <button
                        onClick={prev}
                        disabled={slide === 0}
                        className={`${slide === 0 ? 'bg-opacity-0 text-transparent cursor-default' : 'bg-white bg-opacity-80 text-gray-800 cursor-pointer'} z-10 flex items-center justify-center text-lg p-1 rounded-full shadow `}>
                        <IonIcon name='chevron-back-outline'></IonIcon>
                    </button>
                    <button
                        onClick={next}
                        disabled={slide === slides?.length - 1}
                        className={`${slide + 1 === slides?.length ? 'bg-opacity-0 text-transparent cursor-default' : 'bg-white bg-opacity-80 text-gray-800 cursor-pointer'} z-10 flex items-center justify-center text-lg p-1 rounded-full shadow`}>
                        <IonIcon name='chevron-forward-outline'></IonIcon>
                    </button>
                </div>
                <div
                    className={`${display} group-hover:flex h-full w-full inset-0 absolute z-1 justify-end items-start`}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave} >
                    <div className='flex items-center pt-5 pr-5'>
                        <h3 className='px-2 py-1 rounded-full bg-black/75 text-white'>{slide + 1}/{slides?.length}</h3>
                    </div>
                </div>
            </div>

            <div className='flex py-1 bottom-4  items-center justify-center w-full overflow-hidden '>
                <div
                    className=' flex justify-start items-center gap-1 transition-transform ease-out duration-500'

                >
                    {slides?.map((_: any, index: any) => {
                        return (
                            <div
                                key={index}
                                className={`w-2 h-2 bg-secondary rounded-full ${slide == index ? ' bg-opacity-100' : '  bg-opacity-20'}`} />
                        )
                    })}
                </div>
            </div>
        </div>
    )
}


export default Carousel;
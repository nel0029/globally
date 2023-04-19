import IonIcon from '@reacticons/ionicons'
import React, { useState, useReducer, useRef } from 'react'
import { useSwiper } from 'swiper/react';
import Swipeable from 'react-swipeable';


const ACTIONS = {
    NEXT: 'next',
    PREV: 'prev',
}

const dotStateDetails: any = {
    slide: 0,
    dotsArrayList: [0, 1, 2, 3, 4, 5],
    activeDotIndex: 0,
    itemIndex: 0,
    dotIndex: 0
}
const dotState = (state: any, action: any) => {
    switch (action.type) {
        case ACTIONS.NEXT:
            return {
                ...state,
                slide: state.slide === action.payload.slidesLength - 1 ? 0 : state.slide + 1
            }
        case ACTIONS.PREV:
            return {
                ...state,
                slide: state.slide === 0 ? action.payload.slidesLength - 1 : state.slide - 1
            }
        default: state
    }
}
const Carousel = ({ children: slides }: any) => {


    const [state, dispatch] = useReducer(dotState, dotStateDetails);



    const prev = () => {
        dispatch({ type: ACTIONS.PREV, payload: { slidesLength: slides.length } })
    }


    const next = () => {
        dispatch({ type: ACTIONS.NEXT, payload: { slidesLength: slides.length } })
    }
    console.log(state)
    return (
        <div className='overflow-hidden relative group'>
            <div
                className='flex transition-transform ease-out duration-500'
                style={{ transform: `translateX(-${state.slide * 100}%)` }}
            >
                {slides}
            </div>
            <div className='hidden absolute z-1 inset-0 group-hover:flex items-center justify-between p-4'>
                <button
                    onClick={prev}
                    disabled={state.slide === 0}
                    className={`${state.slide === 0 ? 'bg-white bg-opacity-0 cursor-auto' : 'bg-white bg-opacity-80'} flex items-center justify-center text-lg p-1 rounded-full shadow text-gray-800 cursor-pointer`}>
                    <IonIcon name='chevron-back-outline'></IonIcon>
                </button>
                <button
                    onClick={next}
                    disabled={state.slide === slides.length - 1}
                    className={`${state.slide + 1 === slides.length ? 'bg-white bg-opacity-0 cursor-auto' : 'bg-white bg-opacity-50'} flex items-center justify-center text-lg p-1 rounded-full shadow text-gray-800 cursor-pointer`}>
                    <IonIcon name='chevron-forward-outline'></IonIcon>
                </button>
            </div>
            <div className='hidden group-hover:block absolute top-4 left-0 right-0'>
                <div className='flex items-center justify-end pr-4 '>
                    <h3 className='px-2 py-1 rounded-full bg-black/75 text-white'>{state.slide + 1}/{slides.length}</h3>
                </div>
            </div>
            <div className='absolute bottom-4 flex items-center justify-center w-full overflow-hidden '>
                <div
                    className=' flex justify-start items-center gap-1 transition-transform ease-out duration-500'

                >
                    {slides.map((_: any, index: any) => {
                        return (
                            <div
                                key={index}
                                className={`p-1 rounded-full ${state.slide == index ? ' bg-blue-700 bg-opacity-100' : 'bg-white  bg-opacity-50'}`} />
                        )
                    })}
                </div>
            </div>
        </div>
    )
}


export default Carousel;
import React, { ReactNode } from 'react'
import { useNavigate } from 'react-router'
import { NavLink } from 'react-router-dom'

interface CardDetailsHeaderProps {
    userName: string
    firstName: string
    middleName: string
    lastName: string
}


const CardDetailsHeader: React.FC<CardDetailsHeaderProps> = ({ userName, firstName, middleName, lastName }) => {
    const navigate = useNavigate()

    const userProfile = () => {
        navigate(`/${userName}`)
    }
    return (
        <div className='flex flex-col justify-center gap-x-2 leading-none flex-1 flex-shrink overflow-x-hidden'>
            <div className='flex flex-col justify-center-center gap-x-2 text-[1rem] leading-[1.25rem] max-w-full flex-shrink'>
                <NavLink
                    className='flex-shrink hover:underline hover:text-secondary font-bold overflow-hidden text-ellipsis whitespace-nowrap cursor-pointer'
                    to={`/${userName}`}>
                    {firstName} {middleName} {lastName}
                </NavLink>
                <div className='flex-shrink font-light overflow-hidden text-ellipsis whitespace-nowrap'>
                    @{userName}
                </div>
            </div>
        </div>
    )
}

export default CardDetailsHeader
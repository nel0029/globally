import React from 'react'

interface UserProps {
    _id: string,
    avatarURL: string,
    firstName: string,
    middleName: string,
    lastName: string,
    userName: string,

}

const UserMessageCard: React.FC<UserProps> = ({ _id, avatarURL, firstName, middleName, lastName, userName }) => {
    return (
        <div
            className='w-full flex flex-row justify-between items-center cursor-pointer p-2'>
            <div className='px-2 '>
                <div className='w-[30px] h-[30px] rounded-[50%]'>
                    <img
                        className='w-full h-full object-cover aspect-square rounded-[50%]'
                        src={avatarURL} />
                </div>
            </div>
            <div className='flex flex-grow flex-col justify-start items-start flex-shrink overflow-x-hidden leading-none gap-y-1'>
                <div
                    className='flex flex-row flex-shrink hover:underline hover:text-secondary font-bold overflow-hidden text-ellipsis whitespace-nowrap cursor-pointer gap-x-1' >
                    <span>
                        {firstName}
                    </span>
                    <span>
                        {middleName}
                    </span>
                    <span>
                        {lastName}
                    </span>
                </div>
                <div
                    className='flex-shrink text-gray-400 font-light overflow-hidden text-ellipsis whitespace-nowrap '>
                    @{userName}
                </div>

            </div>


        </div>
    )
}

export default UserMessageCard
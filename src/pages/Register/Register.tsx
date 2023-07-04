import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { verifyUserName, registerUser } from '../../redux/asynActions/userAsyncActions';
import { AppDispatch } from '../../redux/store';
import { useNavigate } from 'react-router-dom';
import useDebounce from './Hooks/useDebounce';

function Register() {
    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate()
    const message = useSelector((state: any) => state.user.authMessage)
    const valid = useSelector((state: any) => state.user.valid)
    const registerMessage = useSelector((state: any) => state.user.registerMessage)

    const [formData, setFormData] = useState({
        email: '',
        userName: '',
        password: '',
        userFirstName: '',
        userMiddleName: '',
        userLastName: ''
    })


    const userName = useDebounce(formData.userName, 1000)

    let typingTimeout: number | null = null;

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    useEffect(() => {
        if (userName.length > 6) {
            dispatch(verifyUserName(userName));
        }
    }, [userName, dispatch]);


    const goToLogIn = () => {
        navigate('/login')
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        dispatch(registerUser(formData))
            .then(() => {
                // Redirect to login page
                if (localStorage.getItem("token")) {
                    goToLogIn()
                }
            })

    };



    return (
        <div className='w-full h-screen flex justify-center items-center '>
            <div className='w-full max-w-[500px] flex flex-col items-center justify-center border rounded-lg'>
                <div className='text-lg font-bold text-secondary py-3'>
                    Create an account
                </div>
                <div className='flex w-full'>
                    <form
                        className='flex flex-col flex-1 p-2 gap-y-2'
                        onSubmit={handleSubmit}>
                        {registerMessage && (
                            <div>
                                {registerMessage}
                            </div>
                        )}
                        <div className='flex flex-col rounded-lg border py-1 px-2 gap-y-0.5'>

                            <div className='text-gray-400 text-sm'>
                                First Name
                            </div>
                            <input
                                className='bg-transparent text-base outline-none'
                                type="text"
                                required
                                name="userFirstName"
                                value={formData.userFirstName}
                                onChange={onChange} />
                        </div>
                        <div className='flex flex-col rounded-lg border py-1 px-2 gap-y-0.5'>
                            <div className='text-gray-400 text-sm'>
                                Middle Name
                            </div>
                            <input
                                className='bg-transparent text-base outline-none'
                                type="text"
                                name="userMiddleName"
                                value={formData.userMiddleName}
                                onChange={onChange} />
                        </div>
                        <div className='flex flex-col rounded-lg border py-1 px-2 gap-y-0.5'>
                            <div className='text-gray-400 text-sm'>
                                Last Name
                            </div>
                            <input
                                className='bg-transparent text-base outline-none'
                                type="text"
                                name="userLastName"
                                value={formData.userLastName}
                                onChange={onChange} />
                        </div>
                        <div className='flex flex-col rounded-lg border py-1 px-2 gap-y-0.5'>
                            <div className='text-gray-400 text-sm'>
                                Email
                            </div>
                            <input
                                className='bg-transparent text-base outline-none'
                                type="text"
                                name="email"
                                value={formData.email}
                                onChange={onChange} />
                        </div>
                        <div
                            className={`flex flex-col rounded-lg py-1 px-2 gap-y-0.5 border`}>


                            <div className='text-gray-400 text-sm flex flex-row items-center gap-x-2'>
                                <div>
                                    Username
                                </div>
                                <div>
                                    {userName ? (
                                        <div className={`text-sm ${!valid ? 'text-primary' : 'text-secondary1'}`}>
                                            {message ? message : null}
                                        </div>) : (null)}
                                </div>
                            </div>
                            <input
                                className='bg-transparent text-base outline-none'
                                type="text"
                                name="userName"
                                value={formData.userName}
                                onChange={onChange} />

                        </div>

                        <div className='flex flex-col rounded-lg border py-1 px-2 gap-y-0.5'>
                            <div className='text-gray-400 text-sm'>
                                Password
                            </div>
                            <input
                                className='bg-transparent text-base outline-none'
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={onChange} />
                        </div>

                        <button
                            className='basis-0 py-1 px-2 rounded-full outline-none bg-secondary cursor-pointer hover:bg-opacity-75 text-base font-bold text-white'
                            type="submit" >
                            Register
                        </button>

                    </form>
                </div>
                <div className='flex flex-row items-center gap-x-2 py-3'>
                    <div>
                        Already have an account?
                    </div>
                    <div
                        onClick={goToLogIn}
                        className='text-secondary hover:underline cursor-pointer'>
                        Log In
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register
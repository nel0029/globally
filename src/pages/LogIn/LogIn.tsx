import React, { useState } from 'react'
import { logIn } from '../../redux/asynActions/userAsyncActions'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../redux/store'
import { useNavigate } from 'react-router'


function LogIn() {
    const [logInID, setLogInID] = useState("")
    const [password, setPassword] = useState("")
    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate()

    const handleSubmit = (e: any) => {
        const userData: LogInUserData = {
            logInID: logInID,
            password: password
        }
        dispatch(logIn(userData))
            .then(() => {
                // Redirect to login page
                navigate('/');
            })
            .catch((error) => {
                // Handle error
                console.log(error);
            });
        e.preventDefault()
    }
    return (
        <div className='w-full border flex justify-center items-center'>
            <form className='w-[500px] flex flex-col justify-center items-center' onSubmit={handleSubmit}>
                <input placeholder='Type your username here' type="text" value={logInID} onChange={(e: any) => setLogInID(e.target.value)} />
                <input placeholder='Type your password here' type="password" value={password} onChange={(e: any) => setPassword(e.target.value)} />
                <input onClick={handleSubmit} type="submit" />
            </form>
        </div>
    )
}

export default LogIn
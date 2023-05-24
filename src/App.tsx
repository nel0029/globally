import reactLogo from './assets/react.svg'
import RoutesPage from './routes/RoutesPage'
import viteLogo from '/vite.svg'
import 'react-any-slider-dots/dist/dots.css'
import { UserContext } from './context/UserContext'
import { userData } from './data/UserData'
import React from 'react'
import axios from 'axios'

const App = () => {
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NjA4MmM4MjJlNWVjMWVkZWMwZjBhZCIsImlhdCI6MTY4NDExMzAyMSwiZXhwIjoxNjg2NzA1MDIxfQ.JD4QyP14v82KfnlT2IQQemsqJLGFusQV6rSA0acJiRk"
  localStorage.setItem('token', token)
  axios.defaults.baseURL = 'http://127.0.0.1:5000';
  axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
  axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
  return (
    <div className=" min-h-screen">
      <UserContext.Provider value={userData}>
        <RoutesPage />
      </UserContext.Provider>
    </div >


  )
}

export default App

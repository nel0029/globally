import reactLogo from './assets/react.svg'
import RoutesPage from './routes/RoutesPage'
import viteLogo from '/vite.svg'
import 'react-any-slider-dots/dist/dots.css'
import { UserContext } from './context/UserContext'
import { userData } from './data/UserData'
import React from 'react'

const App = () => {

  return (
    <div className=" min-h-screen">
      <UserContext.Provider value={userData}>
        <RoutesPage />
      </UserContext.Provider>
    </div >


  )
}

export default App

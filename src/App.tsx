import { useState } from 'react'
import reactLogo from './assets/react.svg'
import RoutesPage from './routes/RoutesPage'
import viteLogo from '/vite.svg'
import 'react-any-slider-dots/dist/dots.css'
import { UserContext } from './Context/UserContext'
import { userData } from './data/UserData'

function App() {

  return (
    <UserContext.Provider value={userData}>
      <div className="">
        <RoutesPage />
      </div>
    </UserContext.Provider>

  )
}

export default App

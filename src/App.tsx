import RoutesPage from './routes/RoutesPage'
import 'react-any-slider-dots/dist/dots.css'
import axios from 'axios'
import NavBar from './layout/NavBar'
import RightSideBar from './layout/RightSideBar'
import { useSelector } from 'react-redux'


const App = () => {

  axios.defaults.baseURL = 'http://127.0.0.1:5000';
  axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
  axios.defaults.headers.post['Content-Type'] = 'application/json';
  const mode = useSelector((state: any) => state.theme.darkMode)
  const body = document.getElementById("body")
  if (mode === true) {
    body?.classList.add("dark")
  } else {
    body?.classList.remove("dark")
  }

  return (
    <div className={`w-full h-full`}>
      <div className="w-full h-full flex flex-row justify-center items-start dark:text-white dark:text-opacity-[87%] transition-colors ease-in-out duration-300">
        <NavBar />
        <div className='w-full max-w-[700px]'>
          <RoutesPage />
        </div>
        <RightSideBar />
      </div >
    </div>
  )
}

export default App

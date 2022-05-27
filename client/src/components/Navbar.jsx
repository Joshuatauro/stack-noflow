import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import md5 from 'md5'
import { ChevronDownIcon } from '@heroicons/react/outline'
const Navbar = () => {

  const { isLoggedIn, checkIfUserLoggedIn, username, url } = useContext(AuthContext)

  useEffect(() => {
    checkIfUserLoggedIn()
    if (localStorage.isDark === 'yes') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')

    }
  }, [])

  const toggleTheme = () => {
    if(localStorage.isDark === 'yes') {
      document.documentElement.classList.remove('dark')
      localStorage.isDark = 'no' 
    } else {
      document.documentElement.classList.add('dark')
      localStorage.isDark = 'yes'
    }
  }

  return (
    <nav className="w-full border-b bg-white dark:bg-dark sticky  z-50 top-0 border-cta border-b-gray-500 ">
      <div className=" px-6  h-16 flex items-center  m-auto">
        <div className="flex items-center w-full mr-2 ">
          <div className="flex items-center flex-1">
            <Link to="/" className="text-xl font-black text-gray-800 dark:text-white mr-2">stack<span className="text-cta">noflow</span></Link>
            <input type="text" placeholder="Search anything here....." className="w-10/12 h-11 px-4 focus:outline-gray-800 outline outline-1 outline-gray-400 rounded-md text-sm font-normal placeholder:text-gray-600 dark:bg-dark" />
          </div>
        </div>
        {
          isLoggedIn ? (
            <>
              <button onClick={toggleTheme}  className="flex items-center">
                <h1 className="text-sm font-medium text-gray-600 ml-1.5 mr-1 ">{username}</h1>
                <img className=" object-contain h-8" src={url} alt="" />
              </button>
            </>

          ) : (
          <div className="flex flex-1 justify-end items-center min-w-max ">
            <Link to="/signup" className="text-sm font-medium flex items-center outline outline-1 text-cta bg-cta bg-opacity-10 rounded-md h-12 px-5 mr-2">Sign Up</Link>
            <Link to="/login" className="text-sm flex items-center font-medium outline bg-cta outline-2 text-white rounded-md h-12 px-5 ">Log In</Link>
          </div>
          )
        }
        
      </div>
    </nav>
  )
}

export default Navbar
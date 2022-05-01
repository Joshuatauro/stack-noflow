import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
 
const Navbar = () => {

  const { isLoggedIn } = useContext(AuthContext)

  return (
    <nav className="w-full border-b bg-white sticky  top-0 border-cta border-b-gray-500 ">
      <div className=" px-6  h-16 flex items-center  m-auto">
        <div className="flex items-center w-full mr-2 ">
          <div className="flex items-center flex-1">
            <Link to="/" className="text-xl font-black font-inter text-gray-800 mr-2">stack<span className="text-cta">noflow</span></Link>
            <input type="text" placeholder="Search anything here....." className="w-full h-11 px-4 focus:outline-gray-800 outline outline-1 outline-gray-400 rounded-md font-inter text-sm font-normal placeholder:text-gray-600" />
          </div>
        </div>
        {
          isLoggedIn ? (
            ""
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
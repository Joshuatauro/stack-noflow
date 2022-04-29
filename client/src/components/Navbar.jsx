import React from 'react'

const Navbar = () => {
  return (
    <nav className="w-full border-b bg-white sticky  top-0 border-cta font-dongle border-b-gray-500 ">
      <div className=" px-6  h-16 flex items-center  m-auto">
        <div className="flex items-center w-full mr-2 ">
          <div className="flex items-center flex-1">
            <h1 className="text-xl font-black font-inter text-gray-800 mr-2">stack<span className="text-cta">overflow</span></h1>
            <input type="text" placeholder="Search anything here....." className="w-full h-11 px-4 focus:outline-gray-800 outline outline-1 outline-gray-400 rounded-md font-inter text-sm font-normal placeholder:text-gray-600" />
          </div>
        </div>
        <div className="flex flex-1 justify-end items-center min-w-max ">
          <button className="text-2xl outline outline-1 text-cta rounded-md h-12 px-5 mr-2">Sign Up</button>
          <button className="text-2xl outline bg-cta outline-2 text-white rounded-md h-12 px-5 ">Log In</button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
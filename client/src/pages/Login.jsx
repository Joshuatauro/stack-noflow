import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import toast, {Toaster} from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/outline'
const Login = () => {
  const navigate = useNavigate()
  const { login } = useContext(AuthContext)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async(e) => {
    e.preventDefault()
    const response = await login(email, password)
    if(response.data.status === "Success") {
      toast(response.data.message, {
        icon: <CheckCircleIcon className='h-6' />,
        style: {
          backgroundColor: "#22C55E",
          color: "#fff"
        },
        duration: 2500
      })
      setTimeout(() => {
        return navigate("/feed")
      }, "3000")
    } else {
      toast.error(response.data.message, {
        icon: <XCircleIcon className='h-6' />,
        style: {
          backgroundColor: "#EF4444",
          color: "#fff"
        }
      })
    }
  }

  const handleGuestLogin = async(e) => {
    e.preventDefault()   
    setEmail("guestuser@gmail.com")
    setPassword("password123") 
    const response = await login("guestuser@gmail.com", "password123")
    if(response.data.status === "Success") {
      toast.success(response.data.message, {
        icon: <CheckCircleIcon className='h-6' />,
        style: {
          backgroundColor: "#22C55E",
          color: "#fff"
        }
      })
      setTimeout(() => {
        return navigate("/feed")
      }, "2500")
    } else {
      toast.error(response.data.message, {
        icon: <XCircleIcon className='h-6' />,
        style: {
          backgroundColor: "#EF4444",
          color: "#fff"
        },
        
      })
    }
  }

  return (
    <div className="w-full h-screen dark:text-white dark:bg-dark">
      <Link to="/feed" className="w-full py-5 border-b-2 dark:border-dark-fade flex items-center justify-center text-3xl font-bold">Stack<span className="text-cta">noflow</span></Link>
      <div className=" flex flex-col w-1/3 m-auto mt-5">
        <form action="" className="">
          <h1 className="text-2xl font-bold">Log in</h1>
          <p className="text-xs text-gray-500 font-medium mb-5 dark:text-dark-text">We are pleased to have you back!</p>
          <div className="flex flex-col mb-3">
            <label htmlFor="" className="text-sm font-medium text-gray-600 mb-1 dark:text-dark-text">Email address</label>
            <input value={email} onChange={e => setEmail(e.target.value)} type="text" className="w-full py-1.5 px-2 outline  outline-1 rounded-default dark:bg-transparent dark:outline-gray-500" />
          </div>
          <div className="flex flex-col">
            <label htmlFor="" className="text-sm font-medium text-gray-600 mb-1 dark:text-dark-text">Password</label>
            <input value={password} onChange={e => setPassword(e.target.value)} type="password" className="w-full py-1.5 px-2 outline outline-1 rounded-default dark:bg-transparent dark:outline-gray-500" />
          </div>
          <button onClick={handleLogin} className="w-full rounded-default bg-cta text-white font-medium py-2 mt-4">Login</button>
        </form>
        <div className="relative my-4">
          <div className="outline outline-1 outline-gray-500 rounded-full dark:outline-dark-fade w-full"></div>
          <p className="absolute left-1/2 dark:bg-dark dark:text-dark-text text-gray-500 top-1/2 -translate-y-2/4 -translate-x-2/4 px-1 bg-white text-xs ">OR</p>
        </div>
        <button onClick={handleGuestLogin} className="w-full outline outline-1 outline-cta bg-cta bg-opacity-10 rounded-default py-1.5 flex justify-center my-0.5 text-cta font-medium">Login as Guest</button>
        <div className="relative my-4">
          <div className="outline outline-1 outline-gray-500 rounded-full dark:outline-dark-fade w-full"></div>
          <p className="absolute left-1/2 dark:bg-dark dark:text-dark-text text-gray-500 top-1/2 -translate-y-2/4 -translate-x-2/4 px-1 bg-white text-xs ">OR</p>
        </div>
        <h1 className="text-2xl font-bold ">Sign up</h1>
        <p className="text-xs text-gray-500 font-medium dark:text-dark-text">Dont have an account? We got you covered  </p>
        <Link to="/signup" className='w-full outline outline-1 outline-cta bg-cta bg-opacity-10 rounded-default py-1.5 flex justify-center mt-5 text-cta font-medium'>Signup</Link>
      </div>
      <Toaster position="bottom-right"/>
    </div>
  )
}

export default Login
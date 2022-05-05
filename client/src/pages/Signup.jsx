import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import toast, {Toaster} from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/outline'

const Signup = () => {
  const navigate = useNavigate()
  const { signup } = useContext(AuthContext)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')

  const handleSignup = async(e) => {
    e.preventDefault()
    const response = await signup(email, username, password)
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

  return (
    <div className="w-full h-screen">
      <Link to='/feed' className="w-full py-5 border-b-2 flex items-center justify-center text-3xl font-bold">Stack<span className="text-cta">noflow</span></Link>
      <div className=" flex flex-col w-1/3 m-auto mt-5">
        <form action="" className="">
          <h1 className="text-2xl font-bold">Sign up</h1>
          <p className="text-xs text-gray-500 font-medium mb-5">Ever get stuck on a question for hours? Never again, one post is all it takes</p>
          <div className="flex flex-col mb-3">
            <label htmlFor="" className="text-sm font-medium text-gray-600 mb-1">Username</label>
            <input value={username} onChange={e => setUsername(e.target.value)} type="text" className="w-full py-1.5 px-2 outline  outline-1 rounded-default" />
          </div>
          <div className="flex flex-col mb-3">
            <label htmlFor="" className="text-sm font-medium text-gray-600 mb-1">Email address</label>
            <input value={email} onChange={e => setEmail(e.target.value)} type="text" className="w-full py-1.5 px-2 outline  outline-1 rounded-default" />
          </div>
          <div className="flex flex-col">
            <label htmlFor="" className="text-sm font-medium text-gray-600 mb-1">Password</label>
            <input value={password} onChange={e => setPassword(e.target.value)} type="password" className="w-full py-1.5 px-2 outline outline-1 rounded-default" />
          </div>
          <button onClick={handleSignup} className="w-full rounded-default bg-cta text-white font-medium py-2 mt-4">Sign up</button>
        </form>
        
        <div className="relative my-4">
          <div className="outline outline-1 outline-gray-500 rounded-full  w-full"></div>
          <p className="absolute left-1/2 text-gray-500 top-1/2 -translate-y-2/4 -translate-x-2/4 px-1 bg-white text-xs ">OR</p>
        </div>
        <h1 className="text-2xl font-bold ">Log in</h1>
        <p className="text-xs text-gray-500 font-medium">Already have an account? Log in here</p>
        <Link to="/signup" className='w-full outline outline-1 outline-cta bg-cta bg-opacity-10 rounded-default py-1.5 flex justify-center mt-5 text-cta font-medium'>Log in</Link>
      </div>
      <Toaster position="bottom-right"/>
    </div>
  )
}

export default Signup
import React, { useEffect, useState } from 'react'
import Moment from 'react-moment'
import { Link } from 'react-router-dom'
import axios from '../axios'
const Users = () => {
  const [users, setUsers] = useState([])

  useEffect(() => {

    const getUsers = async() => {
      const { data } = await axios.get('/api/users')
      setUsers(data.users)
    }
    getUsers()
  }, [])


  return (
    <div className="border-x-2  min-h-custom">
      <div className="px-4 m-auto py-5">
        <div className="grid grid-cols-4 gap-3 ">
        {users?.map(({url, username, joined_at}) => <UserPreviewComponent url={url} username={username} joinedAt={joined_at} />)}
        </div>
      </div>
    </div>
  )
}

const UserPreviewComponent = ({url, username, joinedAt}) => {
  return (
    <Link to={`/user/${username}`} className="py-2 px-2 rounded-default outline outline-1 outline-cta hover:bg-cta-fade">
      <div className="flex">
        <img src={url} alt="" className="h-10" />
        <div className="ml-2">
          <h1 className="text-sm text-gray-700 font-medium">{username}</h1>
          <div className="flex items-center">
            <p className="text-xs font-gray-600 whitespace-pre-wrap">joined </p>
            
            <Moment  fromNow className='text-xs font-gray-600'>{joinedAt}</Moment>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default Users
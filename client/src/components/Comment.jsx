import React from 'react'
import Moment from 'react-moment'
import { Link } from 'react-router-dom'

const Comment = ({commentBody, username, createdAt}) => {

  return (
    <div className='w-full border-t-[1px] border-b-[1px]'>
      <p className='text-[13px] py-2.5 items-center'>{commentBody} ~ <Link to={`/user/${username}`} className='text-cta text-xs'>{username}</Link>  <Moment format='[on] MMM d, YYYY  [at] hh:mma' className='text-gray-500 text-xs' >{createdAt}</Moment></p>
    </div>
  )
}

export default Comment
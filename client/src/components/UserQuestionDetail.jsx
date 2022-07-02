import React from 'react'
import Moment from 'react-moment'
import { Link } from 'react-router-dom'

const UserQuestionDetail = ({url, username, background, createdAt, updatedAt, asked}) => {
  return (
    <div className={`transition w-fit duration-300 ${background ? "bg-cta bg-opacity-10 py-2 outline outline-1 outline-cta" : ""}`}>
      <div className="px-2">
        <div className="flex">
          <img className={`object-contain ${background ? 'h-[25px] md:h-[40px]' : "h-[20px] md:h-[35px]"}`} src={url} alt="" />
          <div className=" text-[11px] md:text-xs ml-2">
            <p className="text-gray-600 flex-nowrap dark:text-gray-400">{asked ? 'asked' : 'answered'} <Moment format='[on] MMM DD,YYYY [at] h:mma' className='flex-nowrap'>{createdAt}</Moment></p>
            {
              updatedAt && <p className="text-gray-600 dark:text-gray-400">updated <Moment format='[on] MMM DD, YYYY [at] h:mma '>{updatedAt}</Moment></p>
              
            }
            <Link to={`/user/${username}`} className="text-cta">{username}</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserQuestionDetail
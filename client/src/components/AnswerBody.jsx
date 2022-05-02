import { ArrowCircleDownIcon, ArrowCircleUpIcon, ChevronDoubleDownIcon, ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/outline'
import React, { useContext, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import Tag from './Tag'
import UserQuestionDetail from './UserQuestionDetail'

const AnswerBody = ({url, upvotedBy, downvotedBy, children, body, username, ownerID}) => {
  const { userID } = useContext(AuthContext)
  
  const [upvoted, setUpvoted] = useState(upvotedBy ? upvotedBy : [])
  const [downvoted, setDownvoted] = useState(downvotedBy ? downvotedBy : [])

  

  return (
    <div className="grid grid-cols-[0.1fr_0.9fr] py-4 border-b-2">
      <div className='flex flex-col h-fit items-center '>
        <button className="outline-none" >
          <ChevronUpIcon className={`w-10  ${upvoted.includes(userID) ? "text-orange-500" : "text-gray-700"}`} />
        </button>
        <h1 className='my-1 font-medium text-[17px]'>{upvoted.length - downvoted?.length}</h1>
        <button className="">
          <ChevronDownIcon className={`w-10  ${downvoted?.includes(userID) ? "text-orange-500" : "text-gray-700"}`}/>
        </button>
      </div>
      <div className="">  
        <h1 className='text-gray-800 pr-4 whitespace-pre-line'>{body}</h1>
        <div className="flex justify-between mt-1.5 pr-4">
          {
            userID === ownerID ? (
            <div className="flex place-items-start">
              <button className='text-[13px] font-medium text-gray-700 mr-2'>Edit</button>
              <button className='text-[13px] font-medium text-gray-700'>Delete</button>
            </div>
            ) : (
              <div className=""></div>
            )
          }
          <div className="mt-2">
            <UserQuestionDetail url={url} username={username} background={true}/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AnswerBody
import { ArrowCircleDownIcon, ArrowCircleUpIcon } from '@heroicons/react/outline'
import React, { useState } from 'react'
import Tag from './Tag'
import UserQuestionDetail from './UserQuestionDetail'

const AnswerBody = ({url, upvotedBy, downvotedBy, children, body}) => {
  
  const [count, setCount] = useState(5)
  const [lastAction, setLastAction] = useState('up')


  const handleUpvote = () => {
    console.log('clicked')
    setCount(count+1)
    setLastAction('up')
  }

  const handleDownvote = () => {
    setCount(count-1)
    setLastAction('down')

  }
  return (
    <div className="grid grid-cols-[0.1fr_0.9fr] py-4 border-b-2">
      <div className='flex flex-col mt-5 h-fit items-center '>
        <button className="outline-none" onClick={handleUpvote}>
          <ArrowCircleUpIcon className={`w-10  ${lastAction === 'up' ? "text-orange-500" : "text-gray-700"}`} />
        </button>
        <h1 className='my-1 font-medium text-[17px]'>{count}</h1>
        <button className="" onClick={handleDownvote}>
          <ArrowCircleDownIcon className={`w-10  ${lastAction === 'down' ? "text-orange-500" : "text-gray-700"}`}/>
        </button>
      </div>
      <div className="">  
        <h1 className='text-gray-800 pr-4'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo vero eveniet nesciunt illum ut totam, distinctio iure rerum, mollitia assumenda aspernatur!untur consecte </h1>
        <div className="flex justify-between mt-1.5 pr-4">
          <div className="flex place-items-start">
            <button className='text-[13px] font-medium text-gray-700 mr-2'>Edit</button>
            <button className='text-[13px] font-medium text-gray-700'>Delete</button>
          </div>
          <div className="mt-2">
            <UserQuestionDetail url={url} username={"joshuatauro45"} background={true}/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AnswerBody
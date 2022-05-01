import { ArrowCircleDownIcon, ArrowCircleUpIcon } from '@heroicons/react/outline'
import axios from '../axios'
import React, { useEffect, useState, useContext } from 'react'
import { useParams } from 'react-router-dom'
import AnswerBody from '../components/AnswerBody'
import Tag from '../components/Tag'
import TagsBar from '../components/TagsBar'
import UserQuestionDetail from '../components/UserQuestionDetail'
import { AuthContext } from '../context/AuthContext'

const SinglePost = () => {
  const { userID } = useContext(AuthContext)

  const { id } = useParams()

  const [count, setCount] = useState(5)
  const [lastAction, setLastAction] = useState('up')

  const [body, setBody] = useState('')
  const [title, setTitle] = useState('')
  const [views, setViews] = useState('')
  const [upvotedBy, setUpvotedBy] = useState([1,2,3])
  const [downvotedBy, setDownvotedBy] = useState([1])
  const [username, setUsername] = useState('')
  const [url, setUrl] = useState('')
  

  useEffect(() => {
    const getQuestionData = async() => {
      const { data } = await axios.get(`/api/questions/${id}`)
      const { body, title, url, username, upvoted_by, downvoted_by, views, id:question_id } = data.questionDetails
      setBody(body)
      setTitle(title)
      setUrl(url)
      setUsername(username)
      setDownvotedBy(downvoted_by ? downvoted_by : [])
      setUpvotedBy(upvoted_by)
      setViews(views)

    }
    getQuestionData()
  }, [])

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
    <div className="border-l-2  min-h-custom font-inter">
      <div className="pl-4 pr-6 m-auto pt-5 pb-3 border-b-2 ">
        <div className="flex items-center justify-between">
          <h1 className="text-[24px] font-medium text-gray-800 mr-2">{title}</h1>
          <button className="bg-cta px-5 py-3 text-sm font-medium min-w-max font-inter text-white rounded-default place-self-start ">
            Ask Question
          </button>
        </div>
        <div className="flex mt-2 text-[12px]">
          <div className="flex mr-5">
            <h2 className="text-cta-fade-text mr-1 font-light">Asked</h2>
            <h2 className="font-normal">today</h2>
          </div>
          <div className="flex">
            <h2 className="text-cta-fade-text mr-1 font-light">Viewed</h2>
            <h2 className="font-normal">{views} times</h2>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-inner-layout ">
        <div className="border-r-2 pt-3 ">
          <div className="grid grid-cols-[0.1fr_0.9fr] pb-4 border-b-2">
            <div className='flex flex-col mt-5 h-fit items-center '>
              <button className="outline-none" onClick={handleUpvote}>
                <ArrowCircleUpIcon className={`w-10  ${upvotedBy.includes(userID) ? "text-orange-500" : "text-gray-700"}`} />
              </button>
              <h1 className='my-1 font-medium text-[17px]'>{upvotedBy.length - downvotedBy
              .length}</h1>
              <button className="" onClick={handleDownvote}>
                <ArrowCircleDownIcon className={`w-10  ${downvotedBy.includes(userID) ? "text-orange-500" : "text-gray-700"}`}/>
              </button>
            </div>
            <div className="">  
              <h1 className='text-gray-800 pr-4 whitespace-pre-line'>{body}</h1>
              <div className="flex mt-2">
                <Tag tagName={"html"} size={'xl'} />
                <Tag tagName={"react"} size='xl' />
              </div>
              <div className="flex justify-between mt-1.5 pr-4">
                <div className="flex place-items-start">
                  <button className='text-[13px] font-medium text-gray-700'>Share</button>
                  <button className='text-[13px] font-medium text-gray-700 mx-2'>Edit</button>
                  <button className='text-[13px] font-medium text-gray-700'>Delete</button>
                </div>
                <UserQuestionDetail url={url} username={username} background={true}/>
              </div>
            </div>
          </div>
          <div className="flex justify-between items-center px-4 mt-5 mb-2">
            <h1 className="text-xl font-semibold">2 Answers</h1>
            <ul className="flex items-center ">
              <li className="bg-cta-fade py-1.5 px-4 o outline outline-1 outline-cta flex items-center justify-center rounded-tl-md rounded-bl-md  text-cta-fade-text">
                <h1 className="text-sm">Newest</h1>
              </li>
              <li className="bg-white text-cta py-1.5 px-4 outline outline-1 outline-cta flex items-center justify-center">
                <h1 className="text-sm">Oldest</h1>
              </li>
              <li className="bg-white text-cta py-1.5 px-4 outline outline-1 outline-cta flex items-center justify-center rounded-tr-md rounded-br-md  ">
                <h1 className="text-sm">Votes</h1>
              </li>
            </ul>
          </div>
          <AnswerBody url={"https://secure.gravatar.com/avatar/62184217e125b50017b1462f?s=164&d=identicon"} />
          <AnswerBody url={"https://www.gravatar.com/avatar/54575a5b5887e5b9a61bf48a307710ff?d=identicon"} />

          <div className="px-4 mb-5 mt-2">
            <h1 className="text-xl font-medium">Your answer</h1>
            <textarea className="w-full h-40 outline outline-[1.5px] text-sm text-gray-800 px-2 py-2 mt-2 resize-y rounded-default outline-gray-300 focus:outline-gray-600"></textarea>
            <button className="rounded-default bg-cta text-white py-2 px-10 text-sm font-medium">Submit Answer</button>
          </div>
        </div>
        <TagsBar />
      </div>
    </div>
  )
}

export default SinglePost
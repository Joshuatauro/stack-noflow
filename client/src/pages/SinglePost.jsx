import { ArrowCircleDownIcon, ArrowCircleUpIcon, ChevronDoubleDownIcon, ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/outline'
import axios from '../axios'
import React, { useEffect, useState, useContext } from 'react'
import { Link, useParams } from 'react-router-dom'
import AnswerBody from '../components/AnswerBody'
import Tag from '../components/Tag'
import TagsBar from '../components/TagsBar'
import UserQuestionDetail from '../components/UserQuestionDetail'
import { AuthContext } from '../context/AuthContext'
import Moment from 'react-moment'
const SinglePost = () => {
  const { userID, username: owner_username, url: owner_url } = useContext(AuthContext)

  const { id } = useParams()

  const [body, setBody] = useState('')
  const [title, setTitle] = useState('')
  const [views, setViews] = useState('')
  const [upvotedBy, setUpvotedBy] = useState([1,2,3])
  const [downvotedBy, setDownvotedBy] = useState([1])
  const [username, setUsername] = useState('')
  const [url, setUrl] = useState('')
  const [createdAt, setCreatedAt] = useState()
  
  const [answers, setAnswers] = useState([])
  const [comments, setComments] = useState([])

  const [answer, setAnswer] = useState('')

  useEffect(() => {
    const getQuestionData = async() => {
      const { data } = await axios.get(`/api/questions/${id}`, {withCredentials: true} )
      const { body, title, url, username, upvoted_by, downvoted_by, views, created_at } = data.questionDetails
      setBody(body)
      setTitle(title)
      setUrl(url)
      setUsername(username)
      setDownvotedBy(downvoted_by ? downvoted_by : [])
      setUpvotedBy(upvoted_by ? upvoted_by : [])
      setViews(views)
      setCreatedAt(created_at)
    }

    const getAnswersAndCommentsData = async() => {
      const { data } = await axios.get(`/api/answers/${id}`, { withCredentials: true })
      setComments(data.comments)
      setAnswers(data.answers)
    }

    getQuestionData()
    getAnswersAndCommentsData()
  }, [])

  const submitAnswer = async(e) => {
    e.preventDefault()
    const { data } = await axios.post('/api/answers/publish', { answer, questionID: id }, { withCredentials: true })
    const answerDets = data.answerDetails
    answerDets.username = owner_username
    answerDets.url = owner_url

    setAnswers([...answers, answerDets])
    setAnswer('')
  }

  const handleUpvote = async() => {
    if(upvotedBy?.includes(userID)) {
      const { data } = await axios.get(`/api/voting/questions/${id}/remove-upvote`,{ withCredentials: true })
      setUpvotedBy(data.upvoted_by)
      setDownvotedBy(data.downvoted_by)

    } else {
      
      const { data } = await axios.get(`/api/voting/questions/${id}/add-upvote`, { withCredentials: true })
      setUpvotedBy(data.upvoted_by)
      setDownvotedBy(data.downvoted_by)
    }
  }

  const handleDownvote = async() => {
    if(downvotedBy?.includes(userID)) {
      const { data } = await axios.get(`/api/voting/questions/${id}/remove-downvote`,{ withCredentials: true })
      setUpvotedBy(data.upvoted_by)
      setDownvotedBy(data.downvoted_by)
    } else {
      
      const { data } = await axios.get(`/api/voting/questions/${id}/add-downvote`, { withCredentials: true })
      setUpvotedBy(data.upvoted_by)
      setDownvotedBy(data.downvoted_by)
    }
  }

  return (
    <div className="border-l-2  min-h-custom">
      <div className="pl-4 pr-6 m-auto pt-5 pb-3 border-b-2 ">
        <div className="flex items-center justify-between">
          <h1 className="text-[24px] font-medium text-gray-800 mr-2">{title}</h1>
          <Link to={'/publish'} className="bg-cta px-5 py-3 text-sm font-medium min-w-max text-white rounded-default place-self-start ">
            Ask Question
          </Link>
        </div>
        <div className="flex mt-2 text-[12px]">
          <div className="flex mr-5">
            <h2 className="text-cta-fade-text mr-1 font-light">Asked</h2>
            <h2 className="font-normal"><Moment fromNow >{createdAt}</Moment></h2>
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
                <ChevronUpIcon className={`w-10  ${upvotedBy?.includes(userID) ? "text-orange-500" : "text-gray-700"}`} />
              </button>
              <h1 className='my-1 font-medium text-[17px]'>{upvotedBy?.length - downvotedBy?.length}</h1>
              <button className="" onClick={handleDownvote}>
                <ChevronDownIcon className={`w-10  ${downvotedBy?.includes(userID) ? "text-orange-500" : "text-gray-700"}`}/>
              </button>
            </div>
            <div className="">  
              <h1 className='text-gray-800 pr-4 whitespace-pre-line'>{body}</h1>
              <div className="flex mt-2">
                <Tag tagName={"html"} size={'xl'} />
                <Tag tagName={"react"} size='xl' />
              </div>
              <div className="flex justify-between mt-1.5 pr-4">
                <div className="flex place-items-end">
                  <button className='text-[13px] font-medium text-gray-700'>Share</button>
                  <button className='text-[13px] font-medium text-gray-700 mx-2'>Edit</button>
                  <button className='text-[13px] font-medium text-gray-700'>Delete</button>
                </div>
                <UserQuestionDetail url={url} username={username} background={true}/>
              </div>
            </div>
          </div>
          <div className="flex justify-between items-center px-4 mt-5 mb-2">
            <h1 className="text-xl font-semibold">{answers.length} Answers</h1>
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
          {
            answers.map(({answer_id,url, body, username, created_at, updated_at, upvoted_by, downvoted_by, user_id}) => <AnswerBody answerID={answer_id} url={url} username={username} upvotedBy={upvoted_by} downvotedBy={downvoted_by} body={body} ownerID={user_id} />)
          }


          <div className="px-4 mb-5 mt-2">
            <h1 className="text-xl font-medium">Your answer</h1>
            <textarea value={answer} onChange={e => setAnswer(e.target.value)} className="w-full h-40 outline outline-[1.5px] text-sm text-gray-800 px-2 py-2 mt-2 resize-y rounded-default outline-gray-300 focus:outline-gray-600"></textarea>
            <button type='submit' onClick={submitAnswer} className="rounded-default bg-cta text-white py-2 px-10 text-sm font-medium">Submit Answer</button>
          </div>
        </div>
        <TagsBar />
      </div>
    </div>
  )
}

export default SinglePost
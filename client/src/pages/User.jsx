import axios from '../axios'
import React, { useEffect, useState, useContext } from 'react'
import { Link, useParams } from 'react-router-dom'
import { CalendarIcon } from '@heroicons/react/outline'
import Moment from 'react-moment'

const User = () => {
  const { username } = useParams()

  const [questions, setQuestions] = useState()
  const [answers, setAnswers] = useState()
  const [userDetails, setUserDetails] = useState()


  useEffect(() => {
    const getUserDetails = async() => {
      const { data } = await axios.get(`/api/users/${username}`)
      setQuestions(data.questions)
      setAnswers(data.answers)
      setUserDetails(data.userDetails)
    } 

    getUserDetails()
  }, [])

  return (
    <div className="border-x-2 dark:border-dark-fade  min-h-custom dark:bg-dark dark:text-dark-text transition duration-300">
      <div className="px-4 m-auto py-5">
        <div className="flex">
          <img className=" object-contain h-28 rounded-default" src={userDetails?.url} alt="" />
          <div className="ml-3 w-full">
          <div className="flex items-end">
            <h1 className="text-3xl font-medium text-gray-800 dark:text-white">{userDetails?.username}</h1>
            <a className='text-[14px] mx-2 text-cta underline' href="https://joshuatauro.vercel.app" target="_blank" rel="noreferrer">Portfolio</a>
              <a className='text-[14px] text-cta underline' href="https://joshuatauro.vercel.app" target="_blank" rel="noreferrer">Github</a>
            </div>
            <div className="flex items-center w-full mt-1 mb-3 ">
                <CalendarIcon className="h-5 mr-1" />
                <Moment fromNow className="text-[13px]">{userDetails?.joined_at}</Moment>              
            </div>
            <p className="text-[14px] text-gray-700 dark:text-dark-text">{userDetails?.about ? userDetails.about : 'Hey there, welcome to my profile'}</p>
          </div>
        </div>
        <div className="mt-5">
          <h1 className="text-2xl text-gray-800 mb-2 dark:text-white">Recent questions</h1>
          {
            questions?.map(({id, title, vote_count, created_at}) => <Question title={title} key={id} voteCount={vote_count} createdAt={created_at} id={id} />)
          }
        </div>
        <div className="mt-7">
          <h1 className="text-2xl text-gray-800 mb-2 dark:text-white">Recent answers</h1>
          {
            answers?.map(({id, body, vote_count, created_at, question_id}) => <Answer body={body} key={id} voteCount={vote_count} createdAt={created_at} id={id} questionID={question_id}/>)
          }
        </div>
      </div>
    </div>
  )
}

const Question = ({id, title, createdAt, voteCount}) => {
  console.log(title)
  return(
    <Link to={`/question/${id}`} className=" grid grid-cols-[0.05fr_0.95fr] items-center border-b-2 dark:border-dark-fade py-2">
      <div className="grid place-items-center">
        <div className="items-center border border-gray-800 dark:border-dark-text text-sm mr-1 justify-center h-fit py-1 px-2">{voteCount}</div>
      </div>
      <div className="flex justify-between">
        <h1 className="bg-red dark:text-white">{title}</h1>
        <Moment className='text-sm text-gray-700 dark:text-dark-text' format='DD MMM, YYYY'>{createdAt}</Moment>
      </div>
    </Link>
  )
}

const Answer = ({id, body, createdAt, voteCount, questionID}) => {
  return(

    <Link to={`/question/${questionID}`} className=" grid grid-cols-[0.05fr_0.95fr] items-center border-b-2 py-2">
      <div className="grid place-items-center">
        <div className="items-center border border-gray-800  text-sm mr-1 justify-center h-fit py-1 px-2">{voteCount}</div>
      </div>
      <div className="flex justify-between">
        <h1 className="bg-red">{body.substr(0, 120)}{body.length > 120 ? '...' : ''}</h1>
        <Moment className='text-sm whitespace-nowrap text-gray-700' format='DD MMM, YYYY'>{createdAt}</Moment>
      </div>
    </Link>
  )
}
export default User
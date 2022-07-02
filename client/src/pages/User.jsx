import axios from '../axios'
import React, { useEffect, useState, useContext } from 'react'
import { Link, useParams } from 'react-router-dom'
import { CalendarIcon } from '@heroicons/react/outline'
import Moment from 'react-moment'

const User = () => {
  const { username } = useParams()

  const [questions, setQuestions] = useState()
  const [answers, setAnswers] = useState()
  const [userDetails, setUserDetails] = useState({username: "Joshua Tauro", url: "https://www.gravatar.com/avatar/54575a5b5887e5b9a61bf48a307710ff?d=identicon"})


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
          <img className=" object-contain h-20 md:h-28 rounded-default" src={userDetails?.url} alt="" />
          <div className="ml-3 w-full">
          <div className="flex items-end">
            <h1 className="text-mobile-xl md:text-3xl font-medium text-gray-800 dark:text-white">{userDetails?.username}</h1>
            </div>
            <div className="flex items-center w-full mt-1 mb-3 ">
                <CalendarIcon className="h-4 md:h-5 mr-1" />
                <div className="flex">
                  <h1 className='text-mobile-sm md:text-[13px] mr-1'>joined </h1> <Moment fromNow  className="text-mobile-sm md:text-[13px]">{userDetails?.joined_at}</Moment>              
                </div>
            </div>
          </div>
        </div>
        <div className="mt-5">
          <h1 className="text-mobile-xl md:text-2xl text-gray-800 mb-2 dark:text-white">Recent questions</h1>
          {
            questions?.map(({id, title, vote_count, created_at}) => <Question title={title} key={id} voteCount={vote_count} createdAt={created_at} id={id} />)
          }
        </div>
        <div className="mt-7">
          <h1 className="text-mobile-xl md:text-2xl text-gray-800 mb-2 dark:text-white">Recent answers</h1>
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
      <div className="flex justify-center">
        <div className="items-center border border-gray-800 dark:border-dark-text text-sm mr-1 justify-center h-fit w-7 py-0.5 flex  ">{voteCount}</div>
      </div>
      <div className="flex justify-between">
        <h1 className="dark:text-white text-mobile-xs md:text-sm flex-wrap mx-1">{title}</h1>
        <div className="flex justify-end flex-nowrap">
          <Moment className='text-mobile-xs md:text-sm min-w-max  text-gray-700 dark:text-dark-text flex-nowrap' format='DD MMM, YYYY'>{createdAt}</Moment>
        </div>
      </div>
    </Link>
  )
}

const Answer = ({id, body, createdAt, voteCount, questionID}) => {
  return(
    <Link to={`/question/${questionID}`} className=" grid grid-cols-[0.05fr_0.95fr] items-center border-b-2 dark:border-dark-fade py-2">
      <div className="flex justify-center h-full w-full">
        <div className="items-center border border-gray-800 dark:border-dark-text text-sm mr-1 justify-center h-fit w-7 py-0.5 flex  ">{voteCount}</div>
        </div>
        <div className="flex justify-between">
          <h1 className="dark:text-white text-mobile-xs md:text-sm flex-wrap mx-1">{body.slice(0,150)}</h1>
          <div className="flex justify-end flex-nowrap">
            <Moment className='text-mobile-xs md:text-sm min-w-max  text-gray-700 dark:text-dark-text flex-nowrap' format='DD MMM, YYYY'>{createdAt}</Moment>
          </div>
      </div>
    </Link>
  )
}
export default User
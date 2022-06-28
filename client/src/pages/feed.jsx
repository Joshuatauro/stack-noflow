import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import PostPreview from '../components/PostPreview'
import axios from '../axios'
import { Link, useSearchParams } from 'react-router-dom'
import toast, {Toaster} from 'react-hot-toast'
import { InformationCircleIcon, XCircleIcon } from '@heroicons/react/outline'

const Feed = () => {
  const [questions, setQuestions] = useState([])
  const [page, setPage] = useState(0)
  const [searchParams] = useSearchParams()
  searchParams.get("sort")

  useEffect(() => {
    const fetchPosts = async() => {
      const { data } = await axios.get(`/api/questions?sort=${searchParams.get("sort")}`)
      setQuestions(data.questions)
      setPage(prev => prev+1)
    }

    fetchPosts()
  }, [searchParams])

  const getNextPage = async() => {
    const { data } = await axios.get(`/api/questions?page=${page}&?sort=${searchParams.get("sort")}`)
    console.log(data)
    setQuestions([...questions, ...data.questions])
    setPage(prev => prev+1)
    toast(data.message, {
      icon: <InformationCircleIcon className='h-6' />,
      style: {
        backgroundColor: "#0A95FF",
        color: "#fff"
      },
      duration: 2500
    })
  }


  return (
    <div className="border-x-2 min-h-custom dark:bg-dark dark:text-white dark:border-dark-fade transition duration-300">
      <div className="px-4 m-auto py-5 border-b-2 dark:border-gray-700 ">
        <div className="flex items-center justify-between">
          <h1 className="text-[24px] font-medium text-gray-800 dark:text-white mr-2">All Questions</h1>
          <Link to="/publish" className="bg-cta px-5 py-3 text-sm font-medium min-w-max text-white rounded-default place-self-start ">
            Ask Question 
          </Link>
        </div>
        <div className="flex justify-end">

          <ul className="flex mt-5">
            <Link to={`/feed`} className={`${searchParams.get("sort") ? 'text-cta' : 'text-cta-fade-text dark:text-dark-cta-fade-text bg-cta-fade dark:bg-dark-cta-fade'} py-1.5 px-4 o outline outline-1 outline-cta flex items-center justify-center rounded-tl-default rounded-bl-default  `}>
              <h1 className="text-sm">New</h1>
            </Link>
            <Link to={`/feed?sort=top`} className={`${searchParams.get("sort") === 'top' ? 'text-cta-fade-text dark:text-dark-cta-fade-text bg-cta-fade dark:bg-dark-cta-fade' : ' text-cta '} py-1.5 px-4 o outline outline-1 outline-cta flex items-center justify-center `}>
              <h1 className="text-sm">Top</h1>
            </Link>
            <Link to={`/feed?sort=views`} className={`${searchParams.get("sort") === 'views' ? 'text-cta-fade-text dark:text-dark-cta-fade-text bg-cta-fade dark:bg-dark-cta-fade' : ' text-cta '} py-1.5 px-4 o outline outline-1 outline-cta flex items-center justify-center rounded-br-default rounded-tr-default`}>
              <h1 className="text-sm">Views</h1>
            </Link>
          </ul>
        </div>
      </div>
      {
        questions?.map(({title, body, url, username, created_at, total_answers, tags, upvoted_by, downvoted_by, question_id, views}) => <PostPreview title={title} body={body} url={url} totalAnswers={total_answers} username={username} createdAt={created_at} tags={tags} upvotedBy={upvoted_by} downvotedBy={downvoted_by} qID={question_id} views={views} />)
      }
      <div className="flex justify-center my-4">
        <button onClick={getNextPage} className="px-6 py-3 bg-cta rounded-default text-white font-medium text-sm">Get more</button>
      </div>
      <Toaster position="bottom-right" /> 
    </div>
  )
}

export default Feed
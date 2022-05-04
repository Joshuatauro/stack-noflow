import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import PostPreview from '../components/PostPreview'
import axios from '../axios'
import { Link } from 'react-router-dom'
import toast, {Toaster} from 'react-hot-toast'

const Feed = () => {
  const [questions, setQuestions] = useState([])
  const [page, setPage] = useState(0)

  useEffect(() => {
    const fetchPosts = async() => {
      const { data } = await axios.get(`/api/questions/`)
      setQuestions(data.questions)
      setPage(prev => prev+1)
    }

    fetchPosts()
  }, [])

  const getNextPage = async() => {
    const { data } = await axios.get(`/api/questions?page=${page}`)
    console.log(data.questions)
    setQuestions([...questions, ...data.questions])
    setPage(prev => prev+1)
    toast.success('Fetching', {
      
    })
  }


  return (
    <div className="border-x-2 min-h-custom ">
      <div className="px-4 m-auto py-5 border-b-2 ">
        <div className="flex items-center justify-between">
          <h1 className="text-[24px] font-medium text-gray-800 mr-2">All Questions</h1>
          <Link to="/publish" className="bg-cta px-5 py-3 text-sm font-medium min-w-max text-white rounded-default place-self-start ">
            Ask Question
          </Link>
        </div>
        <div className="flex justify-end">

          <ul className="flex mt-5">
            <li className="bg-cta-fade py-1.5 px-4 o outline outline-1 outline-cta flex items-center justify-center rounded-tl-md rounded-bl-md  text-cta-fade-text">
              <h1 className="text-sm">Hot</h1>
            </li>
            <li className="bg-white text-cta py-1.5 px-4 outline outline-1 outline-cta flex items-center justify-center">
              <h1 className="text-sm">New</h1>
            </li>
            <li className="bg-white text-cta py-1.5 px-4 outline outline-1 outline-cta flex items-center justify-center">
              <h1 className="text-sm">Top</h1>
            </li>
            <li className="bg-white text-cta py-1.5 px-4 outline outline-1 outline-cta flex items-center justify-center rounded-tr-md rounded-br-md  ">
              <h1 className="text-sm">Votes</h1>
            </li>
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
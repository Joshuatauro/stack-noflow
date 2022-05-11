import { ArrowCircleDownIcon, ArrowCircleUpIcon, CheckCircleIcon, ChevronDoubleDownIcon, ChevronDownIcon, ChevronUpIcon, XCircleIcon } from '@heroicons/react/outline'
import axios from '../axios'
import React, { useEffect, useState, useContext } from 'react'
import { Link, useParams } from 'react-router-dom'
import AnswerBody from '../components/AnswerBody'
import Tag from '../components/Tag'
import TagsBar from '../components/TagsBar'
import UserQuestionDetail from '../components/UserQuestionDetail'
import { AuthContext } from '../context/AuthContext'
import Moment from 'react-moment'
import toast, { Toaster } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
const SinglePost = () => {
  const navigate = useNavigate()
  const { userID, username: owner_username, url: owner_url } = useContext(AuthContext)
  const { id } = useParams()

  const [body, setBody] = useState('')
  const [authorID, setAuthorID] = useState('')
  const [title, setTitle] = useState('')
  const [views, setViews] = useState('')
  const [upvotedBy, setUpvotedBy] = useState([1,2,3])
  const [downvotedBy, setDownvotedBy] = useState([1])
  const [username, setUsername] = useState('')
  const [url, setUrl] = useState('')
  const [createdAt, setCreatedAt] = useState()
  const [updatedAt, setUpdatedAt] = useState()
  
  const [answers, setAnswers] = useState([])
  const [comments, setComments] = useState([])

  const [answer, setAnswer] = useState('')

  const [isEditing, setIsEditing] = useState(false)
  const [editingBody, setEditingBody] = useState('')

  useEffect(() => {
    const getQuestionData = async() => {
      const { data } = await axios.get(`/api/questions/${id}`, {withCredentials: true} )
      const { body, title, url, username, upvoted_by, downvoted_by, views, created_at, updated_at, user_id:author_id} = data.questionDetails
      setBody(body)
      setEditingBody(body)
      setTitle(title)
      setUrl(url)
      setUsername(username)
      setDownvotedBy(downvoted_by ? downvoted_by : [])
      setUpvotedBy(upvoted_by ? upvoted_by : [])
      setViews(views)
      setCreatedAt(created_at)
      setUpdatedAt(updated_at)
      setAuthorID(author_id)
    }

    const getAnswersAndCommentsData = async() => {
      const { data } = await axios.get(`/api/answers/${id}`, { withCredentials: true })
      setComments(data.comments)
      setAnswers(data.answers)
      console.log(data.comments)
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

  const handleEditQuestion = async() => {
    try {
    
      const { data } = await axios.post(`/api/questions/${id}/edit`, { editedBody: editingBody }, { withCredentials: true })
      if(data.status === "Success") {
        setBody(data.editedDetails.body)
        setUpdatedAt(data.editedDetails.updated_at)
        setIsEditing(false)

        toast.success(data.message, {
          icon: <CheckCircleIcon className='h-6' />,
          style: {
            backgroundColor: "#22C55E",
            color: "#fff"
          }
        })

      }

    } catch (err) {
      toast.error(err.response.data.message, {
        icon: <XCircleIcon className='h-6' />,
        style: {
          backgroundColor: "#EF4444",
          color: "#fff"
        },
        
      })
    }
  }

  const handleDeleteAnswer = async(aID) => {

    if(window.confirm("Are you sure you wanna delete the answer?")) {
      try{

        const { data } = await axios.get(`/api/answers/${aID}/delete`, { withCredentials: true })
        if(data.status === "Success") {
          setAnswers(answers.filter(ans => ans.id !== aID))
          toast.success(data.message, {
            icon: <CheckCircleIcon className='h-6' />,
            style: {
              backgroundColor: "#22C55E",
              color: "#fff"
            }
          })
        }
      } catch(err) {

      }
    }
  }

  const handleDeleteQuestion = async() => {
    if(window.confirm("Are you sure you want to delete this question? This action is non-reversible")) {
      try {
        const { data } = await axios.delete(`/api/questions/${id}/delete`, { withCredentials: true })
        if(data.status === "Success") {
          toast.success(data.message, {
            icon: <CheckCircleIcon className='h-6' />,
            style: {
              backgroundColor: "#22C55E",
              color: "#fff"
            },
            duration: 2500
          })
          setTimeout(() => {
            navigate('/feed')
          }, 2000);
        }
      } catch(err) {

      }
    }
  }

  const handleCopyToClipboard = async() => {
    navigator.clipboard.writeText(window.location.href)
    toast.success('Successfully copied the url to clipboard!', {
      icon: <CheckCircleIcon className='h-6' />,
      style: {
        backgroundColor: "#22C55E",
        color: "#fff"
      },
      duration: 2500
    })
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
              <p className='my-1 font-medium text-[17px]'>{upvotedBy?.length - downvotedBy?.length}</p>
              <button className="" onClick={handleDownvote}>
                <ChevronDownIcon className={`w-10  ${downvotedBy?.includes(userID) ? "text-orange-500" : "text-gray-700"}`}/>
              </button>
            </div>
            <div className="">  
              {
                isEditing ? (
                  <>
                    <textarea value={editingBody} onChange={e => setEditingBody(e.target.value)} placeholder="Enter atleast 30 characters" className="w-full py-1.5 px-2 outline outline-1   rounded-default h-52 resize-none placeholder:text-sm" />
                    <div className="flex mb-5">
                      <button onClick={handleEditQuestion} className="text-sm rounded-default py-2 px-7 bg-cta text-white font-medium mr-2">Publish</button>
                      <button onClick={e => setIsEditing(false)} className="text-sm rounded-default py-2.5 px-7 outline outline-cta bg-cta bg-opacity-10 text-cta font-medium">Cancel</button>

                    </div>
                  </>
                  ) : (
                  <p className='text-gray-800 pr-4 whitespace-pre-line'>{body}</p>
                )
              }
              <div className="flex mt-2">
                <Tag tagName={"html"} size={'xl'} />
                <Tag tagName={"react"} size='xl' />
              </div>
              <div className="flex justify-between mt-1.5 pr-4">
                <div className="flex place-items-start">
                  <button onClick={handleCopyToClipboard} className='text-[13px] font-medium text-gray-700'>Share</button>
                {
                  authorID === userID ? (
                    <div className="flex">

                    <button onClick={e => setIsEditing(true)} className='text-[13px] font-medium text-gray-700 mx-2'>Edit</button>
                    <button onClick={handleDeleteQuestion} className='text-[13px] font-medium text-gray-700'>Delete</button>
                    </div>
                    ) : <div className=""></div>
                  }
                  </div>
                <UserQuestionDetail url={url} createdAt={createdAt} updatedAt={updatedAt} username={username} background={true}/>
              </div>
            </div>
          </div>
          <div className="flex justify-between items-center px-4 mt-5 mb-2">
            <h1 className="text-xl font-semibold">{answers.length} Answers</h1>
          </div>
          {
            answers.map(({id,url, body, username, created_at, updated_at, upvoted_by, downvoted_by, user_id}) => <AnswerBody key={id} answerID={id} url={url} username={username} upvotedBy={upvoted_by} downvotedBy={downvoted_by} body={body} ownerID={user_id} updated={updated_at} created={created_at} deleteAnswer={handleDeleteAnswer} childrenComments={comments.filter(comment => comment.answer_id === id)} />)
          }


          <div className="px-4 mb-5 mt-2">
            <h1 className="text-xl font-medium">Your answer</h1>
            <textarea value={answer} onChange={e => setAnswer(e.target.value)} className="w-full h-40 outline outline-1 px-2 py-2 mt-2 resize-y rounded-default"></textarea>

            <button type='submit' onClick={submitAnswer} className="rounded-default bg-cta text-white py-2 px-10 text-sm font-medium">Submit Answer</button>
          </div>
        </div>
        <TagsBar />
      </div>
      <Toaster position="bottom-right" />
    </div>
  )
}

export default SinglePost
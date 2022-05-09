import { CheckCircleIcon, ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/outline'
import axios from '../axios'
import React, { useContext, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import Tag from './Tag'
import UserQuestionDetail from './UserQuestionDetail'
import toast, { Toaster } from 'react-hot-toast'

const AnswerBody = ({url, upvotedBy, downvotedBy, children, body, username, ownerID, answerID, updated, created, deleteAnswer}) => {
  const { userID } = useContext(AuthContext)

  const [answer, setAnswer] = useState(body)
  const [updatedAt, setUpdatedAt] = useState(updated)
  
  const [upvoted, setUpvoted] = useState(upvotedBy ? upvotedBy : [])
  const [downvoted, setDownvoted] = useState(downvotedBy ? downvotedBy : [])

  const [isEditing, setIsEditing] = useState(false)
  const [editedBody, setEditedBody] = useState(body)

  const handleUpvote = async() => {
    if(upvoted?.includes(userID)) {
      const { data } = await axios.get(`/api/voting/answers/${answerID}/remove-upvote`,{ withCredentials: true })
      setUpvoted(data.upvoted_by)
      setDownvoted(data.downvoted_by)

    } else {
      
      const { data } = await axios.get(`/api/voting/answers/${answerID}/add-upvote`, { withCredentials: true })
      setUpvoted(data.upvoted_by)
      setDownvoted(data.downvoted_by)
    }
  }

  const handleDownvote = async() => {
    if(downvoted?.includes(userID)) {
      const { data } = await axios.get(`/api/voting/answers/${answerID}/remove-downvote`,{ withCredentials: true })
      setUpvoted(data.upvoted_by)
      setDownvoted(data.downvoted_by)

    } else {
      
      const { data } = await axios.get(`/api/voting/answers/${answerID}/add-downvote`, { withCredentials: true })
      setUpvoted(data.upvoted_by)
      setDownvoted(data.downvoted_by)


    }
  }

  const handleEditAnswer = async() => {
    try{
      const { data } = await axios.post(`/api/answers/${answerID}/edit`,{ editedBody }, { withCredentials: true })
      setIsEditing(false)
      setAnswer(data.editedDetails.body)
      setUpdatedAt(data.editedDetails.updated_at)

      toast.success(data.message, {
        icon: <CheckCircleIcon className='h-6' />,
        style: {
          backgroundColor: "#22C55E",
          color: "#fff"
        }
      })

    } catch(err) {
      
    }
  }
  
  // const handleDeleteAnswer = async() => {
  //   if(window.confirm("Are you sure you want to delete this answer?")){
  //     const {  }
  //   }
  //   // const choice = confirm('Are you sure you want to delete this answer?')
  // }

  return (
    <div className="grid grid-cols-[0.1fr_0.9fr] py-4 border-b-2">
      <div className='flex flex-col h-fit items-center '>
        <button className="outline-none" onClick={handleUpvote} >
          <ChevronUpIcon className={`w-10  ${upvoted.includes(userID) ? "text-orange-500" : "text-gray-700"}`} />
        </button>
        <p className='my-1 font-medium text-[17px]'>{upvoted.length - downvoted?.length}</p>
        <button className="" onClick={handleDownvote}>
          <ChevronDownIcon className={`w-10  ${downvoted?.includes(userID) ? "text-orange-500" : "text-gray-700"}`}/>
        </button>
      </div>
      <div className="">  
        {
          isEditing ? (
            <div className='pr-4'>
              <textarea value={editedBody} onChange={e => setEditedBody(e.target.value)} className="w-full rounded-default outline-1 outline px-2 py-2 h-36 resize-y"></textarea>
              <div className="flex mb-5">
                <button onClick={handleEditAnswer} className="text-sm rounded-default py-2 px-7 bg-cta text-white font-medium mr-2">Publish</button>
                <button onClick={e => setIsEditing(false)} className="text-sm rounded-default py-2.5 px-7 outline outline-cta bg-cta bg-opacity-10 text-cta font-medium">Cancel</button>
              </div>
            </div>
          ) : (
            <p className='text-gray-800 whitespace-pre-line'>{answer}</p>
          )
        }
        <div className="flex justify-between mt-1.5 pr-4">
          {
            userID === ownerID ? (
            <div className="flex place-items-end">
              <button onClick={e => setIsEditing(true)} className='text-[13px] font-medium text-gray-700 mr-2'>Edit</button>
              <button onClick={e => deleteAnswer(answerID)} className='text-[13px] font-medium text-gray-700'>Delete</button>
            </div>
            ) : (
              <div className=""></div>
            )
          }
          <div className="mt-2">
            <UserQuestionDetail url={url} username={username} background={true} createdAt={created} updatedAt={updatedAt} />
          </div>
        </div>
      </div>
      <Toaster position="bottom-right" />
    </div>
  )
}

export default AnswerBody
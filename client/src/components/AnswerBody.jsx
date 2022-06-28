import { CheckCircleIcon, ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/outline'
import axios from '../axios'
import React, { useContext, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import Tag from './Tag'
import UserQuestionDetail from './UserQuestionDetail'
import toast, { Toaster } from 'react-hot-toast'
import { useParams } from 'react-router-dom'
import Comment from './Comment'

const AnswerBody = ({url, upvotedBy, downvotedBy, childrenComments, body, username, ownerID, answerID, updated, created, deleteAnswer}) => {
  const { id: questionID } = useParams()

  const { userID, url: userURL, username: userUsername } = useContext(AuthContext)

  const [comments, setComments] = useState(childrenComments)

  const [answer, setAnswer] = useState(body)
  const [updatedAt, setUpdatedAt] = useState(updated)
  
  const [upvoted, setUpvoted] = useState(upvotedBy ? upvotedBy : [])
  const [downvoted, setDownvoted] = useState(downvotedBy ? downvotedBy : [])

  const [isEditing, setIsEditing] = useState(false)
  const [editedBody, setEditedBody] = useState(body)

  const [isAddingComment, setIsAddingComment] = useState('')
  const [commentBody, setCommentBody] = useState('')

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

  const handleAddComment = async() => {
    try {
      setIsAddingComment(false)
      setCommentBody('')
      const { data } = await axios.post(`/api/comments/publish`, { commentBody, answerID, questionID }, { withCredentials: true })
      console.log(data)
      const commentDetails = data.commentDetails
      commentDetails.username = userUsername
      setComments([...comments, commentDetails])

    } catch(err) {

    }
  }

  return (
    <div className="grid grid-cols-[0.1fr_0.9fr] py-4 border-b-2 dark:border-dark-fade transition duration-300">
      <div className='flex flex-col h-fit items-center '>
        <button className="outline-none" onClick={handleUpvote} >
          <ChevronUpIcon className={`w-10  ${upvoted.includes(userID) ? "text-orange-500" : "text-gray-700"}`} />
        </button>
        <p className='my-1 font-medium text-[17px] dark:text-white'>{upvoted.length - downvoted?.length}</p>
        <button className="" onClick={handleDownvote}>
          <ChevronDownIcon className={`w-10  ${downvoted?.includes(userID) ? "text-orange-500" : "text-gray-700"}`}/>
        </button>
      </div>
      <div className="">  
        {
          isEditing ? (
            <div className='pr-4'>
              <textarea value={editedBody} onChange={e => setEditedBody(e.target.value)} className="w-full rounded-default outline-1 dark:bg-dark dark:outline-white dark:text-gray-300 outline px-2 py-2 h-36 resize-y"></textarea>
              <div className="flex mb-5">
                <button onClick={handleEditAnswer} className="text-sm rounded-default py-2 px-7 bg-cta text-white font-medium mr-2">Publish</button>
                <button onClick={e => setIsEditing(false)} className="text-sm rounded-default py-2.5 px-7 outline outline-cta bg-cta bg-opacity-10 text-cta font-medium">Cancel</button>
              </div>
            </div>
          ) : (
            <p className='text-gray-800 whitespace-pre-line dark:text-white'>{answer}</p>
          )
        }
        <div className="flex justify-between mt-1.5 pr-4">
          {
            userID === ownerID ? (
            <div className="flex place-items-start">
              <button onClick={e => setIsEditing(true)} className='text-[13px] font-medium dark:text-gray-400 text-gray-700 mr-2'>Edit</button>
              <button onClick={e => deleteAnswer(answerID)} className='text-[13px] font-medium text-gray-700 dark:text-gray-400'>Delete</button>
            </div>
            ) : (
              <div className=""></div>
            )
          }
          <div className="mt-2">
            <UserQuestionDetail url={url} username={username} background={true} createdAt={created} updatedAt={updatedAt} />
          </div>
        </div>
        {
          isAddingComment && (
            <div className="mr-4 mt-3">
              <textarea value={commentBody} onChange={e => setCommentBody(e.target.value)} placeholder="Please enter atleast 10 characters" className="w-full rounded-default resize-y h-24 px-2 pt-2 text-sm outline outline-1 dark:bg-dark dark:outline-white dark:text-gray-300"/>
              <div className="flex mt-1 mb-5">
                <button onClick={handleAddComment} className="text-sm rounded-default py-2 px-7 bg-cta text-white font-medium mr-2">Publish</button>
                <button onClick={e => setIsAddingComment(false)} className="text-sm rounded-default px-7 border-2 border-cta  outline-cta bg-cta bg-opacity-10 text-cta font-medium">Cancel</button>
              </div>
            </div>
              
          )
        }
        
        <div className="my-2 pr-4">
          {
            comments.map(({body, username, created_at, updated_at}) => <Comment commentBody={body} username={username} createdAt={created_at} />)
          }
        </div>
        <button onClick={e => setIsAddingComment(prev => !prev)} className="text-cta text-xs font-medium underline mt-2">Add comment</button>
      </div>
      <Toaster position="bottom-right" />
    </div>
  )
}

export default AnswerBody
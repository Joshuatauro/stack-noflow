import React from 'react'
import Tag from './Tag'
import UserQuestionDetail from './UserQuestionDetail'
import { Link } from 'react-router-dom'
const PostPreview = ({title, body, createdAt, updatedAt, username, url, totalAnswers, tags, upvotedBy, downvotedBy, qID, views}) => {
  const upvoted = upvotedBy ? upvotedBy.length : []
  const downvoted = downvotedBy ? downvotedBy.length : []

  return (
    <section className="w-full text-inter border-b-2 dark:border-dark-fade">
      <div className="pr-2 m-auto py-3">
        <div className="grid grid-cols-post-layout">
          <div className="flex flex-col">
            <div className="flex flex-col justify-center items-center">
              <h1 className="text-xl font-medium">{upvoted - downvoted}</h1>
              <p className='text-xs -mt-1'>votes</p>
            </div>
            <div className="flex flex-col justify-center items-center mt-1.5">
              <h1 className="text-xl font-medium">
                {totalAnswers}
              </h1>
              <p className='text-xs -mt-1'>answers</p>
            </div>
            <div className="flex flex-col justify-center items-center mt-1.5">
              <p className='text-xs text-gray-600 dark:text-gray-400 -mt-0.5'>{views} {` `} views</p>
            </div>
          </div>
          <div className="">
              <Link to={`/question/${qID}`} className=" text-[20px] font-semibold text-gray-800 dark:text-white">{title}</Link>
            <p className='text-[14px] text-gray-700 font-normal dark:text-dark-text'>{body.slice(0, 130)}{ body.length > 130 ? "..." : "" }</p>
            <div className="flex mt-2 justify-between">
              <div className="flex">
                {
                  tags?.map(name => <Tag tagName={name} />)
                }
              </div>
              <UserQuestionDetail url={url} username={username} createdAt={createdAt} background={false} />
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}

export default PostPreview
import React from 'react'
import Tag from './Tag'
import UserQuestionDetail from './UserQuestionDetail'
import { Link } from 'react-router-dom'
const PostPreview = ({title, body, createdAt, updatedAt, username, url, totalAnswers, tags, upvotedBy, downvotedBy, qID, views}) => {
  const upvoted = upvotedBy ? upvotedBy.length : []
  const downvoted = downvotedBy ? downvotedBy.length : []

  return (
    <section className="w-full text-inter border-b-2 dark:border-dark-fade transition duration-300">
      <div className="px-2 pr-2 m-auto py-3">
        <div className="md:grid md:grid-cols-post-layout gap-3 md:gap-0">
          <div className="flex items-center md:flex-col">
            <div className="flex md:flex-col justify-center items-center mr-2 md:mr-0">
              <h1 className="text-mobile-xs md:text-xl mr-1 md:mr-0 font-medium">{upvoted - downvoted}</h1>
              <p className='text-mobile-xs md:text-xs md:-mt-1'>votes</p>
            </div>
            <div className="flex md:flex-col justify-center items-center md:mt-1.5">
            <div className="flex md:flex-col justify-center items-center mr-2 md:mr-0">
              <h1 className="text-mobile-xs md:text-xl mr-1 md:mr-0 font-medium">{totalAnswers}</h1>
              <p className='text-mobile-xs md:text-xs md:-mt-1'>answers</p>
            </div>
            </div>
            <div className="flex flex-col justify-center items-center md:mt-1.5">
              <p className='text-mobile-xs md:text-xs text-gray-600 dark:text-gray-400 md:-mt-0.5'>{views} {` `} views</p>
            </div>
          </div>
          <div className="">
              <Link to={`/question/${qID}`} className=" text-mobile-sm md:text-[20px] font-normal md:font-normal underline underline-offset-[2px] decoration-1 text-cta dark:text-dark-cta-fade-text">{title}</Link>
            <p className='text-mobile-xs md:text-[14px] text-gray-700 font-normal dark:text-dark-text'>{body.slice(0, 130)}{ body.length > 130 ? "..." : "" }</p>
            <div className=" mt-2 justify-between">
              <div className="flex">
                {
                  tags?.map(name => <Tag tagName={name} />)
                }
              </div>
              <div className="flex justify-end">

              <UserQuestionDetail url={url} username={username} createdAt={createdAt} background={false} asked={true} />
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}

export default PostPreview
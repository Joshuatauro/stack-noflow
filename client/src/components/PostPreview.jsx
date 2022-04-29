import React from 'react'
import Tag from './Tag'
import UserQuestionDetail from './UserQuestionDetail'

const PostPreview = () => {
  return (
    <section className="w-full text-inter border-b-2">
      <div className="px-2 m-auto py-3">
        <div className="grid grid-cols-post-layout">
          <div className="flex flex-col">
            <div className="flex flex-col justify-center items-center">
              <h1 className="text-xl font-medium">10</h1>
              <p className='text-xs -mt-1'>votes</p>
            </div>
            <div className="flex flex-col justify-center items-center mt-1.5">
              <h1 className="text-xl font-medium">5</h1>
              <p className='text-xs -mt-1'>answers</p>
            </div>
          </div>
          <div className="">
            <h1 className=" text-[18px] text-cta">How can I remove a specific item from an array?</h1>
            <p className='text-[13px] text-gray-700 font-normal'>How do I remove a specific value from an array? Something like: array.remove(value); // removes all elements with value I have to use core JavaScript. Frameworks are not allowed.</p>
            <div className="flex mt-2 justify-between">
              <div className="flex">
                <Tag tagName="react" />
                <Tag tagName="javascript" />
              </div>
              <UserQuestionDetail />
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}

export default PostPreview
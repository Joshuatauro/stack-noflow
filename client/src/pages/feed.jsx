import React from 'react'
import Navbar from '../components/Navbar'
import PostPreview from '../components/PostPreview'
const feed = () => {
  return (
    <div className="border-x-2 min-h-custom font-inter">
      <div className="px-4 m-auto py-5 border-b-2 ">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-normal">All Questions</h1>
          <button className="bg-cta px-5 py-1.5 text-2xl font-dongle text-white rounded-md">
            Ask Question
          </button>
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
      <PostPreview />
      <PostPreview />
      <PostPreview />
      <PostPreview />
      <PostPreview />
      <PostPreview />
      <PostPreview />
      <PostPreview />
    </div>
  )
}

export default feed
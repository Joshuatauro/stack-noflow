import React from 'react'

const UserQuestionDetail = ({url, username, background}) => {
  return (
    <div className={`${background ? "bg-cta bg-opacity-10 py-2 outline outline-1 outline-cta" : ""}`}>
      <div className="px-2">
        <div className="flex">
          <img className={`object-contain ${background ? 'h-[40px]' : "h-[35px]"}`} src={url} alt="" />
          <div className="text-xs ml-2">
            <p className="text-gray-600">asked 2 months ago by</p>
            <h1 className="text-cta">{username}</h1>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserQuestionDetail
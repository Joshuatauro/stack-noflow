import React from 'react'

const UserQuestionDetail = () => {
  return (
    <div className="">
      <div className="px-2">
        <div className="flex">
          <img className=" object-contain h-[35px]" src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d5?d=identicon" alt="" />
          <div className="text-xs ml-2">
            <p className="text-gray-600">asked 2 months ago by</p>
            <h1 className="text-cta">joshuatauro45</h1>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserQuestionDetail
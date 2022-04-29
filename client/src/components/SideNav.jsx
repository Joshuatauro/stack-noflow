import React from 'react'
import { GlobeIcon, TagIcon, UserIcon } from '@heroicons/react/outline'
const SideNav = () => {
  return (
    <div className="mt-5 font-inter sticky top-[85px] h-min ">
      <div className="">
        <ul className="sticky top-[100px]">
          <li className=" py-1.5 bg-gray-200 border-r-4 border-cta mb-2 ">
            <div className="flex items-center w-9/12 m-auto">
              <GlobeIcon className="h-6 mr-1 w-6" />
              <h1 className="text-sm">Questions</h1>
            </div>
          </li>
          <li className=" py-1.5 mb-2 ">
            <div className="flex items-center w-9/12 m-auto">
              <TagIcon className="h-6 mr-1 w-6" />
              <h1 className="text-sm">Tags</h1>
            </div>
          </li>
          <li className=" py-1.5 mb-2 ">
            <div className="flex items-center w-9/12 m-auto">
              <UserIcon className="h-6 mr-1 w-6" />
              <h1 className="text-sm">Users</h1>
            </div>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default SideNav
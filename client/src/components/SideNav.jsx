import React from 'react'
import { GlobeIcon, TagIcon, UserIcon } from '@heroicons/react/outline'
import { Link } from 'react-router-dom'
const SideNav = ({tab}) => {
  return (
    <div className="pt-5 sticky top-[85px] dark:bg-dark transition duration-300">
      <div className="">
        <ul className="sticky top-[100px]">
          <Link to="/feed">
            <div to="/feed" className={` py-1.5 mb-2 ${tab === 1 ? 'bg-gray-200 dark:bg-dark-cta-fade  border-r-4 border-cta' : ''} dark:text-white`}>
              <div className="flex items-center w-9/12 m-auto">
                <GlobeIcon className="h-6 mr-1 w-6" />
                <h1 className="text-sm">Questions</h1>
              </div>
            </div>
          </Link>
          <Link to="/tags">
            <div className={` py-1.5 mb-2 ${tab === 2 ? 'bg-gray-200 border-r-4 border-cta' : ''} dark:text-white`}>
              <div className="flex items-center w-9/12 m-auto">
                <TagIcon className="h-6 mr-1 w-6" />
                <h1 className="text-sm">Tags</h1>
              </div>
            </div>
          </Link>
          <Link to="/users">
            <div className={` py-1.5 mb-2 ${tab === 3 ? 'bg-gray-200 dark:bg-dark-cta-fade  border-r-4 border-cta dark:text-white' : 'dark:text-white'}`}>
              <div className="flex items-center w-9/12 m-auto">
                <UserIcon className="h-6 mr-1 w-6" />
                <h1 className="text-sm">Users</h1>
              </div>
            </div>
          </Link>
        </ul>
      </div>
    </div>
  )
}

export default SideNav
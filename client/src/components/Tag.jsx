import React from 'react'

const Tag = ({tagName, size}) => {
  return (
    <div className={`bg-cta-fade dark:bg-dark-cta-fade mb-1.5 w-min h-min ${size === "xl" ? 'text-sm mb-2.5 mr-2.5' : 'text-xs'} px-2 py-1 text-cta-fade-text dark:text-dark-cta-fade-text rounded-md mr-1 transition duration-300`}>{tagName}</div>
  )
}

export default Tag
import React from 'react'
import { Link } from 'react-router-dom'
const Tag = ({tagName, size}) => {
  return (
    <Link to={`/tags/${tagName}`} className={`bg-cta-fade dark:bg-dark-cta-fade mb-1.5 w-min h-min ${size === "xl" ? ' text-mobile-xs md:text-sm mb-2.5 mr-2.5' : 'text-[10px] md:text-xs'} px-2 py-1 text-cta-fade-text dark:text-dark-cta-fade-text rounded-md mr-1 transition duration-300`}>{tagName}</Link>
  )
}

export default Tag
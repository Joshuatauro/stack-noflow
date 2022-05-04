import React from 'react'
import AboutDev from './AboutDev'
import Tag from './Tag'

const TagsBar = () => {
  return (
    <div className="w-full sticky top-[65px] min-h-custom h-min">
      <div className="w-10/12 m-auto pt-5 flex flex-col justify-between min-h-custom pb-4">
        <div className="">
          <h1 className="font-normal mb-5 text-2xl">Some of our tags</h1>
          <div className="flex flex-wrap">
            <Tag tagName={"html"} size="xl"  />
            <Tag tagName="react" size="xl"  />
            <Tag tagName="javascript" size="xl"  />
            <Tag tagName="java" size="xl"  />
            <Tag tagName="c" size="xl"  />
            <Tag tagName="c++" size="xl"  />
            <Tag tagName="angluarjs" size="xl"  />
            <Tag tagName="vuejs" size="xl"  />
            <Tag tagName="css" size="xl"  />
            <Tag tagName="css" size="xl"  />
            <Tag tagName="css" size="xl"  />
            <Tag tagName="css" size="xl"  />
            <Tag tagName="react" size="xl"  />
            <Tag tagName="javascript" size="xl"  />
            <Tag tagName="java" size="xl"  />
            <Tag tagName="c" size="xl"  />
            <Tag tagName="c++" size="xl"  />
          </div>
        </div>
          <AboutDev />

      </div>
    </div>
  )
}

export default TagsBar
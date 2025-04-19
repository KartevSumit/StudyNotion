import React from 'react';
import { MdPeopleAlt } from 'react-icons/md';
import { ImTree } from 'react-icons/im';

function ExploreCard({ heading, description, level, lessionNumber }) {
  return (
    <div className="group w-[341px] h-[300px] relative">
      <div className="w-full h-full bg-yellow-200 absolute -bottom-2 -right-2 z-0 hidden group-hover:block"></div>
      <div className="w-full h-full bg-richblack-800 group-hover:bg-richblack-25 group-hover:text-richblack-800 z-10 relative">
        <div className="w-full h-[244px] p-4 flex flex-col gap-4">
          <h1 className="text-xl font-semibold">{heading}</h1>
          <p className="text-md text-richblack-400 group-hover:text-richblack-500">
            {description}
          </p>
        </div>
        <div className="w-full h-[56px] flex items-center justify-between px-4 border-dotted border-t-2 border-richblack-600 group-hover:text-blue-500">
          <div className="flex items-center gap-2">
            <MdPeopleAlt className="text-xl text-richblack-400 " />
            <h1 className="text-richblack-400 ">{level}</h1>
          </div>
          <div className="flex items-center gap-2">
            <ImTree className="text-xl text-richblack-400 " />
            <h1 className="text-richblack-400 ">{lessionNumber} Lessons</h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ExploreCard;

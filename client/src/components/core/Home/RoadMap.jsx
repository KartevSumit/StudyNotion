import React from 'react';

function RoadMap({ image, heading, description }) {
  return (
    <div className="w-full h-[10vh] flex items-center justify-start gap-8">
      <div className="w-[15%] h-full flex items-center justify-center">
        <div className="w-14 h-14 rounded-full shadow-lg shadow-richblack-300 flex items-center justify-center">
          <img src={image} alt="logo1" />
        </div>
      </div>
      <div className="w-[80%] h-full flex flex-col justify-center gap-2">
        <h1 className="text-xl font-semibold text-richblack-800">{heading}</h1>
        <p className="text-md text-richblack-600">{description}</p>
      </div>
    </div>
  );
}

export default RoadMap;

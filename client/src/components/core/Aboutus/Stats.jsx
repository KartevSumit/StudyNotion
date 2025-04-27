import React from 'react';

function Stats({ data, text }) {
  return (
    <div className="text-center flex flex-col gap-4">
      <h1 className="text-2xl lg:text-3xl text-richblack-5 font-bold">{data}</h1>
      <p className="text-md lg:text-xl text-richblack-500 font-semibold">{text}</p>
    </div>
  );
}

export default Stats;

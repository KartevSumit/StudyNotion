import React from 'react';

function Details({ heading, value }) {
  return (
    <div className="flex flex-col w-[50%]">
      <h1 className="text-richblack-300">{heading}</h1>
      <h1 className="lg:text-lg text-richblack-25">{value}</h1>
    </div>
  );
}

export default Details;

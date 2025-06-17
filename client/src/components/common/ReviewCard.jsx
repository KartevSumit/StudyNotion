import React from 'react';
import RatingStars from './RatingStars';

function ReviewCard({ data }) {
  return (
    <div className="w-[90%] flex flex-col gap-4 text-richblack-300 items-start justify-center bg-richblack-800 p-4 rounded-xl">
      <div className="w-full flex items-center gap-4">
        <div className="w-9 h-9 rounded-full overflow-hidden">
          <img src={data.user.image} alt="" className="w-full h-full" />
        </div>
        <div className="flex flex-col">
          <h1 className="font-semibold text-sm line-clamp-1">
            {data.user.firstName} {data.user.lastName}
          </h1>
          <p className="text-xs line-clamp-1">{data.user.email}</p>
        </div>
      </div>
      <p className="w-full text-sm line-clamp-3">{data.review}</p>
      <RatingStars StarNumber={data.rating} Star_Size={15} />
    </div>
  );
}

export default ReviewCard;

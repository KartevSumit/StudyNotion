import React from 'react';
import RatingStars from './RatingStars';
import { Link } from 'react-router-dom';

function Card({ data }) {
  //console.log(data);
  return (
    <Link
      to={`/course/${data._id}`}
      className="w-full flex flex-col relative gap-3 text-richblack-300"
    >
      <div className="w-full aspect-video rounded-lg overflow-hidden">
        <img src={data.thumbnail} alt="" className="w-full aspect-video" />
      </div>
      <h1 className="font-bold text-lg text-richblack-5">{data.courseName}</h1>
      <p className="text-base line-clamp-2">{data.courseDescription}</p>
      <RatingStars ratingAndReviews={data.ratingAndReviews} Star_Size={20} />
      <h1 className="font-semibold text-lg text-richblack-5">
        Rs.{data.price}
      </h1>
    </Link>
  );
}

export default Card;

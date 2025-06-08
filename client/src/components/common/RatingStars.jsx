import React, { useEffect, useState } from 'react';
import {
  TiStarFullOutline,
  TiStarHalfOutline,
  TiStarOutline,
} from 'react-icons/ti';

function RatingStars({ ratingAndReviews, Star_Size }) {
  const [rating, setRating] = useState(0);

  const [starCount, SetStarCount] = useState({
    full: 0,
    half: 0,
    empty: 0,
  });

  useEffect(() => {
    const CalculateRating = () => {
      let totalRating = 0;
      ratingAndReviews.forEach((review) => {
        totalRating += review.rating;
      });

      setRating(totalRating / ratingAndReviews.length);
    };

    CalculateRating();
    const wholeStars = Math.floor(rating) || 0;
    SetStarCount({
      full: wholeStars,
      half: Math.ceil(rating) === Math.round(rating) ? 1 : 0,
      empty:
        Math.ceil(rating) === Math.round(rating)
          ? 4 - wholeStars
          : 5 - wholeStars,
    });
  }, [ratingAndReviews, rating]);

  return (
    <div className="flex gap-4 items-center">
      <h1>{rating.toFixed(1)}</h1>
      <div className="flex gap-1 text-yellow-100">
        {[...new Array(starCount.full)].map((_, i) => {
          return <TiStarFullOutline key={i} size={Star_Size || 20} />;
        })}
        {[...new Array(starCount.half)].map((_, i) => {
          return <TiStarHalfOutline key={i} size={Star_Size || 20} />;
        })}
        {[...new Array(starCount.empty)].map((_, i) => {
          return <TiStarOutline key={i} size={Star_Size || 20} />;
        })}
      </div>
      <h1>({ratingAndReviews.length} Reviews)</h1>
    </div>
  );
}

export default RatingStars;

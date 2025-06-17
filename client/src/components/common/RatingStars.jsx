import React, { useEffect, useState } from 'react';
import {
  TiStarFullOutline,
  TiStarHalfOutline,
  TiStarOutline,
} from 'react-icons/ti';

function RatingStars({ ratingAndReviews, StarNumber, Star_Size }) {
  const [rating, setRating] = useState(0);
  const [starCount, SetStarCount] = useState({
    full: 0,
    half: 0,
    empty: 0,
  });

  useEffect(() => {
    if (StarNumber !== undefined && StarNumber !== null) {
      setRating(StarNumber);
    } else if (ratingAndReviews?.length) {
      const totalRating = ratingAndReviews.reduce(
        (sum, review) => sum + (review.rating || 0),
        0
      );
      setRating(totalRating / ratingAndReviews.length);
    }
  }, [ratingAndReviews, StarNumber]);

  useEffect(() => {
    if (typeof rating !== 'number' || isNaN(rating)) return;

    const full = Math.floor(rating);
    const decimal = rating - full;
    const half = decimal >= 0.25 && decimal <= 0.75 ? 1 : 0;
    const empty = 5 - full - half;

    SetStarCount({
      full,
      half,
      empty,
    });
  }, [rating]);

  return (
    <div className="flex gap-4 items-center">
      <h1>{!isNaN(rating) ? rating.toFixed(1) : '0.0'}</h1>
      <div className="flex gap-1 text-yellow-100">
        {[...Array(Math.max(0, starCount.full))].map((_, i) => (
          <TiStarFullOutline key={`full-${i}`} size={Star_Size || 20} />
        ))}
        {[...Array(Math.max(0, starCount.half))].map((_, i) => (
          <TiStarHalfOutline key={`half-${i}`} size={Star_Size || 20} />
        ))}
        {[...Array(Math.max(0, starCount.empty))].map((_, i) => (
          <TiStarOutline key={`empty-${i}`} size={Star_Size || 20} />
        ))}
      </div>
      {ratingAndReviews && <h1>({ratingAndReviews?.length || 0} Reviews)</h1>}
    </div>
  );
}

export default RatingStars;

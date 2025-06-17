import React, { useEffect, useState } from 'react';
import { getAllReviews } from '../../services/operations/CourseApi';
import { setLoading } from '../../slices/authSlice';
import { useDispatch } from 'react-redux';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/navigation';
import { Autoplay, Navigation } from 'swiper/modules';
import ReviewCard from './ReviewCard';

function ReviewSlider() {
  const [review, setReview] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setLoading(true));
    const fetchData = async () => {
      try {
        const response = await getAllReviews();
        if (response && JSON.stringify(response) !== JSON.stringify(review)) {
          setReview(response);
        }
      } catch (error) {
        setReview([]);
      }
    };
    fetchData();
    dispatch(setLoading(false));
  }, []);

  return (
    <div className="w-[80%]">
      <Swiper
        key={review.length} // ← force re‑init when reviews come in
        modules={[Autoplay]} // just the modules you need
        slidesPerView={4}
        spaceBetween={20}
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
          pauseOnMouseEnter: false, // optional: keeps it rolling if you hover
        }}
      >
        {review.map((data) => (
          <SwiperSlide key={data._id}>
            <ReviewCard data={data} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default ReviewSlider;

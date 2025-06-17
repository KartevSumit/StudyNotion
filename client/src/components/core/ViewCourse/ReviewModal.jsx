import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { addReview } from '../../../services/operations/CourseApi';
import IconButton from '../../common/IconButton';
import { TiStarFullOutline, TiStarOutline } from 'react-icons/ti';
import { toast } from 'react-hot-toast';

function ReviewModal({ setReviewModal }) {
  const { user } = useSelector((state) => state.profile);
  const { courseEntireData } = useSelector((state) => state.viewCourse);
  const { token } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const {
    setValue,
    getValues,
    formState: { errors },
    handleSubmit,
    register,
  } = useForm();
  const [stars, setStars] = useState(0);

  useEffect(() => {
    setValue('review', '');
    setValue('rating', 0);
  },[]);

  const onSubmit = async (data) => {
    setLoading(true);
    const result = await addReview(
      { courseId: courseEntireData._id.courseId, data },
      token
    );
    setLoading(false);
    if (result) {
      toast.success('Review added successfully');
      setReviewModal(false);
    }
  };

  const handleCancelClick = () => {
    setReviewModal(false);
  };

  const handleMouseEnter = (value) => {
    setStars(value);
  };
  const handleMouseLeave = () => {
    setStars(getValues('rating'));
  };

  return (
    <div className="backdrop-blur-md fixed inset-0 flex items-center justify-center bg-richblack-500/10 z-50">
      <div className="min-w-[40%] flex flex-col items-center justify-center gap-4 bg-richblack-900 p-9 rounded-2xl border-2 border-richblack-700">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full overflow-hidden">
            <img src={user.image} alt="" className="w-full h-full" />
          </div>
          <div className="flex flex-col text-richblack-100">
            <h1 className="font-semibold">
              {user.firstName} {user.lastName}
            </h1>
            <p>Posting Publicaly</p>
          </div>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4 w-full items-center"
        >
          <div className="flex items-center gap-2">
            <div className="text-yellow-100 text-2xl flex">
              <div
                value="1"
                className=""
                onMouseEnter={() => {
                  handleMouseEnter(1);
                }}
                onMouseLeave={() => {
                  handleMouseLeave();
                }}
                onClick={() => {
                  setValue('rating', 1);
                  setStars(1);
                }}
              >
                {stars >= 1 ? <TiStarFullOutline /> : <TiStarOutline />}
              </div>
              <div
                value="2"
                className=""
                onMouseEnter={() => {
                  handleMouseEnter(2);
                }}
                onMouseLeave={() => {
                  handleMouseLeave();
                }}
                onClick={() => {
                  setValue('rating', 2);
                  setStars(2);
                }}
              >
                {stars >= 2 ? <TiStarFullOutline /> : <TiStarOutline />}
              </div>
              <div
                value="3"
                className=""
                onMouseEnter={() => {
                  handleMouseEnter(3);
                }}
                onMouseLeave={() => {
                  handleMouseLeave();
                }}
                onClick={() => {
                  setValue('rating', 3);
                  setStars(3);
                }}
              >
                {stars >= 3 ? <TiStarFullOutline /> : <TiStarOutline />}
              </div>
              <div
                value="4"
                className=""
                onMouseEnter={() => {
                  handleMouseEnter(4);
                }}
                onMouseLeave={() => {
                  handleMouseLeave();
                }}
                onClick={() => {
                  setValue('rating', 4);
                  setStars(4);
                }}
              >
                {stars >= 4 ? <TiStarFullOutline /> : <TiStarOutline />}
              </div>
              <div
                value="5"
                className=""
                onMouseEnter={() => {
                  handleMouseEnter(5);
                }}
                onMouseLeave={() => {
                  handleMouseLeave();
                }}
                onClick={() => {
                  setValue('rating', 5);
                  setStars(5);
                }}
              >
                {stars >= 5 ? <TiStarFullOutline /> : <TiStarOutline />}
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2 w-full">
            <label htmlFor="review" className="text-richblack-5">
              Review
            </label>
            <textarea
              {...register('review', { required: true })}
              name="review"
              id="review"
              rows="4"
              className="bg-richblack-700 text-richblack-5 px-2 py-1 rounded-md"
              placeholder="Write your review here..."
              required
            ></textarea>
          </div>
          <div className="flex items-center justify-end gap-4 w-full">
            <IconButton
              text={'Cancel'}
              type="button"
              onClick={handleCancelClick}
              customClass={'bg-richblack-700 text-richblack-5'}
              disabled={loading}
            />
            <IconButton
              type="button"
              text={'Submit'}
              disabled={loading}
              onClick={handleSubmit(onSubmit)}
              customClass={'bg-yellow-25 text-richblack-900'}
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default ReviewModal;

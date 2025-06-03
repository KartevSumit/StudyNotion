import React, { useEffect } from 'react';
import { get, useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import IconButton from '../../../../common/IconButton';
import { setCourse } from '../../../../../slices/courseSlice';
import { COURSE_STATUS } from '../../../../../utils/constants';
import { setStep, setLoading } from '../../../../../slices/courseSlice';
import { publishCourse } from '../../../../../services/operations/CourseApi';

export const PublishForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
    setValue,
  } = useForm();

  useEffect(() => {
    if (course?.status === COURSE_STATUS.PUBLISHED) {
      setValue('publish', true);
    }
  }, [reset]);

  const { loading } = useSelector((state) => state.course);
  const { course } = useSelector((state) => state.course);
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);

  const GoToCourse = () => {
    dispatch(setCourse(null));
    dispatch(setStep(1));
    localStorage.setItem('step', 1);
    localStorage.removeItem('course');
  };

  const handleCoursePublish = async () => {
    if (
      (course?.status === COURSE_STATUS.PUBLISHED &&
        getValues('publish') === true) ||
      (course?.status === COURSE_STATUS.DRAFT && getValues('publish') === false)
    ) {
      GoToCourse();
      return;
    }
    const data = {
      courseId: course?._id,
      status: getValues('publish')
        ? COURSE_STATUS.PUBLISHED
        : COURSE_STATUS.DRAFT,
    };

    dispatch(setLoading(true));
    const result = await dispatch(publishCourse(data, token));

    if (result) {
      GoToCourse();
    }
    dispatch(setLoading(false));
  };

  const onSubmit = (data) => {
    handleCoursePublish();
  };

  const goBack = () => {
    dispatch(setStep(2));
    localStorage.setItem('step', 2);
  };

  return (
    <div className="w-full p-8 flex flex-col bg-richblack-800 rounded-xl">
      <h1 className="text-2xl font-semibold text-richblack-5">
        Publish Your Course
      </h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-4 flex flex-col gap-4"
      >
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            id="publish"
            {...register('publish')}
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
          <span className="text-lg text-richblack-300 font-semibold">
            Make this course public
          </span>
        </label>
        <div className="w-full items-center justify-end flex gap-6">
          <IconButton
            text={'Back'}
            onClick={goBack}
            customClass={'bg-richblack-700 text-richblack-5'}
          />
          <IconButton
            text={'Save and Publish'}
            type="button"
            onClick={handleSubmit(onSubmit)}
            customClass={'bg-yellow-25 text-richblack-900'}
          />
        </div>
      </form>
    </div>
  );
};

export default PublishForm;

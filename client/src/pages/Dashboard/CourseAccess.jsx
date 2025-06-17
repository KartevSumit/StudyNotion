import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getCourseDetails } from '../../services/operations/CourseApi';
import SideBar from '../../components/core/ViewCourse/SideBar';
import { Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from '../../components/common/Spinner';
import {
  setCompletedLectures,
  setCourseEntireData,
  setTotalNoOfLectures,
  setLoading,
  setCourseSectionData,
} from '../../slices/viewCourseSlice';
import ReviewModal from '../../components/core/ViewCourse/ReviewModal';

function CourseAccess() {
  const courseId = useParams().courseId;
  const loading = useSelector((state) => state.viewCourse.loading);
  console.log('courseId', courseId);
  const user = useSelector((state) => state.profile.user);
  const dispatch = useDispatch();
  const { courseEntireData } = useSelector((state) => state.viewCourse);
  const [reviewModal, setReviewModal] = useState(false);

  useEffect(() => {
    dispatch(setLoading(true));
    (async () => {
      const result = await getCourseDetails({ courseId });
      dispatch(setCourseEntireData(result));
      dispatch(setCourseSectionData(result.courseContent[0]?.subSections[0]));
    })();

    dispatch(setLoading(false));
  }, [courseId, dispatch]);

  useEffect(() => {
    dispatch(setLoading(true));
    if (!courseEntireData.courseContent) return;

    let totalVideos = 0;
    courseEntireData.courseContent.forEach((sec) => {
      totalVideos += sec.subSections.length;
    });
    dispatch(setTotalNoOfLectures(totalVideos));

    const progressEntry = user.courseProgress.find(
      (c) => c.courseId._id === courseId
    );
    dispatch(setCompletedLectures(progressEntry?.completedVideos.length || 0));

    dispatch(setLoading(false));
  }, [courseEntireData, courseId, dispatch, user.courseProgress]);

  return loading ? (
    <Spinner />
  ) : (
    <div className="w-full h-[93vh] flex relative lg:flex-row flex-col">
      <SideBar className="hidden lg:block" setReviewModal={setReviewModal} />
      <div className="relative flex-1 overflow-y-scroll">
        <Outlet />
      </div>
      {reviewModal && <ReviewModal setReviewModal={setReviewModal} />}
    </div>
  );
}

export default CourseAccess;

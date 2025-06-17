import React, { useEffect, useState } from 'react';
import Path from '../../components/common/Path';
import { useSelector, useDispatch } from 'react-redux';
import { SlOptionsVertical } from 'react-icons/sl';
import { Link } from 'react-router-dom';
import { addTotalVideos } from '../../slices/profileSlice';

function EnrolledCourse() {
  const [mode, setMode] = useState('all');
  const [enrolledCourses, setEnrolledCourses] = useState(null);
  const { user } = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  useEffect(() => {
    setEnrolledCourses(user.courseProgress);
    console.log(enrolledCourses);
  });
  return (
    <div className="w-full min-h-[92vh] p-20 flex flex-col gap-6">
      <div>
        <Path />
        <h1 className="text-3xl font-semibold text-richblack-5">
          Enrolled Courses
        </h1>
      </div>
      <div className="w-full flex flex-col transition-all duration-300 ease-in">
        <div className="flex bg-richblack-700 p-1 rounded-full w-fit gap-3 text-richblack-25">
          <button
            className={`w-16 p-3 px-4 rounded-full ${
              mode === 'all' && 'bg-richblack-900'
            }`}
            onClick={() => setMode('all')}
          >
            All
          </button>
          <button
            className={`p-1 px-4 rounded-full ${
              mode === 'pending' && 'bg-richblack-900'
            }`}
            onClick={() => setMode('pending')}
          >
            Pending
          </button>
          <button
            className={`p-1 px-4 rounded-full ${
              mode === 'complete' && 'bg-richblack-900'
            }`}
            onClick={() => setMode('complete')}
          >
            Complete
          </button>
        </div>
      </div>
      <div>
        <div className="w-full flex items-center bg-richblack-700 p-4 text-richblack-50 gap-7">
          <h1 className="w-[55%]">Course Name</h1>
          <h1 className="w-[15%] text-center">Durations</h1>
          <h1 className="w-[20%] text-center">Progress</h1>
        </div>
        <div className="w-full flex flex-col">
          {enrolledCourses?.map((courseProgress) => {
            let totalVideo = 0;
            courseProgress.courseId?.courseContent.forEach((section) => {
              totalVideo += section.subSections.length;
            });

            dispatch(
              addTotalVideos({
                courseId: courseProgress.courseId?._id,
                totalVideo: totalVideo,
              })
            );
            
            console.log('user', user);

            if (
              mode === 'all' ||
              (mode === 'pending' &&
                courseProgress.completedVideos.length !== totalVideo) ||
              (mode === 'complete' &&
                courseProgress.completedVideos.length === totalVideo)
            ) {
              return (
                <Link
                  to={`/view-course/${courseProgress.courseId?._id}/section/${courseProgress.courseId?.courseContent[0]?._id}/sub-section/${courseProgress.courseId?.courseContent[0]?.subSections[0]}`}
                  key={courseProgress.courseId?._id}
                  className="w-full flex items-center p-4 text-richblack-50 gap-7 border border-t-0 border-richblack-600"
                >
                  <div className="w-[55%] flex items-center gap-3 h-14 p-4">
                    <img
                      src={courseProgress.courseId?.thumbnail}
                      alt=""
                      className="h-12"
                    />
                    <div className="flex flex-col text-richblack-50">
                      <h1>{courseProgress.courseId?.courseName}</h1>
                      <h1 className="text-sm line-clamp-1">
                        {courseProgress.courseId?.courseDescription}
                      </h1>
                    </div>
                  </div>
                  <div className="w-[15%] flex items-center justify-center">
                    <h1>{courseProgress.courseId?.timeDuration}</h1>
                  </div>
                  <div className="w-[20%] flex flex-col items-center justify-center gap-4">
                    <h1>
                      Progress:{' '}
                      {(courseProgress.completedVideos.length * 100) /
                        totalVideo}
                      %
                    </h1>
                    <div className="w-[90%] h-2 bg-richblack-600 rounded-full">
                      <div
                        style={{
                          width: `${
                            totalVideo
                              ? (courseProgress.completedVideos.length * 100) /
                                totalVideo
                              : 0
                          }%`,
                        }}
                        className={`h-full bg-gradient-to-r from-blue-50 via-blue-100 to-caribbeangreen-100 rounded-full`}
                      ></div>
                    </div>
                  </div>
                  <button>
                    <SlOptionsVertical />
                  </button>
                  <div className={``}></div>
                </Link>
              );
            }
          })}
        </div>
      </div>
    </div>
  );
}

export default EnrolledCourse;

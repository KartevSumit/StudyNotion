import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import IconButton from '../../common/IconButton';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { ImCheckboxUnchecked } from 'react-icons/im';
import { ImCheckboxChecked } from 'react-icons/im';
import { Link } from 'react-router-dom';
import { PiMonitorPlayFill } from 'react-icons/pi';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setCourseSectionData } from '../../../slices/viewCourseSlice';
import { FaPlay } from 'react-icons/fa';

function SideBar({ setReviewModal }) {
  const {
    courseEntireData,
    courseSectionData,
    totalNoOfLectures,
    completedLectures,
  } = useSelector((state) => state.viewCourse);

  const { user } = useSelector((state) => state.profile);
  const [CourseProgress, setCourseProgress] = useState(null);
  useEffect(() => {
    const progress = user.courseProgress.find(
      (c) =>
        JSON.stringify(c.courseId._id) === JSON.stringify(courseEntireData._id)
    );
    setCourseProgress(progress);
    console.log('progress', progress);
  }, [user, courseEntireData]);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <div className="min-w-[15%] h-full flex-col items-center bg-richblack-800 gap-4">
      <div className="w-full flex flex-row justify-between px-2 pt-6 pb-1">
        <IconButton
          text={'Back'}
          children={<IoMdArrowRoundBack />}
          onClick={() => {
            navigate('/dashboard/enrolled-courses');
          }}
          customClass={
            'flex flex-row-reverse items-center gap-2 text-richblack-5 shadow-none p-0'
          }
          type="button"
        ></IconButton>
      </div>
      <div className="w-[80%] flex flex-col text-richblack-100 border-b border-richblack-600 pb-4 mx-6">
        <div className="flex items-baseline gap-1">
          <h1 className="text-2xl font-semibold text-richblack-5 capitalize">
            {courseEntireData.courseName}
          </h1>
          <p
            className={`${
              completedLectures === totalNoOfLectures &&
              'text-caribbeangreen-100'
            }`}
          >
            {completedLectures}/{totalNoOfLectures}
          </p>
        </div>
        {completedLectures === totalNoOfLectures && (
          <IconButton
            text={'Add Review'}
            onClick={() => {
              setReviewModal(true);
            }}
            customClass={
              'flex flex-row-reverse items-center gap-2 bg-yellow-25 text-richblack-900 shadow-none mt-2'
            }
            type="button"
          ></IconButton>
        )}
      </div>
      <div className="w-full flex flex-col gap-2 mt-6">
        {courseEntireData.courseContent?.map((section, sectionIndex) => (
          <details key={sectionIndex} className="" open>
            <summary className="flex items-center justify-between p-3 px-4 bg-richblack-700 text-richblack-100 border border-richblack-600">
              <div className="flex items-center gap-4 text-richblack-5">
                <h1>{section.sectionName}</h1>
              </div>
              <h1 className="w-16">
                {parseInt(section.timeDuration.split(':')[0]) * 60 +
                  parseInt(section.timeDuration.split(':')[1])}{' '}
                min
              </h1>
            </summary>

            <div className="flex flex-col">
              {section.subSections.map((subSection, subIndex) => (
                <button
                  key={subIndex}
                  onClick={() => {
                    dispatch(setCourseSectionData(subSection));
                    console.log('subSection', courseSectionData);
                    navigate(
                      `/view-course/${courseEntireData._id}/section/${section._id}/sub-section/${subSection._id}`
                    );
                  }}
                  className="w-full px-6 py-2 flex items-center justify-between text-richblack-100"
                >
                  <div
                    className={`flex items-center gap-4 ${
                      courseSectionData?._id === subSection._id
                        ? 'text-blue-100'
                        : CourseProgress?.completedVideos.includes(
                            subSection._id
                          )
                        ? 'text-richblack-300'
                        : 'text-richblack-5'
                    }`}
                  >
                    {courseSectionData?._id === subSection._id ? (
                      <FaPlay />
                    ) : CourseProgress?.completedVideos.includes(
                        subSection._id
                      ) ? (
                      <ImCheckboxChecked />
                    ) : (
                      <ImCheckboxUnchecked />
                    )}
                    <h1 className="capitalize line-clamp-1">
                      {subSection.title}
                    </h1>
                    <PiMonitorPlayFill size={24} />
                  </div>
                </button>
              ))}
            </div>
          </details>
        ))}
      </div>
    </div>
  );
}

export default SideBar;

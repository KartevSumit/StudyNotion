import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ReactPlayer from 'react-player';
import { addCompletedLecture } from '../../../services/operations/CourseProgress';

function VideoDetail() {
  const { courseSectionData, courseEntireData } = useSelector(
    (state) => state.viewCourse
  );
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  const handleEnd = () => {
    dispatch(
      addCompletedLecture({
        subsectionId: courseSectionData._id,
        courseId: courseEntireData._id,
        token: token,
      })
    );
  };

  console.log('courseSectionData', courseSectionData);
  return (
    <div className="w-full min-h-full flex justify-center">
      <div className="w-10/12 min-h-full mt-12 flex flex-col gap-4">
        <div className="w-full h-auto aspect-video">
          <ReactPlayer
            url={courseSectionData?.videoUrl}
            controls
            width="100%"
            height="100%"
            onEnded={handleEnd}
          />
        </div>
        <h1 className="text-2xl font-semibold text-richblack-5 ">
          {courseSectionData?.title}
        </h1>
        <p className="text-lg text-richblack-400 ">
          {courseSectionData?.description}
        </p>
      </div>
    </div>
  );
}

export default VideoDetail;

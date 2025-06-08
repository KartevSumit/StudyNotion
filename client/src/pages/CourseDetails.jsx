import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getCourseDetails } from '../services/operations/CourseApi';
import Path from '../components/common/Path';
import Footer from '../components/common/Footer';
import RatingStars from '../components/common/RatingStars';

function CourseDetails() {
  const courseId = useParams().courseId;
  const [courseData, setCourseData] = useState(null);
  console.log(courseId);
  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const response = await getCourseDetails({ courseId });
        setCourseData(response);
        console.log('Course details:', response);
      } catch (error) {
        console.log('Error fetching course details:', error);
      }
    };
    fetchCourseDetails();
  }, [courseId]);

  if (!courseData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen w-full flex flex-col gap-6 items-center text-richblack-300">
      <div className="w-full flex gap-12">
        <div className="w-[75%] bg-richblack-800 p-14 flex flex-col gap-3">
          <Path name={courseData.courseName}></Path>
          <h1 className="text-3xl font-semibold text-richblack-5">
            {courseData.courseName}
          </h1>
          <p>{courseData.courseDescription}</p>
          <RatingStars
            ratingAndReviews={courseData.ratingAndReviews}
            Star_Size={20}
          />
          <h1>
            Created by {courseData.instructor.firstName}{' '}
            {courseData.instructor.lastName}
          </h1>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default CourseDetails;

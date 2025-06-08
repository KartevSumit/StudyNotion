import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getCourseDetails } from '../services/operations/CourseApi';

function CourseDetails() {
  const courseId = useParams().courseId;
  console.log(courseId);
  useEffect(()=>{
    const fetchCourseDetails = async () => {
      try {
        const response = await getCourseDetails({ courseId });
        console.log('Course details:', response);
      } catch (error) {
        console.log('Error fetching course details:', error);
      }
    };
    fetchCourseDetails();
  },[courseId]);

  return <div></div>;
}

export default CourseDetails;

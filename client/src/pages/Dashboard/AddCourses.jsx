import React from 'react';
import RenderSteps from '../../components/core/Dashboard/AddCourses/RenderSteps';

function AddCourses() {
  return (
    <div className="w-full h-[92vh] flex overflow-y-auto">
      <div className="w-[60%] h-full p-8">
        <h1 className="text-3xl font-semibold text-richblack-5">Add Courses</h1>
        <div>
          <RenderSteps></RenderSteps>
        </div>
      </div>
      <div className="w-[30%] h-fit p-8 bg-richblack-800">
        <h1 className="text-2xl font-semibold text-richblack-5">
          ⚡Course Upload Tips
        </h1>
        <ul className=" text-richblack-5 font-medium">
          <li>Set the Course Price option or make it free.</li>
          <li>Standard size for the course thumbnail is 1024x576.</li>
          <li>Video section controls the course overview video.</li>
          <li>Course Builder is where you create & organize a course.</li>
          <li>
            Add Topics in the Course Builder section to create lessons, quizzes,
            and assignments.
          </li>
          <li>
            Information from the Additional Data section shows up on the course
            single page.
          </li>
          <li>Make Announcements to notify any important</li>
          <li>Notes to all enrolled students at once.</li>
        </ul>
      </div>
    </div>
  );
}

export default AddCourses;

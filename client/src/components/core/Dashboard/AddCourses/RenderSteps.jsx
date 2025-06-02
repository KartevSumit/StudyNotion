import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { TiTick } from 'react-icons/ti';
import CourseInformationForm from './CourseInformation/CourseInformationForm';
import CourseBuildingForm from './CourseBuilder/CourseBuildingForm';
import PublishForm from './PublishForm';

function RenderSteps() {
  const { course,step } = useSelector((state) => state.course);

  useEffect(() => {
    console.log('step', step);
    console.log('course', course);
  }, []);

  const steps = [
    {
      id: 1,
      title: 'Course Information',
    },
    {
      id: 2,
      title: 'Course Building',
    },
    {
      id: 3,
      title: 'Publish',
    },
  ];

  return (
    <div className="w-full min-h-full flex flex-col items-center p-8">
      <div className="w-full flex items-center justify-center gap-2">
        {steps.map((item) => (
          <div className="h-fit flex items-center gap-2" key={item.id}>
            <div className="flex flex-col items-center relative">
              <div
                className={`w-11 h-11 text-lg rounded-full font-semibold flex items-center justify-center ${
                  step == item.id
                    ? 'border-2 border-yellow-25 text-yellow-25'
                    : step > item.id
                    ? 'bg-yellow-25 text-richblack-900 '
                    : 'bg-richblack-700 text-richblack-300 border-2 border-richblack-600'
                }`}
              >
                {step > item.id ? <TiTick className="text-xl" /> : item.id}
              </div>
              <h1
                className={`absolute mt-2 top-10 w-[12vw] text-center ${
                  step == item.id ? 'text-richblack-5' : ' text-richblack-300'
                }`}
              >
                {item.title}
              </h1>
            </div>
            {item.id != 3 && (
              <div
                className={`text-richblack-300 text-3xl ${
                  step > item.id && 'text-yellow-25'
                }`}
              >
                -----------
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="w-full mt-14 min-h-fit p-12">
        {step == 1 && <CourseInformationForm />}
        {step == 2 && <CourseBuildingForm />}
        {step == 3 && <PublishForm />}
      </div>
    </div>
  );
}

export default RenderSteps;

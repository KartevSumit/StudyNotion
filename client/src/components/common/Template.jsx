import React, { useState } from 'react';
import frame from '../../assets/Images/frame.png';
import auth from '../../assets/Images/AuthInstructor.png';
import { cloneElement } from 'react';

function Template({ heading, content1, content2, Form, photo }) {
  const [Role, setRole] = useState('Student');

  const head = (Role === 'Student' && heading) || 'Welcome Back!';
  const content = (Role === 'Student' && content1) || 'Discover your passion,';
  const content2text = (Role === 'Student' && content2) || 'Be Unstoppable';
  const image = (Role === 'Student' && photo) || auth;

  const handleClick = (e) => {
    setRole(e.target.value);
  };

  return (
    <div>
      <div className="w-11/12 h-screen flex items-center justify-center gap-48 bg-richblack-900">
        <div className="flex flex-col gap-8 w-[508px] p-6">
          <h1 className="text-4xl text-richblack-5 font-semibold">{head}</h1>
          <div>
            <p className="text-richblack-100 text-xl">
              {content}
              <span className="text-blue-100 font-edu-sa text-xl">
                {content2text}
              </span>
            </p>
          </div>
          <div className="w-[50%] h-12 flex items-center justify-around rounded-full bg-richblack-800 text-lg text-richblack-200  border-richblack-800 border-2">
            <button
              value="Student"
              className={`h-[95%] w-[50%] rounded-full  ${
                Role === 'Student' ? 'bg-richblack-900' : ''
              }`}
              onClick={handleClick}
            >
              Student
            </button>
            <button
              value="Instructor"
              className={`h-[95%] w-[50%] rounded-full ${
                Role === 'Instructor' ? 'bg-richblack-900' : ''
              }`}
              onClick={handleClick}
            >
              Instructor
            </button>
          </div>

          {Form && cloneElement(Form, { role: Role })}
        </div>
        <div className="relative w-[558px] h-[504px]">
          <img
            src={frame}
            alt=""
            className="h-full w-full object-contain absolute -bottom-4 -right-4 z-0"
          />
          <img
            src={image}
            alt="login"
            className="relative h-full w-full object-cover z-10"
          />
        </div>
      </div>
    </div>
  );
}

export default Template;

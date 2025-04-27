import React from 'react';
import Button from '../../common/Button';

const LearningGridArray = [
  {
    order: -1,
    heading: 'World-Class Learning for',
    highlightText: 'Anyone, Anywhere',
    description:
      'Studynotion partners with more than 275+ leading universities and companies to bring flexible, affordable, job-relevant online learning to individuals and organizations worldwide.',
    BtnText: 'Learn More',
    BtnLink: '/',
  },
  {
    order: 1,
    heading: 'Curriculum Based on Industry Needs',
    description:
      'Save time and money! The Belajar curriculum is made to be easier to understand and in line with industry needs.',
  },
  {
    order: 2,
    heading: 'Our Learning Methods',
    description:
      'Studynotion partners with more than 275+ leading universities and companies to bring',
  },
  {
    order: 3,
    heading: 'Certification',
    description:
      'Studynotion partners with more than 275+ leading universities and companies to bring',
  },
  {
    order: 4,
    heading: `Rating "Auto-grading"`,
    description:
      'Studynotion partners with more than 275+ leading universities and companies to bring',
  },
  {
    order: 5,
    heading: 'Ready to Work',
    description:
      'Studynotion partners with more than 275+ leading universities and companies to bring',
  },
];

function LearningData() {
  return (
    <div className="grid mx-auto grid-cols-1 lg:grid-cols-4">
      {LearningGridArray.map((item, index) => {
        return (
          <div
            className={`
              p-8
            ${item.order % 2 === 0 ? 'bg-richblack-700' : 'bg-richblack-800'}
            ${
              item.order === -1 &&
              'h-[95%] py-2 p-0 lg:p-8 lg:h-0 lg:col-span-2 bg-richblack-900'
            } 
            ${item.order === 3 && 'lg:col-start-2'}
             flex flex-col gap-4 h-72`}
            key={index}
          >
            <h1
              className={`${
                item.order === -1 ? 'text-2xl lg:text-4xl' : 'text-lg'
              } font-semibold text-richblack-5`}
            >
              <span>{item.heading} </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-br from-[#5433FF] via-[#20BDFF] to-[#A5FECB]">
                {item.highlightText}
              </span>
            </h1>
            <p
              className={`&{item.order === -1 ? ' text-sm' : 'text-sm' } text-richblack-300`}
            >
              {item.description}
            </p>
            <div className="mt-3">
              {item.order === -1 && (
                <Button text={item.BtnText} linkto={item.BtnLink} flag={true} />
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default LearningData;

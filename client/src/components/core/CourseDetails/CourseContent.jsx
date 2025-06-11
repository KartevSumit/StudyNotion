import React, { useMemo } from 'react';
import { FaChevronDown } from 'react-icons/fa';
import { MdMonitor } from 'react-icons/md';

function CourseContent({ courseContent }) {
  const sectionsWithDuration = useMemo(() => {
    return courseContent.map((section, sectionIndex) => {
      let totalSeconds = 0;
      section.subSections.forEach((sub) => {
        const [hStr, mStr, sStr] = sub.timeDuration.split(':');
        const hours = parseInt(hStr, 10);
        const minutes = parseInt(mStr, 10);
        const seconds = parseInt(sStr, 10);
        totalSeconds += hours * 3600 + minutes * 60 + seconds;
      });
      const totalMinutes = Math.floor(totalSeconds / 60);
      
      return {
        ...section,
        totalMinutes,
      };
    });
  }, [courseContent]);

  return (
    <div className="w-full flex flex-col gap-2 border border-richblack-600">
      {sectionsWithDuration.map((section, sectionIndex) => (
        <details key={sectionIndex} className="">
          <summary className="flex items-center justify-between p-4 px-8 bg-richblack-700 text-richblack-100 border border-richblack-600">
            <div className="flex items-center gap-4 text-richblack-25">
              <FaChevronDown />
              <h1 className="font-semibold">{section.sectionName}</h1>
            </div>
            <div className="flex items-center gap-4">
              <h1 className="w-20 text-yellow-200">
                {section.subSections.length} Lectures
              </h1>
              <h1 className="w-16">{section.totalMinutes} min</h1>
            </div>
          </summary>

          <div className="p-4 flex flex-col gap-2">
            {section.subSections.map((subSection, subIndex) => {
              const [h, m, s] = subSection.timeDuration.split(':');
              return (
                <details key={subIndex}>
                  <summary className="flex items-center justify-between px-4 p-2 text-richblack-100">
                    <div className="flex items-center gap-4 text-richblack-25">
                      <MdMonitor size={20} />
                      <h1 className="font-semibold capitalize">
                        {subSection.title}
                      </h1>
                      <FaChevronDown size={16} />
                    </div>
                    <div className="flex items-center gap-4">
                      <h1 className="w-16">
                        {h}:{m}
                      </h1>
                    </div>
                  </summary>
                  <div className="px-4 p-1">
                    <p className="px-4 text-richblack-25">
                      {subSection.description}
                    </p>
                  </div>
                </details>
              );
            })}
          </div>
        </details>
      ))}
    </div>
  );
}

export default CourseContent;

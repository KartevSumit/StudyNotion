import React, { useState, useRef, useLayoutEffect } from 'react';
import { HomePageExplore } from '../../data/homepage-explore';
import ExploreCard from './ExploreCard';

const TABS = [
  'Free',
  'New to Coding',
  'Most Popular',
  'Skills Paths',
  'Career Paths',
];

function ExploreMore() {
  const [Category, setCategory] = useState('Free');
  const tabIndex = TABS.indexOf(Category);

  // Measure the active button for sliding highlight
  const containerRef = useRef(null);
  const [highlightStyle, setHighlightStyle] = useState({ width: 0, left: 0 });

  useLayoutEffect(() => {
    const buttons = containerRef.current?.querySelectorAll('button');
    if (!buttons) return;
    const btn = buttons[tabIndex];
    setHighlightStyle({ left: btn.offsetLeft, width: btn.clientWidth });
  }, [tabIndex]);

  const handleClick = (e) => setCategory(e.target.value);

  return (
    <div className="w-11/12 min-h-[60%] flex flex-col items-center justify-center gap-12 ">
      {/* Mobile Dropdown */}
      <div className="block lg:hidden w-[256px] mb-4">
        <select
          value={Category}
          onChange={(e) => handleClick(e)}
          className="w-full px-4 py-2 bg-richblack-800 text-richblack-200 border-2 border-richblack-700 rounded-full"
        >
          {TABS.map((tab) => (
            <option key={tab} value={tab}>
              {tab}
            </option>
          ))}
        </select>
      </div>

      {/* Desktop Tabs */}
      <div
        ref={containerRef}
        className="relative hidden lg:flex bg-richblack-800 rounded-full py-2 border-richblack-700 border-2 flex-wrap"
      >
        <div
          className="absolute h-10 sm:h-12 lg:h-full top-0 left-0 bg-richblack-900 rounded-full transition-all duration-300"
          style={{
            width: highlightStyle.width,
            transform: `translateX(${highlightStyle.left}px)`,
          }}
        />
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={handleClick}
            value={tab}
            className="relative z-10 px-4 sm:px-6 md:px-8 py-1 sm:py-2 text-base sm:text-lg text-richblack-200"
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Slider */}
      <div className="relative w-full overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${tabIndex * 100}%)` }}
        >
          {TABS.map((tab, idx) => {
            const courses =
              HomePageExplore.find((c) => c.tag === tab)?.courses || [];
            return (
              <div
                key={tab}
                className="w-full flex-shrink-0 flex flex-col lg:flex-row items-center justify-center gap-8 text-richblack-50 py-8"
              >
                {courses.map((course, i) => (
                  <ExploreCard
                    key={i}
                    heading={course.heading}
                    description={course.description}
                    level={course.level}
                    lessionNumber={course.lessionNumber}
                  />
                ))}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default ExploreMore;

import React from 'react';
import HighLightText from '../components/core/Home/HighLightText';
import img1 from '../assets/Images/aboutus1.webp';
import img2 from '../assets/Images/aboutus2.webp';
import img3 from '../assets/Images/aboutus3.webp';
import founding from '../assets/Images/FoundingStory.png';
import Stats from '../components/core/Aboutus/Stats';
import Footer from '../components/common/Footer';
import LearningData from '../components/core/Aboutus/LearningData';
import GetTouch from '../components/core/Aboutus/GetTouch';

function Aboutus() {
  return (
    <div>
      {/* 1st section */}
      <div className="w-full min-h-[92vh] flex flex-col items-center">
        <div className="w-full bg-richblack-800 h-[590px] relative flex flex-col items-center">
          <div className="w-full flex flex-col items-center justify-center md:gap-12 lg:gap-16 gap-8">
            <div className="w-11/12 mt-8 lg:mt-12 lg:w-5/12 h-full flex flex-col gap-4 items-center text-center">
              <h1 className="text-md text-richblack-200 font-semibold mb-4">
                About us
              </h1>
              <div>
                <h1 className="text-3xl font-semibold text-richblack-5 lg:text-4xl">
                  Driving Innovation in Online Education for a
                </h1>
                <HighLightText text={'Brighter Future'} />
              </div>
              <p className="text-md text-richblack-300 font-medium">
                Studynotion is at the forefront of driving innovation in online
                education. We're passionate about creating a brighter future by
                offering cutting-edge courses, leveraging emerging technologies,
                and nurturing a vibrant learning community.
              </p>
            </div>
            <div className="w-11/12 flex flex-col lg:flex-row items-center justify-center gap-6 relative">
              <div className="w-[10%] h-[50%] bg-gradient-to-br from-[#E65C00] to-[#F9D423] blur-3xl absolute -z-0 top-4 left-1/2 -translate-x-1/2"></div>
              <img
                src={img1}
                alt=""
                className="h-[311px] relative z-10 lg:block hidden"
              />
              <img src={img2} alt="" className="lg:h-[311px] relative z-10" />
              <img
                src={img3}
                alt=""
                className="h-[311px] relative z-10 lg:block hidden"
              />
            </div>
            <div className="w-[92%] lg:w-[70%] text-center flex flex-col gap-4">
              <p className="text-2xl font-semibold text-richblack-100 lg:text-4xl relative lg:block hidden">
                <span className="text-richblack-600 relative -top-3 left-0">
                  ❝
                </span>
                We are passionate about revolutionizing the way we learn. Our
              </p>
              <p className="text-2xl font-semibold text-richblack-100 lg:text-4xl relative lg:block hidden">
                innovative platform <HighLightText text="combines technology" />
                ,
                <span className="bg-gradient-to-r from-[#FF512F] to-[#F09819] bg-clip-text text-transparent leading-[inherit]">
                  expertise
                </span>
                , and community to
              </p>
              <p className="text-2xl font-semibold text-richblack-100 lg:text-4xl relative lg:block hidden">
                create an{' '}
                <span className="bg-gradient-to-r from-[#E65C00] to-[#F9D423] bg-clip-text text-transparent">
                  unparalleled educational experience.
                </span>
                <span className="text-richblack-600 bottom-3 right-17 absolute leading-[inherit]">
                  ❞
                </span>
              </p>
              <p className="text-2xl md:text-3xl font-semibold text-richblack-100 lg:text-4xl relative lg:hidden">
                <span className="text-richblack-600 relative -top-3 left-0">
                  ❝
                </span>
                We are passionate about revolutionizing the way we learn. Our
                innovative platform{' '}
                <span className="bg-gradient-to-r from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] bg-clip-text text-transparent">
                  conbines technology
                </span>
                ,
                <span className="bg-gradient-to-r from-[#FF512F] to-[#F09819] bg-clip-text text-transparent leading-[inherit]">
                  expertise
                </span>
                , and community to create an{' '}
                <span className="bg-gradient-to-r from-[#E65C00] to-[#F9D423] bg-clip-text text-transparent">
                  unparalleled educational experience.
                </span>
                <span className="text-richblack-600 bottom-3 right-17 relative">
                  ❞
                </span>
              </p>
            </div>
          </div>
        </div>
        <div className="h-[50vh] sm:h-0 lg:hidden"></div>
      </div>

      {/* 2nd section */}
      <div className="w-full min-h-screen flex flex-col items-center justify-around lg:gap-0 gap-12 lg:mb-0 mb-12">
        <div
          className="w-full flex lg:flex-row
        flex-col items-center justify-center lg:gap-64 gap-12"
        >
          <div className="w-[90%] lg:w-[32%] flex flex-col gap-4">
            <h1 className="text-3xl lg:text-4xl font-semibold bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#FCB045] bg-clip-text text-transparent">
              Our Founding Story
            </h1>
            <p className="text-lg lg:text-xl font-medium text-richblack-300">
              Our e-learning platform was born out of a shared vision and
              passion for transforming education. It all began with a group of
              educators, technologists, and lifelong learners who recognized the
              need for accessible, flexible, and high-quality learning
              opportunities in a rapidly evolving digital world.
            </p>
            <p className="text-lg lg:text-xl font-medium text-richblack-300">
              As experienced educators ourselves, we witnessed firsthand the
              limitations and challenges of traditional education systems. We
              believed that education should not be confined to the walls of a
              classroom or restricted by geographical boundaries. We envisioned
              a platform that could bridge these gaps and empower individuals
              from all walks of life to unlock their full potential.
            </p>
          </div>
          <div className="w-[90%] lg:w-[32%] relative">
            <div className="w-[50%] h-[50%] bg-gradient-to-br from-[#EC008C] to-[#FC6767] blur-3xl absolute -z-0 top-2 left-2"></div>
            <img
              src={founding}
              alt=""
              className="lg:w-[90%] object-cover relative z-10"
            />
          </div>
        </div>
        <div className="w-full flex lg:flex-row flex-col items-center justify-center lg:gap-64 gap-12">
          <div className="w-[90%] lg:w-[32%] flex flex-col gap-4">
            <h1 className="text-4xl font-semibold bg-gradient-to-br from-[#E65C00] to-[#F9D423] bg-clip-text text-transparent">
              Our Vison
            </h1>
            <p className="text-xl font-medium text-richblack-300">
              With this vision in mind, we set out on a journey to create an
              e-learning platform that would revolutionize the way people learn.
              Our team of dedicated experts worked tirelessly to develop a
              robust and intuitive platform that combines cutting-edge
              technology with engaging content, fostering a dynamic and
              interactive learning experience.
            </p>
          </div>
          <div className="w-[90%] lg:w-[32%] flex flex-col gap-4">
            <h1 className="text-4xl font-semibold bg-gradient-to-br from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] bg-clip-text text-transparent">
              Our Misson
            </h1>
            <p className="text-xl font-medium text-richblack-300">
              our mission goes beyond just delivering courses online. We wanted
              to create a vibrant community of learners, where individuals can
              connect, collaborate, and learn from one another. We believe that
              knowledge thrives in an environment of sharing and dialogue, and
              we foster this spirit of collaboration through forums, live
              sessions, and networking opportunities.
            </p>
          </div>
        </div>
      </div>

      {/* 3rd section */}
      <div className="w-full min-h-screen flex flex-col items-center lg:gap-0 gap-12">
        <div className="w-full lg:h-[20vh] h-[20vh] bg-richblack-800 flex items-center justify-around">
          <Stats data="5K" text="Active Student"></Stats>
          <Stats data="10+" text="Mentors"></Stats>
          <Stats data="200+" text="Courses"></Stats>
          <Stats data="50+" text="Awards"></Stats>
        </div>
        <div className="min-h-[80vh] w-[60%] flex items-center justify-center">
          <LearningData />
        </div>
      </div>

      {/* 4th section */}
      <div className="w-full min-h-screen flex flex-col items-center">
        <div className="w-[90%] my-16 mb-36 lg:w-[25%]">
          <GetTouch />
        </div>
        <h1 className="text-4xl font-semibold text-richblack-5 text-center">
          Reviews from other learners
        </h1>
      </div>
      {/* 5th section */}
      <Footer />
    </div>
  );
}

export default Aboutus;

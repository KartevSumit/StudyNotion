import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRightLong } from 'react-icons/fa6';
import HighLightText from '../components/core/Home/HighLightText';
import boxoffice from '../assets/Images/boxoffice.png';
import Button from '../components/common/Button';
import TextBox from '../components/core/Home/TextBox';
import CodeBlock from '../components/core/Home/CodeBlock';
import Logo1 from '../assets/TimeLineLogo/Logo1.svg';
import Logo2 from '../assets/TimeLineLogo/Logo2.svg';
import Logo3 from '../assets/TimeLineLogo/Logo3.svg';
import Logo4 from '../assets/TimeLineLogo/Logo4.svg';
import RoadMap from '../components/core/Home/RoadMap';
import timeLineImage from '../assets/Images/TimelineImage.png';
import compare from '../assets/Images/Compare_with_others.svg';
import know from '../assets/Images/Know_your_progress.svg';
import plan from '../assets/Images/Plan_your_lessons.svg';
import instructor from '../assets/Images/Instructor.png';
import Footer from '../components/common/Footer';
import ExploreMore from '../components/core/Home/ExploreMore';
import Tilt from 'react-parallax-tilt';
import Spinner from '../components/common/Spinner';
import { useSelector } from 'react-redux';

function Home() {
  const { loading } = useSelector((state) => state.auth);
  return loading ? (
    <Spinner />
  ) : (
    <div className="w-full min-h-screen flex flex-col justify-center">
      <div className="w-full min-h-screen relative py-16 flex flex-col items-center gap-16">
        <div className="w-11/12 flex flex-col items-center gap-4 mx-auto">
          <Link to={'/signup'}>
            <div className="group mx-auto w-64 flex items-center justify-center rounded-full gap-2 p-2 bg-richblack-800 font-bold transition-all duration-200 hover:scale-95 shadow-[inset_0_-1px_0_0_rgba(255,255,255,0.51)]">
              <p className="text-richblack-200 text-lg">Become an instructor</p>
              <FaArrowRightLong className="text-richblack-200" />
            </div>
          </Link>

          <div className="w-full lg:w-[55%] flex flex-col items-center my-4 gap-4 px-2 text-center lg:text-start">
            <div className="flex gap-2">
              <h1 className="font-semibold text-3xl lg:text-4xl text-richblack-5 text-center">
                Empower Your Future with{' '}
                <HighLightText text={'Coding Skills'} />
              </h1>
            </div>
            <p className="font-semibold text-lg text-center text-richblack-200">
              With our online coding courses, you can learn at your own pace,
              from anywhere in the world, and get access to a wealth of
              resources, including hands-on projects, quizzes, and personalized
              feedback from instructors.
            </p>
          </div>
          <div className="flex gap-8">
            <Button flag={true} text={'Learn more'} linkto={'/'} />
            <Button flag={false} text={'Book a demo'} linkto={'/'} />
          </div>
        </div>

        <div className="relative w-[90%] lg:w-[60%] h-auto lg:h-[515px]">
          <div
            className="w-[55%] h-full 
            absolute inset-0
            bg-[#12D8FA]
            opacity-30
            filter blur-3xl
            left-1/2 -translate-x-1/2
          "
          />
          <img
            src={boxoffice}
            alt="boxoffice"
            className="relative w-full h-full object-contain z-2"
          />
        </div>

        <div className="w-full min-h-[50%] flex flex-col items-center gap-16 my-0">
          <div className="w-[90%] lg:w-[80%] min-h-[10%] flex flex-col lg:flex-row lg:items-center lg:justify-around gap-16 lg:gap-0 my-16">
            <TextBox
              heading1={'Unlock your '}
              heading2={' with our online courses.'}
              highlight={'coding potential'}
              para={
                'Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you.'
              }
              button1={'Try it Yourself'}
              button2={'Learn More'}
            />

            <Tilt className="lg:w-[37%]">
              <CodeBlock Shadow="bg-gradient-to-br from-[#8A2BE2] via-[#FFA500] to-[#080800]" />
            </Tilt>
          </div>

          <div className="w-[90%] lg:w-[80%] min-h-[10%] flex flex-col lg:flex-row-reverse lg:items-center lg:justify-around my-4 gap-16 lg:gap-0">
            <TextBox
              heading1={'Start '}
              heading2={''}
              highlight={'coding in seconds'}
              para={
                "Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson"
              }
              button1={'Continue Lesson'}
              button2={'Learn More'}
            />

            <Tilt className="lg:w-[37%]">
              <CodeBlock Shadow="bg-gradient-to-br from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB]" />
            </Tilt>
          </div>
        </div>

        <div className="w-full min-h-[50%] flex flex-col items-center gap-16 my-0">
          <div className="w-11/12 flex flex-col items-center gap-4 mx-auto">
            <h1 className="font-semibold text-3xl lg:text-4xl text-richblack-5 text-center">
              Unlock the <HighLightText text={'power of coding'} />
            </h1>
            <p className="font-semibold text-md text-richblack-200">
              Learn to Build Anything You Can Imagine
            </p>
          </div>
          <div className="bg-pure-greys-5  w-full h-[320px] absolute bottom-0">
            <div className="w-full h-full relative homepage_bg"></div>
          </div>
          <div className="w-full min-h-[80%] relative flex flex-col items-center gap-16">
            <ExploreMore className="absolute" />
            <div className="flex gap-7">
              <Button
                flag={true}
                text={'Explore Full catalog'}
                flag2={true}
                linkto={'/'}
              />
              <Button
                flag={false}
                text={'Learn More'}
                flag2={false}
                linkto={'/'}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="w-full min-h-screen flex flex-col bg-pure-greys-5 text-richblack-700 items-center gap-16 py-16">
        <div className="w-full lg:h-[15vh] flex flex-col lg:flex-row items-center lg:justify-center lg:gap-56 gap-8">
          <div className="w-11/12 lg:w-[30%] h-full text-4xl">
            <span className="font-semibold">
              Get the skills you need for a{' '}
            </span>
            <HighLightText text={'job that is in demand'} />
          </div>
          <div className="w-11/12 lg:w-[30%] h-full text-lg text-richblack-400 flex flex-col justify-start gap-4 lg-justify-center lg:gap-0">
            <p>
              The modern StudyNotion is the dictates its own terms. Today, to be
              a competitive specialist requires more than professional skills.
            </p>
            <div>
              <Button flag={true} text={'Learn More'} />
            </div>
          </div>
        </div>

        <div className="w-11/12 lg:h-[550px] flex flex-col lg:flex-row items-center lg:justify-center lg:gap-56 gap-16 mb-16">
          <div className="lg:w-[25%] flex flex-col gap-4 relative">
            <RoadMap
              image={Logo1}
              heading={'Leadership'}
              description={'Fully committed to the success company'}
            />
            <div className="w-[7.5%] h-10 border-richblack-300 border-r-2 absolute top-[9vh] border-dotted"></div>
            <RoadMap
              image={Logo2}
              heading={'Responsibility'}
              description={'Students will always be our top priority'}
            />
            <div className="w-[7.5%] h-10 border-richblack-300 border-r-2 absolute top-[20.5vh] border-dotted"></div>
            <RoadMap
              image={Logo3}
              heading={'Flexibility'}
              description={'The ability to switch is an important skills'}
            />
            <div className="w-[7.5%] h-10 border-richblack-300 border-r-2 absolute top-[32vh] border-dotted"></div>
            <RoadMap
              image={Logo4}
              heading={'Solve the problem'}
              description={'Code your way to a solution'}
            />
          </div>
          <div className="h-[545px] flex items-center justify-center relative">
            <div className="w-full h-[60%] bg-gradient-to-br from-[#9CECFB] via-[#65C7F7] to-[#0052D4] blur-2xl absolute z-0"></div>
            <img
              src={timeLineImage}
              alt=""
              className="z-10 h-full object-cover"
            />
            <div className="w-[75%] lg:w-[80%] lg:h-[128px] bg-caribbeangreen-700 absolute right-4 bottom-4 lg:left-1/2 lg:-translate-x-1/2 lg:top-[538px] lg:-translate-y-1/2 flex flex-col lg:flex-row items-center justify-center z-20 p-8 lg:p-0">
              <div className="w-full lg:w-[50%] h-[40%] border-dotted lg:border-r-2 border-caribbeangreen-500 flex justify-center p-4 py-8 lg:py-0 lg:p-0">
                <div className="lg:w-[60%] h-full flex justify-between items-center ">
                  <h1 className="w-[30%] text-4xl font-bold text-richblack-5">
                    10
                  </h1>
                  <p className="w-[60%] text-normal font-normal text-caribbeangreen-300">
                    YEARS EXPERIENCES
                  </p>
                </div>
              </div>
              <div className="w-full lg:w-[50%] h-[40%] flex justify-center p-4 py-8 lg:py-0 lg:p-0">
                <div className="lg:w-[60%] h-full flex justify-between items-center gap-4">
                  <h1 className="w-[35%] text-4xl font-bold text-richblack-5">
                    250
                  </h1>
                  <p className="w-[50%] text-normal font-normal text-caribbeangreen-300">
                    TYPES OF COURSES
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-11/12 flex flex-col items-center gap-8">
          <div className="w-full flex flex-col items-center gap-8">
            <div className="lg:w-[45%] text-4xl flex justify-center gap-2 lg:text-start text-center">
              <span className="font-semibold ">
                Your swiss knife for
                <HighLightText text={' learning any language'} />
              </span>
            </div>
            <div className="lg:w-[45%] text-lg flex justify-center gap-2 text-center">
              <p>
                Using spin making learning multiple languages easy. with 20+
                languages realistic voice-over, progress tracking, custom
                schedule and more.
              </p>
            </div>
          </div>
          <div className="w-full lG:h-[60vh] flex flex-col lg:flex-row items-center justify-center relative lg:gap-64">
            <img src={know} alt="" className="z-0" />
            <img
              src={compare}
              alt=""
              className="z-10 lg:absolute lg:left-1/2 lg:-translate-x-64"
            />
            <img src={plan} alt="" className="z-20" />
          </div>
          <Button text={'Learn More'} linkto={'/'} flag={true} />
        </div>
      </div>

      <div className="w-full min-h-screen flex flex-col items-center justify-center gap-24 pt-32">
        <div className="w-11/12 lg:h-[65vh] flex flex-col lg:flex-row items-center justify-center gap-16 lg:gap-36">
          <div className="relative h-full before:absolute before:inset-0 before:-translate-x-4 before:-translate-y-4 before:bg-white before:z-0">
            <img
              src={instructor}
              alt=""
              className="relative z-10 h-full w-full object-cover"
            />
          </div>
          <div className="lg:w-[28%] flex flex-col gap-16 justify-center">
            <div className="flex flex-col gap-4">
              <div className="text-4xl text-richblack-5 font-semibold">
                <h1>Become an</h1>
                <HighLightText text={'Instructor'} />
              </div>
              <div>
                <p className="text-richblack-200 text-md">
                  Instructors from around the world teach millions of students
                  on StudyNotion. We provide the tools and skills to teach what
                  you love.
                </p>
              </div>
            </div>
            <div>
              <Button
                text={'Start Teaching Today'}
                linkto={'/'}
                flag={true}
                flag2={true}
              />
            </div>
          </div>
        </div>

        {/* Comments */}
        <div className="w-11/12 flex flex-col items-center gap-8">
          <h1 className="text-4xl font-semibold text-richblack-5">
            Reviews from other learners
          </h1>
        </div>

        {/* Footer */}
        <footer className="w-full min-h-[80vh] bg-richblack-800">
          <Footer />
        </footer>
      </div>
    </div>
  );
}

export default Home;

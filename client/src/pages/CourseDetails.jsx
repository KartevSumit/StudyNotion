import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getCourseDetails } from '../services/operations/CourseApi';
import Path from '../components/common/Path';
import Footer from '../components/common/Footer';
import RatingStars from '../components/common/RatingStars';
import { formatDateISO } from '../components/common/TimeFormat';
import { RiInformation2Line } from 'react-icons/ri';
import CourseContent from '../components/core/CourseDetails/CourseContent';
import IconButton from '../components/common/IconButton';
import { FiMousePointer } from 'react-icons/fi';
import { PiDeviceMobileCameraDuotone } from 'react-icons/pi';
import { LuFileCheck } from 'react-icons/lu';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, buyCourse } from '../services/operations/ProfileApi';
import { WiTime10 } from 'react-icons/wi';
import ConfirmationModal from '../components/common/ConfirmationModal';
import { useNavigate } from 'react-router-dom';

function CourseDetails() {
  const courseId = useParams().courseId;
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const [showModal, setShowModal] = useState(null);
  const [courseData, setCourseData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const response = await getCourseDetails({ courseId });

        let totalSeconds = 0;
        if (Array.isArray(response.courseContent)) {
          response.courseContent.forEach((section) => {
            if (Array.isArray(section.subSections)) {
              section.subSections.forEach((subSection) => {
                const duration = subSection.timeDuration; // format "HH:MM:SS"
                if (typeof duration === 'string') {
                  const [h, m, s] = duration.split(':').map(Number);
                  totalSeconds += h * 3600 + m * 60 + s;
                }
              });
            }
          });
        }

        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;
        const padded = (n) => n.toString().padStart(2, '0');
        const durationStr = `${padded(hours)}:${padded(minutes)}:${padded(
          seconds
        )}`;

        setCourseData({
          ...response,
          duration: durationStr,
        });
      } catch (error) {
        console.error('Error fetching course details:', error);
      }
    };
    fetchCourseDetails();
  }, [courseId]);

  if (!courseData) {
    return <div>Loading...</div>;
  }

  const totalSection = courseData.courseContent.length;
  const totalSubsections = courseData.courseContent.reduce(
    (total, section) => total + section.subSections.length,
    0
  );

  const handleAddToCart = async () => {
    try {
      const response = dispatch(addToCart(token, courseId));
      console.log('Added to cart:', response);
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  const handleBuyCourse = async () => {
    try {
      const response = dispatch(buyCourse(token, courseId));
      navigate('/dashboard/enrolled-courses');
      console.log('Bought course:', response);
    } catch (error) {
      console.error('Error buying course:', error);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col gap-6 items-center text-richblack-300 relative">
      <div className="w-full bg-richblack-800 absolute left-0 top-0 h-[36vh]"></div>
      <div className="w-full flex justify-center mt-12 gap-12 relative">
        <div className="w-[55%] flex flex-col">
          <div className=" p-8 flex flex-col gap-3">
            <Path name={courseData.courseName}></Path>
            <h1 className="text-3xl font-semibold text-richblack-5">
              {courseData.courseName}
            </h1>
            <div className="relative group">
              <span className="line-clamp-2">
                {courseData.courseDescription}
              </span>
              <span className="absolute top-0 left-0 rounded-lg bg-richblack-900 text-richblack-25 p-2 hidden group-hover:inline h-fit">
                {courseData.courseDescription}
              </span>
            </div>
            <RatingStars
              ratingAndReviews={courseData.ratingAndReviews}
              Star_Size={20}
            />
            <h1>
              Created by {courseData.instructor.firstName}{' '}
              {courseData.instructor.lastName}
            </h1>
            <div className="flex items-center gap-2">
              <RiInformation2Line />
              <p>Created at {formatDateISO(courseData.createdAt)}</p>
            </div>
          </div>

          <div className="p-8 mt-24 flex flex-col gap-3 border border-richblack-600 rounded-xl">
            <h1 className="text-3xl font-semibold text-richblack-5">
              What you'll learn
            </h1>
            <p className="text-lg text-richblack-100">
              {courseData.whatyouwilllearn}
            </p>
          </div>

          <div className="p-8 mt-16 flex flex-col gap-3 border border-richblack-600 rounded-xl">
            <h1 className="text-3xl font-semibold text-richblack-5">
              Course Content
            </h1>
            <p>
              {totalSection} sections : {totalSubsections} lectures :{' '}
              {courseData?.duration.split(':')[0]} hours{' '}
              {courseData.duration.split(':')[1]} minutes
            </p>
            <CourseContent
              courseContent={courseData.courseContent}
              courseId={courseData._id}
            ></CourseContent>
          </div>

          <div className="p-8 mt-16 flex flex-col gap-4 border border-richblack-600 rounded-xl">
            <h1 className="text-3xl font-semibold text-richblack-5">Author</h1>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full overflow-hidden">
                <img src={courseData.instructor.image} alt="" />
              </div>
              <div>
                <h1 className="text-2xl text-richblack-50">
                  {courseData.instructor.firstName}{' '}
                  {courseData.instructor.lastName}
                </h1>
                <h1 className="text-lg text-richblack-100">
                  {courseData.instructor.email}
                </h1>
              </div>
            </div>
            <p>{courseData.instructor?.additionalInfo?.about}</p>
          </div>
        </div>
        <div className="w-[23%] mt-8 flex flex-col rounded-xl overflow-hidden">
          <img src={courseData.thumbnail} alt="" />
          <div className="flex flex-col gap-4 bg-richblack-700 p-7 rounded-b-xl">
            <h1 className="text-2xl font-semibold text-richblack-5">
              Rs. {courseData.price}
            </h1>
            <div className="flex flex-col gap-3">
              <IconButton
                text={'Add to Cart'}
                onClick={() => {
                  handleAddToCart();
                }}
                customClass={
                  'w-full bg-yellow-100 text-richblack-900 flex items-center justify-center shadow-none'
                }
              />
              <IconButton
                text={'Buy Now'}
                onClick={() => {
                  setShowModal({
                    heading: 'Buy Now',
                    description: 'Are you sure you want to buy this course?',
                    text1: 'Buy Now',
                    customClass1: 'bg-yellow-100 text-richblack-900',
                    onClick1: () => {
                      handleBuyCourse();
                      setShowModal(null);
                    },
                    text2: 'Cancel',
                    customClass2: 'bg-richblack-800 text-richblack-100',
                    onClick2: () => {
                      setShowModal(null);
                    },
                  });
                }}
                customClass={
                  'w-full bg-richblack-800 text-richblack-100 flex items-center justify-center'
                }
              />
              <h1 className="text-sm text-center">
                30 Day Money Back Guarantee
              </h1>
            </div>
            <div className="flex flex-col gap-2">
              <h1 className="text-lg text-richblack-5">
                This course includes:
              </h1>
              <ul className="flex flex-col gap-1 text-caribbeangreen-100">
                <li className="flex gap-2 items-center">
                  <WiTime10 />
                  <span>
                    {courseData.duration.split(':')[0]} hours on-demand video
                  </span>
                </li>
                <li className="flex gap-2 items-center">
                  <FiMousePointer />
                  <span>Full LifeTime Access</span>
                </li>
                <li className="flex gap-2 items-center">
                  <PiDeviceMobileCameraDuotone />
                  <span>Access on Mobile and TV</span>
                </li>
                <li className="flex gap-2 items-center">
                  <LuFileCheck />
                  <span>Certificate of Completion</span>
                </li>
              </ul>
            </div>
            <Link className="text-center  text-yellow-50 font-semibold">
              Share
            </Link>
          </div>
        </div>
      </div>
      <Footer></Footer>
      {showModal && <ConfirmationModal modalData={showModal} />}
    </div>
  );
}

export default CourseDetails;

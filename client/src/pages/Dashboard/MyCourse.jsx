import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import IconButton from '../../components/common/IconButton';
import {
  setLoading,
  setStep,
  setEditCourse,
  setCourse,
} from '../../slices/courseSlice';
import {
  getInstructorCourses,
  deleteCourse,
} from '../../services/operations/CourseApi';
import { toast } from 'react-hot-toast';
import { BsFillCheckCircleFill } from 'react-icons/bs';
import { GoClockFill } from 'react-icons/go';
import { MdOutlineEdit } from 'react-icons/md';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import ConfirmationModal from '../../components/common/ConfirmationModal';
import { IoMdAddCircleOutline } from 'react-icons/io';
import { formatDateISO } from '../../components/common/TimeFormat';

function MyCourse() {
  const token = useSelector((state) => state.auth.token);
  const [courses, setCourses] = useState([]);
  const [coursesWithDuration, setCoursesWithDuration] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(null);

  useEffect(() => {
    if (!token) return;

    const fetchCourses = async () => {
      dispatch(setLoading(true));
      try {
        const response = await getInstructorCourses(token);

        if (response && Array.isArray(response)) {
          setCourses(response);
        } else {
          setCourses([]);
          toast.error('No courses found');
        }
      } catch (error) {
        setCourses([]);
        toast.error(error.message || 'Failed to fetch courses');
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchCourses();
  }, [token, dispatch]);

  useEffect(() => {
    if (!Array.isArray(courses) || courses.length === 0) {
      setCoursesWithDuration([]);
      return;
    }

    const newArr = courses.map((course) => {
      course.createdAt = formatDateISO(course.createdAt);
      let totalSeconds = 0;
      if (Array.isArray(course.courseContent)) {
        course.courseContent.forEach((section) => {
          if (Array.isArray(section.subSections)) {
            section.subSections.forEach((subSection) => {
              const duration = subSection.timeDuration;
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

      return {
        ...course,
        duration: durationStr,
      };
    });

    setCoursesWithDuration(newArr);
  }, [courses]);

  const handleEdit = (course) => {
    dispatch(setLoading(true));
    dispatch(setCourse(course));
    dispatch(setEditCourse(true));
    dispatch(setStep(1));
    localStorage.setItem('course', JSON.stringify(course));
    localStorage.setItem('editCourse', true);
    localStorage.setItem('step', 1);
    dispatch(setLoading(false));
    navigate('/dashboard/add-course');
  };

  const handleDelete = async (id) => {
    toast.loading('Deleting...');
    try {
      const response = await deleteCourse({ courseId: id }, token);
      if (response) {
        toast.success('Course deleted successfully');
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Something went wrong');
    } finally {
      toast.dismiss();
    }
    setCoursesWithDuration(() => {
      return coursesWithDuration.filter((course) => course._id !== id);
    });
  };

  return (
    <div className="w-full h-[93vh] overflow-y-scroll p-8 flex flex-col items-start gap-6">
      <div className="w-full">
        <button></button>
        <div className="lg:w-[80%] flex items-center justify-between">
          <h1 className="text-3xl font-semibold text-richblack-5">My Course</h1>
          <IconButton
            text="Add Course"
            children={<IoMdAddCircleOutline />}
            onClick={() => navigate('/dashboard/add-course')}
            customClass="bg-yellow-50 text-richblack-900 hidden lg:flex"
          />
        </div>
      </div>
      <div className="min-w-[80%] p-6 border-2 border-richblack-400 rounded-xl flex flex-col gap-4">
        <div className="hidden lg:flex text-richblack-50 capitalize text-xl">
          <h1 className="w-[70%]">Courses</h1>
          <h1 className="w-[10%] text-center">Duration</h1>
          <h1 className="w-[10%] text-center">Price</h1>
          <h1 className="w-[10%] text-center">Action</h1>
        </div>
        <div className="flex flex-col gap-6">
          {coursesWithDuration.map((course) => (
            <div
              key={course._id}
              className="flex items-center flex-col sm:flex-row gap-2 sm:gap-0"
            >
              <div className="sm:w-[70%] flex gap-5 h-fit flex-col sm:flex-row p-2 ms:p-0">
                <img
                  src={course.thumbnail}
                  alt=""
                  className="h-40 rounded-lg"
                />
                <div className="flex flex-col gap-2">
                  <h1 className="text-xl text-richblack-5 font-semibold">
                    {course.courseName}
                  </h1>
                  <p className="text-richblack-200 text-sm">
                    {course.courseDescription}
                  </p>
                  <h1 className="text-richblack-100">
                    Created at: {course.createdAt}
                  </h1>
                  <div
                    className={`flex items-center gap-2 py-1 px-3 bg-richblack-700 w-fit rounded-full ${
                      course.status === 'Published'
                        ? 'text-yellow-200'
                        : 'text-pink-200'
                    }`}
                  >
                    {course.status === 'Published' ? (
                      <BsFillCheckCircleFill />
                    ) : (
                      <GoClockFill />
                    )}
                    <h1>{course.status}</h1>
                  </div>
                </div>
              </div>
              <h1 className="sm:w-[10%] text-richblack-5 sm:text-center text-xl">
                <span className="inline sm:hidden ">Duration: </span>
                {course.duration}
              </h1>
              <h1 className="sm:w-[10%] text-richblack-5 sm:text-center text-xl">
                <span className="inline sm:hidden">Price: </span>₹{course.price}
              </h1>
              <div className="sm:w-[10%] flex items-center sm:justify-center gap-4">
                <button
                  onClick={() => handleEdit(course)}
                  className="text-xl font-semibold text-richblack-5 hover:text-yellow-50"
                >
                  <MdOutlineEdit />
                </button>
                <button
                  onClick={() => {
                    setShowModal({
                      heading: 'Delete Course',
                      description: 'All course content will be deleted',
                      text1: 'Delete',
                      customClass1: 'bg-pink-600 text-richblack-5',
                      onClick1: () => {
                        handleDelete(course._id);
                        setShowModal(null);
                      },
                      text2: 'Cancel',
                      customClass2: 'bg-richblack-700 text-richblack-5',
                      onClick2: () => setShowModal(null),
                    });
                  }}
                  className="text-xl font-semibold text-richblack-5 hover:text-pink-200"
                >
                  <RiDeleteBin6Line />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      {showModal && <ConfirmationModal modalData={showModal} />}
    </div>
  );
}

export default MyCourse;

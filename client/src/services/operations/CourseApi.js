import toast from 'react-hot-toast';
import { apiConnector } from '../apiConnector';
import { COURSE_API } from '../apis';
import { setLoading } from '../../slices/courseSlice';

export function getCourseCategories() {
  return async (dispatch) => {
    dispatch(setLoading(true));
    let result = [];
    try {
      const response = await apiConnector('GET', COURSE_API.GET_ALL_CATEGORIES);
      if (!response?.data?.success) {
        throw new Error('Could not fetch course categories');
      } else {
        result = response?.data?.data;
      }
      dispatch(setLoading(false));
    } catch (error) {
      console.log('error', error);
      toast.error(error?.response?.data?.message || 'Something went wrong.');
    } finally {
      return result;
    }
  };
}

export async function editCourseDetails(data, token) {
  let result = null;
  console.log('data', data);
  try {
    const response = await apiConnector(
      'PUT',
      COURSE_API.EDIT_COURSE_DETAILS,
      data,
      { Authorization: `Bearer ${token}` }
    );
    if (!response?.data?.success) {
      throw new Error('Could not edit course details');
    } else {
      result = response?.data?.data;
      localStorage.setItem('course', JSON.stringify(response?.data?.data));
    }
  } catch (error) {
    console.log('error', error);
    toast.error(error?.response?.data?.message || 'Something went wrong.');
    throw error;
  }
  return result;
}

export async function addCourseDetails(data, token) {
  let result = null;
  try {
    console.log(data);
    const response = await apiConnector(
      'POST',
      COURSE_API.CREATE_COURSE,
      data,
      { Authorization: `Bearer ${token}` }
    );
    if (!response?.data?.success) {
      throw new Error('Could not add course details');
    } else {
      result = response?.data?.data;
      localStorage.setItem('course', JSON.stringify(response?.data?.data));
    }
  } catch (error) {
    console.log('error', error);
    toast.error(error?.response?.data?.message || 'Something went wrong.');
    throw error;
  }
  return result;
}

export async function getCourseDetails({ courseId }) {
  let result = null;
  try {
    const response = await apiConnector(
      'GET',
      COURSE_API.GET_COURSE_DETAILS,
      null,
      null,
      { courseId }
    );
    if (!response?.data?.success) {
      throw new Error('Could not fetch course details');
    } else {
      result = response?.data?.data;
    }
  } catch (error) {
    console.log('error', error);
    toast.error(error?.response?.data?.message || 'Something went wrong.');
  }
  return result;
}

export function publishCourse(data, token) {
  return async (dispatch) => {
    let result = null;
    try {
      const response = await apiConnector(
        'PUT',
        COURSE_API.PUBLISH_COURSE,
        data,
        { Authorization: `Bearer ${token}` }
      );
      if (!response?.data?.success) {
        throw new Error('Could not publish course');
      } else {
        result = response?.data?.data;
      }
    } catch (error) {
      console.log('error', error);
      toast.error(error?.response?.data?.message || 'Something went wrong.');
    }
    return result;
  };
}

export async function getInstructorCourses(token) {
  let result = null;
  try {
    const response = await apiConnector(
      'GET',
      COURSE_API.GET_INSTRUCTOR_COURSES,
      null,
      { Authorization: `Bearer ${token}` }
    );

    if (!response?.data?.success) {
      throw new Error('Could not fetch instructor courses');
    }
    result = response.data.data;
  } catch (error) {
    console.error('Error in getInstructorCourses:', error);
    toast.error(error?.response?.data?.message || 'Something went wrong.');
  }
  console.log('Instructor Courses:', result);
  return result;
}

export async function deleteCourse(data, token) {
  let result = null;
  try {
    const response = await apiConnector(
      'DELETE',
      COURSE_API.DELETE_COURSE,
      data,
      { Authorization: `Bearer ${token}` }
    );
    if (!response?.data?.success) {
      throw new Error('Could not delete course');
    }
  } catch (error) {
    console.log('error', error);
    toast.error(error?.response?.data?.message || 'Something went wrong.');
  }
  return result;
}

export async function getCategoryCourses(categoryId) {
  const toastId = toast.loading('Loading...');
  let result = null;
  try {
    const response = await apiConnector(
      'GET',
      `${COURSE_API.GET_CATEGORY_PAGE_DETAILS}`,
      { categoryId: categoryId }
    );
    if (!response?.data?.success) {
      throw new Error('Could not fetch category courses');
    }
    result = response.data.data;
  } catch (error) {
    console.error('Error in getCategoryCourses:', error);
    toast.error(error?.response?.data?.message || 'Something went wrong.');
  }
  console.log('Category Courses:', result);
  toast.dismiss(toastId);
  return result;
}

export async function addReview({ data, token }) {
  return async (dispatch) => {
    let result = null;
    try {
      const response = await apiConnector(
        'POST',
        COURSE_API.CREATE_RATING_AND_REVIEW,
        data,
        {
          Authorization: `Bearer ${token}`,
        }
      );
      if (!response?.data?.success) {
        throw new Error('Could not add review');
      } else {
        result = response?.data?.data;
      }
    } catch (error) {
      console.log('error', error);
      toast.error(error?.response?.data?.message || 'Something went wrong.');
    }
    return result;
  };
}

export async function getAllReviews() {
  let result = null;
  try {
    console.log(COURSE_API.GET_ALL_RATING);
    const response = await apiConnector('GET', COURSE_API.GET_ALL_RATING);
    if (!response?.data?.success) {
      throw new Error('Could not fetch all reviews');
    } else {
      result = response?.data?.data;
    }
  } catch (error) {
    console.log('error', error);
    toast.error(error?.response?.data?.message || 'Something went wrong.');
  }
  return result;
}

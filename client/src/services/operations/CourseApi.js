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
  try {
    const response = await apiConnector(
      'POST',
      COURSE_API.UPDATE_SECTION,
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


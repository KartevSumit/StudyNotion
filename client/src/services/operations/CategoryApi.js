import { setLoading } from '../../slices/authSlice';
import { toast } from 'react-hot-toast';
import { apiConnector } from '../apiConnector';
import { COURSE_API } from '../apis';

export async function getCategoryDetails(data, dispatch) {
  let result = null;
  dispatch(setLoading(true));
  try {
    console.log(data);
    const response = await apiConnector(
      'GET',
      COURSE_API.GET_CATEGORY_DETAILS,
      null,
      null,
      data
    );
    if (!response?.data?.success) {
      throw new Error('Could not fetch category details');
    } else {
      result = response?.data?.data;
    }
  } catch (error) {
    console.log('error', error);
    toast.error(error?.response?.data?.message || 'Something went wrong.');
  }
  dispatch(setLoading(false));
  return result;
}

export async function getCategoryPage(data, dispatch) {
  let result = null;
  dispatch(setLoading(true));
  try {
    console.log(data);
    const response = await apiConnector(
      'GET',
      COURSE_API.GET_CATEGORY_PAGE_DETAILS,
      null,
      null,
      data
    );
    if (!response?.data?.success) {
      throw new Error('Could not fetch category details');
    } else {
      result = response?.data?.data;
    }
  } catch (error) {
    console.log('error', error);
    toast.error(error?.response?.data?.message || 'Something went wrong.');
  }
  dispatch(setLoading(false));
  console.log(result);
  return result;
}

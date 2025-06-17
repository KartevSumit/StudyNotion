import { COURSE_API } from '../apis';
import { apiConnector } from '../apiConnector';
import { toast } from 'react-hot-toast';
import { setUser } from '../../slices/profileSlice';

export function addCompletedLecture(data) {
  return async (dispatch) => {
    try {
      const response = await apiConnector(
        'POST',
        COURSE_API.ADD_COMPLETED_LECTURE,
        data,
        {
          Authorization: `Bearer ${data.token}`,
        }
      );
      if (!response?.data?.success) {
        throw new Error('Could not add completed lecture');
      } else {
        dispatch(setUser(response.data.data));
      }
    } catch (error) {
      console.log('error', error);
      toast.error(error?.response?.data?.message || 'Something went wrong.');
    }
  };
}

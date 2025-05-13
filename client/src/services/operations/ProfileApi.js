import toast from 'react-hot-toast';
import { apiConnector } from '../apiConnector';
import { PROFILE_API as profile } from '../apis';
import { setUser } from '../../slices/profileSlice';
import { setLoading } from '../../slices/profileSlice';

export function getAllProfiles() {
  return async (dispatch, getState) => {
    try {
      const token = getState().auth.token;
      const res = await apiConnector('GET', profile.GET_ALL_PROFILES, {
        Authorization: `Bearer ${token}`,
      });
      dispatch(setUser(res.data.data));
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Something went wrong.');
    }
  };
}

export function updateProfile(data) {
  return async (dispatch, getState) => {
    dispatch(setLoading(true));
    try {
      const token = getState().auth.token;
      const res = await apiConnector('PUT', profile.UPDATE_PROFILE, data, {
        Authorization: `Bearer ${token}`,
      });
      dispatch(setUser(res.data.data));
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Something went wrong.');
    }
    dispatch(setLoading(false));
  };
}

export function updateProfileImage(token, formData) {
  return async (dispatch) => {
    const toastId = toast.loading('Loading...');
    dispatch(setLoading(true));
    try {
      const res = await apiConnector(
        'PUT',
        profile.UPDATE_PROFILE_IMAGE,
        formData,
        {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        }
      );
      dispatch(setUser(res.data.data));
      toast.success('Profile image updated successfully');
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Something went wrong.');
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
}

import toast from 'react-hot-toast';
import { apiConnector } from '../apiConnector';
import { PROFILE_API as profile } from '../apis';
import { setSelectedImage, setUser } from '../../slices/profileSlice';
import { setLoading } from '../../slices/profileSlice';
import { setToken } from '../../slices/authSlice';

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

export function updateProfile(
  token,
  firstName,
  lastName,
  phone,
  dateofBirth,
  gender,
  profession,
  about
) {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const res = await apiConnector(
        'PUT',
        profile.UPDATE_PROFILE,
        {
          firstName,
          lastName,
          phone,
          dateofBirth,
          gender,
          profession,
          about,
        },
        {
          Authorization: `Bearer ${token}`,
        }
      );
      dispatch(setUser(res.data.data));
      toast.success('Profile updated successfully');
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Something went wrong.');
    }
    dispatch(setLoading(false));
  };
}

export function uploadProfileImage(token, formData) {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      console.log(token);
      const res = await apiConnector(
        'PUT',
        profile.UPLOAD_PROFILE_IMAGE,
        formData,
        {
          // 'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        }
      );
      toast.success('Profile image will revert back if not save in 5 minutes');
      dispatch(setSelectedImage(res.data.data.imageURL));
      dispatch(setLoading(false));
      return res.data.data.imageURL;
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Something went wrong.');
      dispatch(setLoading(false));
    }
  };
}

export function updateProfileImage(token, imageURL) {
  return async (dispatch) => {
    const toastId = toast.loading('Loading...');
    dispatch(setLoading(true));
    try {
      const res = await apiConnector(
        'PUT',
        profile.UPDATE_PROFILE_IMAGE,
        { imageURL: imageURL },
        {
          // 'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        }
      );
      toast.success('Profile image updated successfully');
      dispatch(setUser(res.data.data));

      dispatch(setLoading(false));
      toast.dismiss(toastId);
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Something went wrong.');
      dispatch(setLoading(false));
      toast.dismiss(toastId);
    }
  };
}

export function deleteCurrentImage(token) {
  return async (dispatch) => {
    try {
      const res = await apiConnector(
        'PUT',
        profile.DELETE_CURRENT_IMAGE,
        {},
        {
          // 'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        }
      );
      dispatch(setUser(res.data.data));
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Something went wrong.');
    }
  };
}

export function changePassword(
  token,
  oldPassword,
  newPassword,
  confirmPassword
) {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const res = await apiConnector(
        'PUT',
        profile.UPDATE_PASSWORD,
        { oldPassword, newPassword, confirmPassword },
        {
          // 'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        }
      );
      dispatch(setLoading(false));
      toast.success('Password updated successfully');
      dispatch(setUser(res.data.data));
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Something went wrong.');
    }
  };
}

export function deleteUser(token,navigate) {
  return async (dispatch) => {
    dispatch(setLoading(true));
    console.log(profile.DELETE_USER);
    try {
      const res = await apiConnector(
        'DELETE',
        profile.DELETE_USER,
        {},
        {
          // 'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        }
      );
      dispatch(setLoading(false));
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      dispatch(setToken(null));
      dispatch(setUser(null));
      navigate('/');
      toast.success('Profile deleted successfully');
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Something went wrong.');
    }
  };
}

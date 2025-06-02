import { toast } from 'react-hot-toast';
import { apiConnector } from '../apiConnector';
import { COURSE_API } from '../apis';
import { setCourse } from '../../slices/courseSlice';

export const updateSection = async (data, token) => {
  let result = null;
  const toastId = toast.loading('Loading...');
  try {
    const res = await apiConnector('POST', COURSE_API.UPDATE_SECTION, data, {
      Authorization: `Bearer ${token}`,
    });
    result = res?.data?.data;

    toast.success(res?.data?.message, {
      id: toastId,
    });
    if (!res?.data?.success) {
      throw new Error(res?.data?.message);
    }
    localStorage.setItem('course', JSON.stringify(res?.data?.data));
  } catch (error) {
    toast.error(error?.response?.data?.message || 'Something went wrong.');
  }
  toast.dismiss(toastId);
  return result;
};

export const addSection = async ({ sectionName, courseId }, token) => {
  let result = null;
  const toastId = toast.loading('Loading...');
  try {
    const res = await apiConnector(
      'POST',
      COURSE_API.CREATE_SECTION,
      { sectionName, courseId },
      {
        Authorization: `Bearer ${token}`,
      }
    );
    result = res?.data?.data;
    toast.success(res?.data?.message, {
      id: toastId,
    });
    if (!res?.data?.success) {
      throw new Error(res?.data?.message);
    }
    localStorage.setItem('course', JSON.stringify(res?.data?.data));
  } catch (error) {
    toast.error(error?.response?.data?.message || 'Something went wrong.');
  }
  toast.dismiss(toastId);
  return result;
};

export const deleteSection = async (sectionId, courseId, token, dispatch) => {
  let result = null;
  const toastId = toast.loading('Loading...');
  try {
    const res = await apiConnector(
      'DELETE',
      COURSE_API.DELETE_SECTION,
      {
        sectionId,
        courseId,
      },
      {
        Authorization: `Bearer ${token}`,
      }
    );
    result = res?.data?.data;
    if (!res?.data?.success) {
      throw new Error(res?.data?.message);
    }
    localStorage.setItem('course', JSON.stringify(res?.data?.data));
    dispatch(setCourse(res?.data?.data));
  } catch (error) {
    toast.error(error?.response?.data?.message || 'Something went wrong.');
  }
  toast.dismiss(toastId);
  return result;
};

export const deleteSubSection = (data, token) => {
  return async (dispatch) => {
    try {
      const res = await apiConnector(
        'DELETE',
        COURSE_API.DELETE_SUBSECTION,
        data,
        {
          Authorization: `Bearer ${token}`,
        }
      );
      if (res?.data?.success) {
        localStorage.setItem('course', JSON.stringify(res?.data?.data));
        dispatch(setCourse(res?.data?.data));
      }
      return res?.data?.data;
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Something went wrong.');
    }
  };
};

export const updateSubSection = (formData, token) => {
  return async (dispatch) => {
    let result = null;
    const toastId = toast.loading('Loading...');
    try {
      const res = await apiConnector(
        'PUT',
        COURSE_API.UPDATE_SUBSECTION,
        formData,
        {
          Authorization: `Bearer ${token}`,
        }
      );

      result = res?.data?.data;
      toast.success(res?.data?.message || 'Updated successfully', {
        id: toastId,
      });

      if (res?.data?.success) {
        localStorage.setItem('course', JSON.stringify(res.data.data));
        const action = setCourse(res.data.data);
        dispatch(action);
      } else {
        throw new Error(res?.data?.message || 'Update failed');
      }
      return result;
    } catch (error) {
      toast.error(
        error.response?.data?.message || error.message || 'Update error'
      );
      throw error;
    } finally {
      toast.dismiss(toastId);
    }
  };
};

export const addSubSection = (data, token) => {
  return async (dispatch) => {
    const toastId = toast.loading('Loading...');
    try {
      const res = await apiConnector(
        'POST',
        COURSE_API.CREATE_SUBSECTION,
        data,
        {
          Authorization: `Bearer ${token}`,
        }
      );

      if (res?.data?.success) {
        localStorage.setItem('course', JSON.stringify(res?.data?.data));
        dispatch(setCourse(res?.data?.data));
      }
      return res?.data?.data;
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Something went wrong.');
    } finally {
      toast.dismiss(toastId);
    }
  };
};

import toast from 'react-hot-toast';
import { apiConnector } from '../apiConnector';
import { AUTH_API as auth } from '../apis';
import { setLoading, setToken, setEmailSent } from '../../slices/authSlice';
import { setUser } from '../../slices/profileSlice';

export function getPasswordResetToken() {
  return async (dispatch, getState) => {
    dispatch(setLoading(true));
    try {
      const { email } = getState().auth;
      const response = await apiConnector('POST', auth.RESET_PASSWORD_TOKEN, {
        email,
      });
      console.log(response);
      if (response.status === 200) {
        dispatch(setEmailSent(true));
        toast.success('Email sent successfully. Please check your inbox.');
      } else {
        throw new Error('Failed to send email');
      }
    } catch (error) {
      console.error(error);

      toast.error('An error occurred while sending the email.');
      dispatch(setEmailSent(false));
    } finally {
      dispatch(setLoading(false));
    }
  };
}

export function resetPassword(password, confirmPassword, token, navigate) {
  return async (dispatch) => {
    try {
      dispatch(setLoading(true));

      const response = await apiConnector('POST', auth.RESET_PASSWORD, {
        token,
        password,
        confirmPassword,
      });

      console.log('Reset response:', response);

      if (response?.status === 200) {
        toast.success('Password reset successfully.');
        navigate('/successChange');
      } else {
        throw new Error('Failed to reset password');
      }
    } catch (error) {
      console.error('Reset error:', error);
      toast.error(error?.response?.data?.message || 'Something went wrong.');
    } finally {
      dispatch(setLoading(false));
    }
  };
}

export function verifyEmail(token, email) {
  return async (dispatch) => {
    try {
    } catch (error) {}
  };
}

export function loginUser(email, password, navigate, role) {
  return async (dispatch) => {
    try {
      dispatch(setLoading(true));
      const res = await apiConnector('POST', auth.LOGIN, {
        email,
        password,
        role,
      });

      if (res.status === 200) {
        toast.success('Login successful');
        dispatch(setToken(res.data.data.token));
        localStorage.setItem('token', res.data.data.token);
        dispatch(setUser(res.data.data));
        navigate('/dashboard');
      } else {
        throw new Error('Login failed');
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Something went wrong.');
    } finally {
      dispatch(setLoading(false));
    }
  };
}

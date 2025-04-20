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
      if (response.data.success) {
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

      if (response.data.success) {
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

export function sendOtp(email, navigate) {
  return async (dispatch) => {
    try {
      dispatch(setLoading(true));
      const res = await apiConnector('POST', auth.SEND_OTP, {
        email,
      });

      if (res.data.success) {
        toast.success('OTP sent successfully');
        dispatch(setEmailSent(true));
        if (window.location.pathname !== '/verify-email') {
          navigate('/verify-email');
        }
      } else {
        throw new Error('Failed to send OTP');
      }
    } catch (error) {
      console.error('Error sending OTP:', error);
      toast.error(error?.response?.data?.message || 'Something went wrong.');
    } finally {
      dispatch(setLoading(false));
    }
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

      if (res.data.success) {
        toast.success('Login successful');
        dispatch(setToken(res.data.data.token));
        localStorage.setItem('token', res.data.data.token);
        dispatch(setUser(res.data.data));
        localStorage.setItem('user', JSON.stringify(res.data.data));
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

export function signupUser(otp, navigate) {
  return async (dispatch, getState) => {
    try {
      dispatch(setLoading(true));
      const {
        firstName,
        lastName,
        email,
        phoneNumber,
        countryCode,
        password,
        confirmPassword,
        accountType,
      } = getState().auth.signupData;

      const res = await apiConnector('POST', auth.SIGNUP, {
        firstName,
        lastName,
        email,
        phoneNumber,
        countryCode,
        password,
        confirmPassword,
        accountType,
        otp,
      });

      if (res.data.success) {
        toast.success('Signup successful');
        dispatch(setToken(res.data.data.token));
        localStorage.setItem('token', res.data.data.token);
        dispatch(setUser(res.data.data));
        localStorage.setItem('user', JSON.stringify(res.data.data));
        navigate('/dashboard');
      } else {
        throw new Error('Signup failed');
      }
    } catch (error) {
      console.error('Error during signup:', error);
      toast.error(error?.response?.data?.message || 'Something went wrong.');
    } finally {
      dispatch(setLoading(false));
    }
  };
}

export function logoutUser(navigate) {
  return async (dispatch, getState) => {
    try {
      const { token } = getState().auth;
      dispatch(setLoading(true));

      const res = await apiConnector('POST', auth.LOGOUT, { token });
      if (res.data.success) {
        toast.success('Logout successful');
        dispatch(setToken(null));
        localStorage.removeItem('token');
        dispatch(setUser(null));
        localStorage.removeItem('user');
        navigate('/');
      } else {
        throw new Error('Logout failed');
      }
    } catch (error) {
      console.error('Error during logout:', error);
      toast.error(error?.response?.data?.message || 'Something went wrong.');
    } finally {
      dispatch(setLoading(false));
    }
  };
}

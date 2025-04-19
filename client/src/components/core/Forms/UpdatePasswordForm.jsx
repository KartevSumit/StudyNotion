import React from 'react';
import { useState } from 'react';
import { BiHide } from 'react-icons/bi';
import { BiShow } from 'react-icons/bi';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { resetPassword } from '../../../services/operations/AuthApi';
import { useNavigate } from 'react-router-dom';

function UpdatePasswordForm() {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = location.pathname.split('/').at(-1);
    try {
      dispatch(
        resetPassword(
          formData.password,
          formData.confirmPassword,
          token,
          navigate
        )
      );
    } catch (error) {
      console.error('Error resetting password:', error);
    }
  };

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleToggleConfirmPassword = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  return (
    <form
      className="flex flex-col gap-4 text-richblack-5 text-lg w-full"
      onSubmit={handleSubmit}
    >
      <label className="flex flex-col gap-2 text-normal w-full relative">
        <h1 className="text-richblack-5">
          New Password<span className="text-pink-200">*</span>
        </h1>
        <input
          type={showPassword ? 'text' : 'password'}
          placeholder="Enter new password"
          className="w-full h-12 p-4 bg-richblack-800 rounded-xl"
          required
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
        <span
          className="absolute right-4 top-12 cursor-pointer"
          onClick={handleTogglePassword}
        >
          {showPassword ? (
            <BiShow className="text-richblack-200 text-2xl" />
          ) : (
            <BiHide className="text-richblack-200 text-2xl" />
          )}
        </span>
      </label>
      <label className="flex flex-col gap-2 text-normal w-full relative">
        <h1 className="text-richblack-5">
          Confirm Password<span className="text-pink-200">*</span>
        </h1>
        <input
          type={showConfirmPassword ? 'text' : 'password'}
          placeholder="Confirm new password"
          className="w-full h-12 p-4 bg-richblack-800 rounded-xl"
          required
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
        />
        <span
          className="absolute right-4 top-12 cursor-pointer"
          onClick={handleToggleConfirmPassword}
        >
          {showConfirmPassword ? (
            <BiShow className="text-richblack-200 text-2xl" />
          ) : (
            <BiHide className="text-richblack-200 text-2xl" />
          )}
        </span>
      </label>

      <button className="bg-yellow-50 w-full h-12 rounded-xl mt-4 text-richblack-900 font-semibold">
        Update Password
      </button>
    </form>
  );
}

export default UpdatePasswordForm;

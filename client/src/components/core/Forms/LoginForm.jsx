import React, { useState } from 'react';
import { BiHide, BiShow } from 'react-icons/bi';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { loginUser } from '../../../services/operations/AuthApi';

function LoginForm({ role }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleTogglePassword = () => setShowPassword((p) => !p);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(formData.email, formData.password, navigate, role));
  };

  return (
    <form
      className="flex flex-col gap-4 text-richblack-200 text-lg"
      onSubmit={handleSubmit}
    >
      <label className="flex flex-col gap-2">
        <span className="text-richblack-5">
          Email<span className="text-pink-200">*</span>
        </span>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter email"
          required
          className="w-full h-12 p-4 bg-richblack-800 rounded-xl text-richblack-5"
          autoComplete="email"
          spellCheck="false"
          autoCapitalize="none"
          autoCorrect="off"
        />
      </label>

      <label className="flex flex-col gap-2 relative">
        <span className="text-richblack-5">
          Password<span className="text-pink-200">*</span>
        </span>
        <input
          type={showPassword ? 'text' : 'password'}
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter password"
          required
          className="w-full h-12 p-4 bg-richblack-800 rounded-xl text-richblack-5"
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
        <Link
          to="/forgot-password"
          className="text-blue-100 text-sm text-end mt-1 w-full"
        >
          Forgot Password?
        </Link>
      </label>

      <button className="bg-yellow-50 w-full h-12 rounded-xl mt-4 text-richblack-900 font-semibold">
        {role === 'Instructor' ? 'Instructor Login' : 'Student Login'}
      </button>
    </form>
  );
}

export default LoginForm;

import React from 'react';
import { Link } from 'react-router-dom';

function LoginForm() {
  return (
    <div>
      <form className="flex flex-col gap-4 text-richblack-200 text-lg ">
        <label className="flex flex-col gap-2">
          <h1 className="text-richblack-5 text-normal">
            Email<span className="text-pink-200">*</span>
          </h1>

          <input
            type="email"
            placeholder="Enter email"
            required
            className="w-full h-12 p-4 bg-richblack-800 rounded-xl"
          />
        </label>
        <label className="flex flex-col gap-2 text-normal">
          <h1 className="text-richblack-5 ">
            Password<span className="text-pink-200">*</span>
          </h1>
          <input
            type="password"
            placeholder="Enter password"
            className="w-full h-12 p-4 bg-richblack-800 rounded-xl"
            required
          />
          <Link
            to="/forgot-password"
            className="text-blue-100 text-sm text-end mt-1 w-full"
          >
            Forgot Password
          </Link>
        </label>
        <button className="bg-yellow-50 w-full h-12 rounded-xl mt-4 text-richblack-900 font-semibold">
          Login
        </button>
      </form>
    </div>
  );
}

export default LoginForm;

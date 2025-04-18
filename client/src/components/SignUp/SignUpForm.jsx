import { React, useState } from 'react';
import countryCodes from '../../data/countrycode.json';
import { BiHide } from 'react-icons/bi';
import { BiShow } from 'react-icons/bi';

function SignUpForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleToggleConfirmPassword = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  return (
    <div>
      <form className="flex flex-col gap-4 text-richblack-200 text-lg ">
        <div className="flex gap-4">
          <label className="text-richblack-5 flex flex-col gap-2">
            <h1>
              First Name<span className="text-pink-200">*</span>
            </h1>
            <input
              type="text"
              placeholder="Enter First Name"
              required
              className="w-full h-12 p-4 bg-richblack-800 rounded-xl"
            />
          </label>
          <label className="text-richblack-5 flex flex-col gap-2">
            <h1>
              Last Name<span className="text-pink-200">*</span>
            </h1>
            <input
              type="text"
              placeholder="Enter Last Name"
              required
              className="w-full h-12 p-4 bg-richblack-800 rounded-xl"
            />
          </label>
        </div>
        <label className="text-richblack-5 flex flex-col gap-2">
          <h1 className=" text-normal">
            Email<span className="text-pink-200">*</span>
          </h1>

          <input
            type="email"
            placeholder="Enter email"
            required
            className="w-full h-12 p-4 bg-richblack-800 rounded-xl"
          />
        </label>
        <label className="text-richblack-5 flex flex-col gap-2">
          <h1 className="text-normal">
            Phone Number<span className="text-pink-200">*</span>
          </h1>
          <div className="flex gap-4">
            <select
              name="countryCode"
              defaultValue="+91"
              id="code"
              className="w-1/4 h-12 p-2 bg-richblack-800 rounded-xl text-center text-richblack-5"
            >
              {countryCodes.map((code) => (
                <option
                  key={code.code}
                  value={code.code}
                  className="text-richblack-200 w-16"
                >
                  {code.code}
                </option>
              ))}
            </select>
            <input
              type="tel"
              placeholder="12345 67890"
              className="w-full h-12 p-4 bg-richblack-800 rounded-xl"
              required
            />
          </div>
        </label>
        <div className="flex gap-4 text-normal ">
          <label className="text-richblack-5 flex flex-col gap-2 relative">
            <h1 className="">
              Password<span className="text-pink-200">*</span>
            </h1>
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter password"
              className="w-full h-12 p-4 bg-richblack-800 rounded-xl pr-12"
              required
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
          <label className="text-richblack-5 flex flex-col gap-2 relative">
            <h1 className="text-normal">
              Confirm Password<span className="text-pink-200">*</span>
            </h1>
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="Enter password"
              className="w-full h-12 p-4 bg-richblack-800 rounded-xl pr-12"
              required
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
        </div>
        <button className="bg-yellow-50 w-full h-12 rounded-xl text-richblack-900 font-semibold mt-4">
          Create Account
        </button>
      </form>
    </div>
  );
}

export default SignUpForm;

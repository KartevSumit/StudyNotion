import { React, useState } from 'react';
import countryCodes from '../../../data/countrycode.json';
import { BiHide } from 'react-icons/bi';
import { BiShow } from 'react-icons/bi';

function SignUpForm({ role }) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    countryCode: '+91',
    password: '',
    confirmPassword: '',
    accountType: role,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleToggleConfirmPassword = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log(formData);
  };

  return (
    <div>
      <form
        className="flex flex-col gap-4 text-richblack-200 text-lg "
        onSubmit={handleSubmit}
      >
        <div className="flex gap-4">
          <label className="text-richblack-5 flex flex-col gap-2">
            <h1>
              First Name<span className="text-pink-200">*</span>
            </h1>
            <input
              type="text"
              placeholder="Enter First Name"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
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
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
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
            name="email"
            value={formData.email}
            onChange={handleChange}
            autoComplete="email"
            spellCheck="false"
            autoCapitalize="none"
            autoCorrect="off"
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
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
              onChange={handleChange}
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
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              pattern="[0-9]{10}"
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
          <label className="text-richblack-5 flex flex-col gap-2 relative">
            <h1 className="text-normal">
              Confirm Password<span className="text-pink-200">*</span>
            </h1>
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="Enter password"
              className="w-full h-12 p-4 bg-richblack-800 rounded-xl pr-12"
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
        </div>
        <button className="bg-yellow-50 w-full h-12 rounded-xl text-richblack-900 font-semibold mt-4">
          Send OTP
        </button>
      </form>
    </div>
  );
}

export default SignUpForm;

import React from 'react';
import { useDispatch } from 'react-redux';
import { getPasswordResetToken } from '../../../services/operations/AuthApi';
import { useSelector } from 'react-redux';
import { setEmail } from '../../../slices/authSlice';

function ForgotPasswordForm() {
  const dispatch = useDispatch();
  const emailSent = useSelector((state) => state.auth.emailSent);
  const email = useSelector((state) => state.auth.email);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(getPasswordResetToken());
  };
  return (
    <div className="w-full">
      {!emailSent && (
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 text-richblack-200 text-lg w-full"
        >
          <label className="flex flex-col gap-2 text-normal w-full">
            <h1 className="text-richblack-5">
              Email
              <span className="text-pink-200">*</span>
            </h1>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => dispatch(setEmail(e.target.value))}
              className="w-full h-12 p-4 bg-richblack-800 rounded-xl text-richblack-5"
              required
            />
          </label>
          <button className="bg-yellow-50 w-full h-12 rounded-xl mt-4 text-richblack-900 font-semibold">
            Reset Password
          </button>
        </form>
      )}
      {emailSent && (
        <button
          className="bg-yellow-50 w-full h-12 rounded-xl mt-4 text-richblack-900 font-semibold"
          onClick={handleSubmit}
        >
          Resend Email
        </button>
      )}
    </div>
  );
}

export default ForgotPasswordForm;

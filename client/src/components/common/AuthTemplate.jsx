import React from 'react';
import { GoHistory } from 'react-icons/go';
import { FaArrowLeftLong } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { sendOtp } from '../../services/operations/AuthApi';
import { useNavigate } from 'react-router-dom';

function AuthTemplate({ heading, subheading, form, back, resend }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { signupData } = useSelector((state) => state.auth);

  const handleResend = () => {
    const { email } = signupData;
    dispatch(sendOtp(email, navigate));
  };

  return (
    <div className="w-11/12 h-[92vh] flex flex-col items-center justify-center mx-auto">
      <div
        className="w-[26%] flex flex-col items-start gap-4 p-4
      "
      >
        <h1 className="text-4xl font-semibold text-richblack-5">{heading}</h1>
        <p className="text-lg text-richblack-200 mt-2">{subheading}</p>
        {form}
        <div className="flex items-center justify-between w-full">
          {back && (
            <Link
              to="/login"
              className="flex items-center gap-2 text-richblack-5 text-lg mt-4"
            >
              <FaArrowLeftLong />
              Back to Login
            </Link>
          )}
          {resend && (
            <button
              onClick={handleResend}
              className="flex items-center gap-2 justify-center text-blue-200 text-lg mt-4"
            >
              <GoHistory className="text-lg" />
              <h1 className="text-md">Resend it</h1>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default AuthTemplate;

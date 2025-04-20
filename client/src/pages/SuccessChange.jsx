import React from 'react';
import AuthTemplate from '../components/common/AuthTemplate';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setEmail } from '../slices/authSlice';
import Spinner from '../components/common/Spinner';

function SuccessChange() {
  const dispatch = useDispatch();
  const email = useSelector((state) => state.auth.email);
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.auth);

  return loading ? (
    <Spinner />
  ) : (
    <AuthTemplate
      heading={'Reset complete!'}
      subheading={`All done! We have sent an email to ${email} to confirm`}
      form={
        <button
          className="bg-yellow-50 w-full h-12 rounded-xl mt-4 text-richblack-900 font-semibold"
          onClick={() => {
            navigate('/login');
            dispatch(setEmail(''));
          }}
        >
          Return to login
        </button>
      }
    />
  );
}

export default SuccessChange;

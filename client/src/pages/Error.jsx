import React from 'react';
import { useSelector } from 'react-redux';
import Spinner from '../components/common/Spinner';

function Error() {
  const { loading } = useSelector((state) => state.auth);
  return loading ? (
    <Spinner />
  ) : (
    <div className="flex flex-col items-center justify-center h-[92vh] bg-gray-100">
      <h1 className="text-6xl font-bold text-richblack-5">404</h1>
      <p className="mt-4 text-xl text-richblack-200">Page Not Found</p>
    </div>
  );
}

export default Error;

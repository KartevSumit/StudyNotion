import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRightLong } from 'react-icons/fa6';

function Button({ flag, text, linkto, flag2 }) {
  return (
    <Link to={linkto} className="inline-block">
      <div
        className={`${
          flag
            ? 'bg-yellow-50 text-richblack-800'
            : 'bg-richblack-800 text-richblack-5'
        } w-auto p-4 rounded-lg font-semibold shadow-[inset_-2px_-2px_0_0_rgba(255,255,255,0.51)] hover:scale-95 flex items-center gap-4`}
      >
        <h1>{text}</h1>
        {flag2 ? <FaArrowRightLong /> : ''}
      </div>
    </Link>
  );
}

export default Button;

import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function Path({ name }) {
  const { pathname } = useLocation();
  let buttons = pathname.split('/');

  if (buttons[1] === 'catalog') {
    buttons[2] = name;
  }

  return (
    <div className="flex gap-2 text-richblack-300">
      <Link to="/">Home</Link>
      {buttons.map((button, i) => {
        if (!button) return null;

        const pathSlice = `/${buttons.slice(1, i + 1).join('/')}`;
        const isLast = i === buttons.length - 1;

        return (
          <div key={i} className="flex gap-2 items-center">
            <span>/</span>
            {isLast ? (
              <span className="text-yellow-100 capitalize">{button}</span>
            ) : (
              <Link to={pathSlice} className="capitalize">
                {button}
              </Link>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default Path;

import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CgProfile } from 'react-icons/cg';
import { PiGraduationCapFill } from 'react-icons/pi';
import { BsCart2 } from 'react-icons/bs';
import { CiSettings } from 'react-icons/ci';
import { IoIosLogOut } from 'react-icons/io';

const linkset1 = [
  {
    head: 'My Profile',
    icon: <CgProfile className="text-lg" />,
    value: 'profile',
  },
  {
    head: 'Enrolled Courses',
    icon: <PiGraduationCapFill className="text-lg" />,
    value: 'enrolled-courses',
  },
  {
    head: 'Cart',
    icon: <BsCart2 className="text-lg" />,
    value: 'cart',
  },
];

const linkset2 = [
  {
    head: 'Settings',
    icon: <CiSettings className="text-lg" />,
    value: 'setting',
  },
  {
    head: 'Logout',
    icon: <IoIosLogOut className="text-lg" />,
    value: 'Logout',
  },
];

function SidePanel() {
  const location = useLocation();
  const [path, setpath] = useState('profile');

  useEffect(() => {
    setpath(location.pathname.split('/')[2]);
  }, [location]);

  console.log(path);

  return (
    <div className="w-[15%] h-full bg-richblack-800 flex flex-col items-center">
      <div className="w-full flex flex-col items-start py-6 mt-10">
        {linkset1.map((link) => (
          <Link
            to={`/dashboard/${link.value}`}
            className={`w-full items-center pl-8 p-1 justify-start gap-3 flex ${
              path === link.value
                ? 'text-yellow-25 pl-7 bg-yellow-800 border-l-4 border-yellow-25'
                : 'text-richblack-200'
            }`}
          >
            {link.icon}
            <h1>{link.head}</h1>
          </Link>
        ))}
      </div>
      <div className="w-[80%] border-b-[1px] border-richblack-600"></div>
      <div className="w-full flex flex-col items-start py-6">
        {linkset2.map((link) => (
          <Link
            to={`/dashboard/${link.value}`}
            className={`w-full items-center pl-8 p-1 justify-start gap-3 flex ${
              path === link.value
                ? 'text-yellow-25 pl-7 bg-yellow-800 border-l-4 border-yellow-25'
                : 'text-richblack-200'
            }`}
          >
            {link.icon}
            <h1>{link.head}</h1>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default SidePanel;

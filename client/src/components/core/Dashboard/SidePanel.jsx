import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { CiSettings } from 'react-icons/ci';
import { IoIosLogOut } from 'react-icons/io';
import { sidebarLinks } from '../../../data/dashboard-links';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../../services/operations/AuthApi';
import ConfirmationModal from '../../common/ConfirmationModal';

const link = {
  head: 'Settings',
  icon: <CiSettings className="text-lg" />,
  value: 'settings',
};
const setting = {
  head: 'Logout',
  icon: <IoIosLogOut className="text-lg" />,
  value: 'Logout',
};

function SidePanel() {
  const location = useLocation();
  const [path, setpath] = useState('/dashboard/my-profile');
  const { user } = useSelector((state) => state.profile);
  const [modal, setModal] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    setpath(location.pathname);
  }, [location]);

  //console.log(path);

  return (
    <div className="w-[15%] h-full bg-richblack-800 flex flex-col items-center">
      <div className="w-full flex flex-col items-start py-6 mt-10">
        {sidebarLinks.map(
          (link) =>
            (link.type === undefined || user.accountType === link.type) && (
              <Link
                key={link.name}
                to={link.path}
                className={`w-full items-center pl-8 p-1 justify-start gap-3 flex ${
                  path === link.path
                    ? 'text-yellow-25 pl-7 bg-yellow-800 border-l-4 border-yellow-25'
                    : 'text-richblack-200'
                }`}
              >
                {link.icon}
                <h1>{link.name}</h1>
              </Link>
            )
        )}
      </div>
      <div className="w-[80%] border-b-[1px] border-richblack-600"></div>
      <div className="w-full flex flex-col items-start py-6">
        <Link
          to={`/dashboard/${link.value}`}
          className={`w-full items-center pl-8 p-1 justify-start gap-3 flex ${
            path === `/dashboard/${link.value}`
              ? 'text-yellow-25 pl-7 bg-yellow-800 border-l-4 border-yellow-25'
              : 'text-richblack-200'
          }`}
        >
          {link.icon}
          <h1>{link.head}</h1>
        </Link>
        <button
          className={`w-full items-center pl-8 p-1 justify-start gap-3 flex text-richblack-200`}
          onClick={() => {
            setModal({
              heading: 'Are you sure?',
              description: 'You will be logged out of your account',
              text1: 'Logout',
              text2: 'Cancel',
              customClass1: `bg-yellow-100`,
              customClass2: `bg-richblack-400`,
              onClick2: () => setModal(null),
              onClick1: () => {
                dispatch(logoutUser(navigate));
                setModal(null);
              },
            });
          }}
        >
          {setting.icon}
          <h1>{setting.head}</h1>
        </button>
      </div>
      {modal && <ConfirmationModal modalData={modal} />}
    </div>
  );
}

export default SidePanel;

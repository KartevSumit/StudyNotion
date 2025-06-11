import { ACCOUNT_TYPE } from '../utils/constants';
import {
  VscAccount,
  VscDashboard,
  VscVm,
  VscAdd,
  VscMortarBoard,
} from 'react-icons/vsc';
import { FaCartShopping } from 'react-icons/fa6';

export const sidebarLinks = [
  {
    id: 1,
    name: 'My Profile',
    path: '/dashboard/my-profile',
    icon: <VscAccount className="text-lg" />,
  },
  {
    id: 2,
    name: 'Dashboard',
    path: '/dashboard/instructor',
    type: ACCOUNT_TYPE.INSTRUCTOR,
    icon: <VscDashboard className="text-lg" />,
  },
  {
    id: 3,
    name: 'My Courses',
    path: '/dashboard/my-courses',
    type: ACCOUNT_TYPE.INSTRUCTOR,
    icon: <VscVm className="text-lg" />,
  },
  {
    id: 4,
    name: 'Add Course',
    path: '/dashboard/add-course',
    type: ACCOUNT_TYPE.INSTRUCTOR,
    icon: <VscAdd className="text-lg" />,
  },
  {
    id: 5,
    name: 'Enrolled Courses',
    path: '/dashboard/enrolled-courses',
    type: ACCOUNT_TYPE.STUDENT,
    icon: <VscMortarBoard className="text-lg" />,
  },
  {
    id: 6,
    name: 'My Wishlist',
    path: '/dashboard/wishlist',
    type: ACCOUNT_TYPE.STUDENT,
    icon: <FaCartShopping className="text-lg" />,
  },
];

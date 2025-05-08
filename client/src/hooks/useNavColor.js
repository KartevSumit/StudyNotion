import { useLocation } from 'react-router-dom';

export default function useNavColor() {
  const { pathname } = useLocation();

  // Map routes → colors
  const map = {
    '/dashboard/profile': 'bg-richblack-800',
    '/dashboard/cart': 'bg-richblack-800',
    default: 'bg-richblack-900',
  };

  return map[pathname] || map.default;
};


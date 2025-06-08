import { useLocation } from 'react-router-dom';

export default function useNavColor() {
  const { pathname } = useLocation();

  const matchRoute = (path) => {
    if (path === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(path);
  };

  // Map routes → colors
  const map = {
    '/dashboard': 'bg-richblack-800',
    '/catalog/:catalogId': 'bg-richblack-800',
    '/course/:courseId': 'bg-richblack-800',
    default: 'bg-richblack-900',
  };

  if (matchRoute('/dashboard')) return map['/dashboard'];
  if (matchRoute('/dashboard/cart')) return map['/dashboard/cart'];
  if (matchRoute('/catalog')) return map['/catalog/:catalogId'];
  if (matchRoute('/course')) return map['/course/:courseId'];
  return map.default;
}

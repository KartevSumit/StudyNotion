import React from 'react';
import logo from '../../assets/Logo/Logo-Full-Light.png';
import { NavbarLinks } from '../../data/navbar-links';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FaCartShopping } from 'react-icons/fa6';

function NavBar() {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const { totalItems } = useSelector((state) => state.cart);

  const location = useLocation();
  const matchRoute = (path) => {
    const currentPath = location.pathname;
    return currentPath === path;
  };

  return (
    <div className="w-full h-16 flex items-center justify-around border-b-2 border-richblack-700 font-semibold text-lg">
      <div>
        <img src={logo} alt="Description" />
      </div>
      <div className="flex gap-4">
        {NavbarLinks.map((link) => {
          if (link.title !== 'Catalog') {
            return (
              link.title !== 'Catalog' && (
                <Link to={link.path} key={link.title}>
                  <button
                    className={`bg-transparent ${
                      matchRoute(link.path)
                        ? 'text-yellow-50'
                        : 'text-richblack-5'
                    } px-4 py-2 rounded-lg`}
                  >
                    {link.title}
                  </button>
                </Link>
              )
            );
          } else {
            return null;
          }
        })}
      </div>
      <div className="flex gap-4">
        {user && user?.accountType === 'Student' && (
          <Link to="/dashboard/cart" className="relative">
            <FaCartShopping />
            {totalItems > 0 && (
              <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full px-2 py-1 text-xs">
                {totalItems}
              </span>
            )}
          </Link>
        )}
        {token === null && (
          <Link to="/login">
            <button className=" text-richblack-5 px-4 py-2 rounded-lg">
              Login
            </button>
          </Link>
        )}
        {token === null && (
          <Link to="/signup">
            <button className=" text-richblack-5 px-4 py-2 rounded-lg">
              Sign Up
            </button>
          </Link>
        )}
      </div>
    </div>
  );
}

export default NavBar;

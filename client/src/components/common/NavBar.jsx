import React, { useEffect, useState, useRef } from 'react';
import logo from '../../assets/Logo/Logo-Full-Light.png';
import { NavbarLinks } from '../../data/navbar-links';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FaCartShopping } from 'react-icons/fa6';
//import ProfileDropDown from '../core/Auth/ProfileDropDown';
import { apiConnector } from '../../services/apiConnector';
import { COURSE_API } from '../../services/apis';
import { IoIosArrowDown } from 'react-icons/io';
import Tilt from 'react-parallax-tilt';
import { useDispatch } from 'react-redux';
import { setLoading } from '../../slices/authSlice';
import { logoutUser } from '../../services/operations/AuthApi';

export default function NavBar() {
  const { token } = useSelector((s) => s.auth);
  const { user } = useSelector((s) => s.profile);
  const { totalItems } = useSelector((s) => s.cart);
  const [showDropdown, setShowDropdown] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [sublinks, setSublinks] = useState([]);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [activeIdx, setActiveIdx] = useState(null);
  const itemRefs = useRef([]);
  const dispatch = useDispatch();

  const Render = async () => {
    dispatch(setLoading(true));
    try {
      const res = await apiConnector('GET', COURSE_API.GET_ALL_CATEGORIES);
      setSublinks(res.data.data || []);
    } catch (err) {
      console.error('Error fetching sublinks:', err);
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    Render();
  }, []);

  const location = useLocation();
  const navigate = useNavigate();
  const matchRoute = (path) => location.pathname === path;

  const handleMotion = (e, idx) => {
    const rect = itemRefs.current[idx].getBoundingClientRect();
    setActiveIdx(idx);
    setPosition({ x: e.clientX - rect.left, y: 0 });
  };

  const handleLeave = () => {
    setActiveIdx(null);
  };

  const handleMouseEnter = () => {
    setHovered(true);
  };
  const handleMouseLeave = () => {
    setHovered(false);
  };
  const handleDropdownClick = () => {
    setShowDropdown(!showDropdown);
  };
  const handleLinkClick = () => {
    setShowDropdown(false);
    setHovered(false);
  };

  const logoutHandler = async () => {
    try {
      dispatch(logoutUser(navigate));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full h-16 flex items-center justify-around border-b-2 border-richblack-700 font-semibold text-lg">
      <Link to={'/'}>
        <img src={logo} alt="Logo" />
      </Link>

      <div className="flex gap-4 h-full items-center">
        {NavbarLinks.map((link) =>
          link.title !== 'Catalog' ? (
            <Link key={link.title} to={link.path}>
              <button
                className={`bg-transparent px-4 py-2 rounded-lg h-full ${
                  matchRoute(link.path) ? 'text-yellow-50' : 'text-richblack-5'
                }`}
              >
                {link.title}
              </button>
            </Link>
          ) : (
            <div
              key={link.title}
              className="group relative h-full flex items-center justify-center"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <button
                onClick={handleDropdownClick}
                className={`bg-transparent pl-4 p-2 rounded-lg ${
                  matchRoute(link.path) ? 'text-yellow-50' : 'text-richblack-5'
                }`}
              >
                Category
              </button>
              <IoIosArrowDown className="text-richblack-5 text-base absolute -right-3 top-6 transform group-hover:-rotate-180 transition-all duration-300" />

              <div
                className={`${
                  showDropdown || hovered ? 'flex' : 'hidden'
                } flex-col items-center gap-2 bg-white absolute top-14 p-4 rounded-lg shadow-lg z-50 left-1/2 -translate-x-1/2`}
              >
                {sublinks.length > 0 &&
                  sublinks.map((item, idx) => (
                    <div
                      key={item._id}
                      ref={(el) => (itemRefs.current[idx] = el)}
                      onMouseMove={(e) => handleMotion(e, idx)}
                      onMouseLeave={handleLeave}
                      className="relative font-medium text-center text-md w-32 cursor-pointer group"
                      onClick={handleLinkClick}
                    >
                      <Tilt
                        tiltAxis="y"
                        tiltMaxAngleY={20}
                        perspective={1000}
                        scale={1.05}
                        transitionSpeed={300}
                        gyroscope={true}
                        className="w-full relative z-10"
                      >
                        <button className="w-full h-8 truncate z-10 relative text-richblack-900 bg-white rounded-md px-1 shadow-md">
                          {item.name}
                        </button>
                      </Tilt>
                      {activeIdx === idx && (
                        <span
                          className="absolute w-[35%] h-6 bg-black rounded-full filter pointer-events-none blur-md transition-opacity duration-300 -translate-x-1/2 translate-y-1 z-0"
                          style={{ left: position.x, top: position.y }}
                        />
                      )}
                    </div>
                  ))}
              </div>
            </div>
          )
        )}
      </div>

      <div className="h-full flex gap-4 items-center">
        {user?.accountType === 'Student' && (
          <Link to="/dashboard/cart" className="relative p-2">
            <FaCartShopping className="text-2xl text-richblack-5" />
            {totalItems > 0 && (
              <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full px-2 py-1 text-xs">
                {totalItems}
              </span>
            )}
          </Link>
        )}
        {!token ? (
          <>
            <Link to="/login">
              <button className="text-richblack-5 px-4 py-2 rounded-lg">
                Login
              </button>
            </Link>
            <Link to="/signup">
              <button className="text-richblack-5 px-4 py-2 rounded-lg">
                Sign Up
              </button>
            </Link>
          </>
        ) : (
          <>
            <Link to="/dashboard/profile" className="m-auto w-10 h-10">
              <button className="w-10 h-10 rounded-full overflow-hidden m-auto">
                <img
                  src={user?.image}
                  alt="Profile"
                  className="w-full h-full object-cover object-center rounded-full"
                />
              </button>
            </Link>
            <button onClick={logoutHandler}>
              <h1 className="text-richblack-5 p-2">Logout</h1>
            </button>
          </>
        )}
      </div>
    </div>
  );
}

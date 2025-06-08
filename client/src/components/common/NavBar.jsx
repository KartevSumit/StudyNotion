import React, { useEffect, useState, useRef, useCallback } from 'react';
import logo from '../../assets/Logo/Logo-Full-Light.png';
import { NavbarLinks } from '../../data/navbar-links';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FaCartShopping } from 'react-icons/fa6';
//import ProfileDropDown from '../core/Auth/ProfileDropDown';
import { apiConnector } from '../../services/apiConnector';
import { COURSE_API } from '../../services/apis';
import { IoIosArrowDown } from 'react-icons/io';
import Tilt from 'react-parallax-tilt';
import { useDispatch } from 'react-redux';
import { setLoading } from '../../slices/authSlice';
import { TfiMenuAlt } from 'react-icons/tfi';
import useClickOutside from '../../hooks/useOnClickOutside';
import useNavColor from '../../hooks/useNavColor';
import { setCategories } from '../../slices/courseSlice';
import { sidebarLinks } from '../../data/dashboard-links';
import { CiSettings } from 'react-icons/ci';
import { IoIosLogOut } from 'react-icons/io';
import ConfirmationModal from '../common/ConfirmationModal';
import { useNavigate } from 'react-router-dom';
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
  const [showMenu, setShowMenu] = useState(false);
  const itemRefs = useRef([]);
  const dispatch = useDispatch();
  const menuRef = useRef(null);
  const dropdownRef = useRef(null);
  const [ShowDashboard, setShowDashboard] = useState(false);
  const [Modal, setModal] = useState(null);
  const navigate = useNavigate();

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

  useClickOutside(dropdownRef, () => {
    setShowDropdown(false);
    setHovered(false);
  });

  useClickOutside(menuRef, () => {
    setShowMenu(false);
    setShowDropdown(false);
  });

  const fetchSublinks = useCallback(async () => {
    dispatch(setLoading(true));
    try {
      const res = await apiConnector('GET', COURSE_API.GET_ALL_CATEGORIES);
      const categories = res.data.data || [];
      setSublinks(categories);
      dispatch(setCategories(categories));
    } catch (err) {
      console.error('Error fetching categories:', err);
    } finally {
      dispatch(setLoading(false));
    }
  }, [dispatch]);

  useEffect(() => {
    fetchSublinks();
  }, [fetchSublinks]);

  const location = useLocation();
  const matchRoute = (path) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

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
    setShowMenu(false);
  };

  const [path, setpath] = useState('/dashboard/my-profile');

  useEffect(() => {
    setpath(location.pathname);
  }, [location]);

  const { loading } = useSelector((state) => state.auth);
  const NavColor = useNavColor();

  return (
    <div
      className={`w-full h-16 ${
        loading ? `hidden` : `flex`
      } ${NavColor} items-center lg:justify-around justify-between border-b-2 border-richblack-700 font-semibold text-lg px-4`}
    >
      <Link to={'/'}>
        <img src={logo} alt="Logo" />
      </Link>

      <div className="hidden lg:flex gap-4 h-full items-center">
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
                className={`bg-transparent pl-4 pr-7 p-2 rounded-lg ${
                  matchRoute(link.path) ? 'text-yellow-50' : 'text-richblack-5'
                }`}
              >
                Category
              </button>
              <IoIosArrowDown className="text-richblack-5 text-base absolute right-1 top-6 transform group-hover:-rotate-180 transition-all duration-300" />

              <div
                ref={dropdownRef}
                className={`${
                  showDropdown || hovered ? 'flex' : 'hidden'
                } flex-col items-center gap-2 bg-white absolute top-14 p-4 rounded-lg shadow-lg z-50 left-1/2 -translate-x-1/2`}
              >
                {sublinks.length > 0 &&
                  sublinks.map((item, idx) => (
                    <Link
                      key={item._id}
                      to={`/catalog/${item._id}`}
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
                    </Link>
                  ))}
              </div>
            </div>
          )
        )}
      </div>

      <div className="hidden h-full lg:flex gap-4 items-center relative">
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
            <Link to="/dashboard/my-profile" className="m-auto w-10 h-10">
              <button className="w-10 h-10 rounded-full overflow-hidden m-auto">
                <img
                  src={user?.image}
                  alt="Profile"
                  className="w-full h-full object-cover object-center rounded-full"
                />
              </button>
            </Link>
          </>
        )}
      </div>

      <div className="flex lg:hidden h-full items-center gap-4">
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
        {token && (
          <div className="relative flex items-center justify-center">
            <button
              className="w-10 h-10 rounded-full overflow-hidden m-auto"
              onClick={() => setShowDashboard(!ShowDashboard)}
            >
              <img
                src={user?.image}
                alt="Profile"
                className="w-full h-full object-cover object-center rounded-full"
              />
            </button>
            {ShowDashboard && (
              <div className="absolute border-2 border-dashed border-blue-400 w-48 flex flex-col items-center justify-center top-12 bg-richblack-700 z-50 left-1/2 -translate-x-1/2 py-4">
                {sidebarLinks.map(
                  (link) =>
                    (link.type === undefined ||
                      user.accountType === link.type) && (
                      <Link
                        key={link.name}
                        to={link.path}
                        onClick={() => setShowDashboard(false)}
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
                <div className="w-full flex flex-col items-start py-2">
                  <Link
                    to={`/dashboard/${link.value}`}
                    onClick={() => setShowDashboard(false)}
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
                      setShowDashboard(false);
                    }}
                  >
                    {setting.icon}
                    <h1>{setting.head}</h1>
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
        <button
          onClick={() => setShowMenu(!showMenu)}
          className={`transition-transform duration-300 p-4 text-white rounded 
    ${showMenu ? 'rotate-180' : 'rotate-0'}`}
        >
          <TfiMenuAlt className="text-richblack-5 text-3xl" />
        </button>
      </div>

      {showMenu && (
        <div className="lg:hidden absolute top-16 left-0 w-full min-h-[93vh] bg-richblack-300/10 backdrop-blur-md border border-white/20 flex flex-col items-center justify-center gap-4 z-50 rounded-lg shadow-xl">
          <div
            className="flex flex-col items-center justify-center gap-4"
            ref={menuRef}
          >
            {NavbarLinks.map((link) =>
              link.title !== 'Catalog' ? (
                <Link key={link.title} to={link.path}>
                  <button
                    onClick={() => {
                      setShowMenu(false);
                      setShowDropdown(false);
                    }}
                    className={`bg-transparent px-4 py-2 rounded-lg h-full ${
                      matchRoute(link.path)
                        ? 'text-yellow-50'
                        : 'text-richblack-5'
                    } text-2xl font-bold`}
                  >
                    {link.title}
                  </button>
                </Link>
              ) : (
                <div
                  key={link.title}
                  className="group relative min-h-full flex flex-col items-center justify-center"
                >
                  <div className="flex items-center justify-center">
                    <button
                      onClick={handleDropdownClick}
                      className={`bg-transparent pl-4 p-2 rounded-lg ${
                        matchRoute(link.path)
                          ? 'text-yellow-50'
                          : 'text-richblack-5'
                      } text-2xl font-bold`}
                    >
                      Category
                    </button>
                    <IoIosArrowDown className="text-richblack-5 text-base transform group-hover:-rotate-180 transition-all duration-300" />
                  </div>

                  <div
                    className={`${
                      showDropdown ? 'flex' : 'hidden'
                    } flex-col items-center gap-2 bg-richblack-5 p-4 rounded-lg shadow-lg`}
                    ref={dropdownRef}
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
                            <button className="w-full h-8 truncate z-10 relative text-richblack-900 bg-richblack-5 rounded-md px-1 shadow-md">
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
            {!token && (
              <>
                <Link to="/login">
                  <button
                    onClick={() => setShowMenu(false)}
                    className="text-richblack-5 px-4 py-2 rounded-lg text-2xl font-bold"
                  >
                    Login
                  </button>
                </Link>
                <Link to="/signup">
                  <button
                    onClick={() => setShowMenu(false)}
                    className="text-richblack-5 px-4 py-2 rounded-lg text-2xl font-bold"
                  >
                    Sign Up
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
      {Modal && <ConfirmationModal modalData={Modal} />}
    </div>
  );
}

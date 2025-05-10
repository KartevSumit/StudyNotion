import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import NavBar from './components/common/NavBar';
import ForgotPassword from './pages/ForgotPassword';
import Error from './pages/Error';
import UpdatePassword from './pages/UpdatePassword';
import VerifyEmail from './pages/VerifyEmail';
import SuccessChange from './pages/SuccessChange';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setToken } from './slices/authSlice';
import { setUser } from './slices/profileSlice';
import Aboutus from './pages/Aboutus';
import Contact from './pages/Contact';
import toast from 'react-hot-toast';
import ProtectRoute from './auth/ProtectRoute';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Dashboard/Profile';
import Settings from './pages/Dashboard/Settings';
import EnrolledCourses from './pages/Dashboard/EnrolledCourse';
import Cart from './pages/Dashboard/Cart';

function App() {
  const dispatch = useDispatch();

  function isTokenExpired() {
    const token = localStorage.getItem('token');
    if (!token) return true;

    const payload = token.split('.')[1];
    const decodedPayload = JSON.parse(atob(payload));
    return decodedPayload.exp * 1000 < Date.now();
  }

  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    if (token) {
      if (isTokenExpired()) {
        toast.error('Session Expired');
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        dispatch(setToken(null));
        dispatch(setUser(null));
      } else {
        dispatch(setToken(token));
        dispatch(setUser(JSON.parse(user)));
      }
    }
  }, [dispatch]);

  return (
    <div className="w-full min-h-screen bg-richblack-900 flex flex-col font-inter">
      <NavBar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/error" element={<Error />} />
        <Route path="/update-password/:token" element={<UpdatePassword />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/successChange" element={<SuccessChange />} />
        <Route path="/about" element={<Aboutus />} />
        <Route path="/contact" element={<Contact />} />

        <Route
          element={
            <ProtectRoute>
              <Dashboard />
            </ProtectRoute>
          }
        >
          <Route path="/dashboard/my-profile" element={<Profile />} />
          <Route path="/dashboard/settings" element={<Settings />} />
          <Route
            path="/dashboard/enrolled-courses"
            element={<EnrolledCourses />}
          />
          <Route path="/dashboard/cart" element={<Cart />} />
          
        </Route>
        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  );
}

export default App;

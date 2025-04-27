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

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    if (token) {
      dispatch(setToken(token));
    }
    if (user) {
      dispatch(setUser(JSON.parse(user)));
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
        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  );
}

export default App;

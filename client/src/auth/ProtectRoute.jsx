import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';

function ProtectRoute({ children }) {
  const { user } = useSelector((state) => state.profile);
  if (!user) {
    toast.error('First need to log in');
  }
  return user ? children : <Navigate to="/login"></Navigate>;
}

export default ProtectRoute;

import React from 'react';
import { Outlet } from 'react-router-dom';
import SidePanel from '../components/core/Dashboard/SidePanel';
import { useSelector } from 'react-redux';
import Spinner from '../components/common/Spinner';

function Dashboard() {
  const { loading: authloading } = useSelector((state) => state.auth);
  const { loading: profileloading } = useSelector((state) => state.profile);
  if (authloading || profileloading) {
    return <Spinner />;
  }
  return (
    <div className="w-full h-[93vh] flex">
      <SidePanel></SidePanel>
      <Outlet></Outlet>
    </div>
  );
}

export default Dashboard;

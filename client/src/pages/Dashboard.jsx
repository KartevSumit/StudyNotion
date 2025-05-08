import React from 'react';
import { Outlet } from 'react-router-dom';
import SidePanel from '../components/core/Dashboard/SidePanel';

function Dashboard() {
  return (
    <div className="w-full h-[93vh] flex">
      <SidePanel></SidePanel>
      <Outlet></Outlet>
    </div>
  );
}

export default Dashboard;

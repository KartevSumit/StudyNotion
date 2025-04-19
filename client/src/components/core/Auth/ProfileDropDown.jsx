import React from 'react';
import { Link } from 'react-router-dom';

function ProfileDropDown({ data }) {
  return <div>
    <Link to='/dashboard'>
      <button>Dashboard</button>
    </Link>
    <Link to='/profile'>
      <button>Profile</button>
    </Link>
    <Link to='/settings'>
      <button>Settings</button>
    </Link>
    <Link to='/logout'>
      <button>Logout</button>
    </Link>
  </div>;
}

export default ProfileDropDown;

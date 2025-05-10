import React from 'react';
import { LiaEdit } from 'react-icons/lia';
import { useNavigate } from 'react-router-dom';

function EditButton() {
  const navigate = useNavigate();
  return (
    <button
      className="bg-yellow-50 flex p-2 px-3 gap-2 rounded-lg items-center"
      onClick={() => navigate('/dashboard/settings')}
    >
      <h1 className="text-richblack-900 text-lg">Edit</h1>
      <LiaEdit className="text-richblack-900 text-lg"></LiaEdit>
    </button>
  );
}

export default EditButton;

import React from 'react';
import { LiaEdit } from 'react-icons/lia';

function EditButton() {
  return (
    <button className="bg-yellow-50 flex p-2 px-3 gap-2 rounded-lg items-center">
      <h1 className="text-richblack-900 text-lg">Edit</h1>
      <LiaEdit className="text-richblack-900 text-lg"></LiaEdit>
    </button>
  );
}

export default EditButton;

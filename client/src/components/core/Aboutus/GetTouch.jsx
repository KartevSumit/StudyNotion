import React from 'react';
import ContactUsForm from '../Forms/ContactUsForm';

function GetTouch() {
  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <h1 className="text-3xl text-richblack-5 font-semibold">Get in Touch</h1>
      <p className="text-md text-center text-richblack-200">
        We'd love to here for you, Please fill out this form.
      </p>
      <ContactUsForm />
    </div>
  );
}

export default GetTouch;

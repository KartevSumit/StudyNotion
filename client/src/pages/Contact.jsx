import React from 'react';
import { PiChatsCircleDuotone } from 'react-icons/pi';
import { BsGlobeCentralSouthAsia } from 'react-icons/bs';
import { IoCall } from 'react-icons/io5';
import ContactUsForm from '../components/core/Forms/ContactUsForm';
import Footer from '../components/common/Footer';
import ReviewSlider from '../components/common/ReviewSlider';

function Contact() {
  return (
    <div className="w-full min-h-[92vh] flex flex-col items-center gap-6 justify-center">
      <div className="w-full min-h-[92vh] py-24 flex flex-col lg:flex-row lg:items-start items-center justify-center gap-16">
        <div className="w-[90%] h-[45vh] lg:w-[28vw] lg:h-[22vw] flex flex-col items-center justify-around p-8 bg-richblack-800 rounded-xl">
          <div className="w-full flex flex-col items-end gap-1">
            <div className="w-full flex">
              <PiChatsCircleDuotone className="w-[10%] text-xl text-richblack-25" />
              <h1 className="w-[90%]  text-richblack-5 font-semibold text-lg">
                Chat on us
              </h1>
            </div>
            <p className="w-[90%] text-richblack-200 font-medium text-md">
              Our friendly team is here to help.
            </p>
            <p className="w-[90%] text-richblack-200 font-semibold text-md">
              @mail address
            </p>
          </div>
          <div className="w-full flex flex-col items-end gap-1">
            <div className="w-full flex">
              <BsGlobeCentralSouthAsia className="w-[10%] text-xl text-richblack-25" />
              <h1 className="w-[90%]  text-richblack-5 font-semibold text-lg">
                Visit us
              </h1>
            </div>
            <p className="w-[90%] text-richblack-200 font-medium text-md">
              Come and say hello at our office Hq.
            </p>
            <p className="w-[90%] text-richblack-200 font-semibold text-md">
              Here in the location/address
            </p>
          </div>
          <div className="w-full flex flex-col items-end gap-1">
            <div className="w-full flex">
              <IoCall className="w-[10%] text-xl text-richblack-25" />
              <h1 className="w-[90%]  text-richblack-5 font-semibold text-lg">
                Call us
              </h1>
            </div>
            <p className="w-[90%] text-richblack-200 font-medium text-md">
              Mon - Fri From 8am to 5pm
            </p>
            <p className="w-[90%] text-richblack-200 font-semibold text-md">
              +123 456 7890
            </p>
          </div>
        </div>

        <div className="w-[90%] lg:w-[40%] p-12 flex flex-col items-center gap-2 border-richblack-600 border-2 rounded-xl">
          <div className="w-full flex flex-col items-center">
            <h1 className="text-3xl font-semibold text-richblack-5">
              Got a Idea? We've got the skills. Let's team up
            </h1>
            <p className="text-md text-richblack-300 font-medium">
              Tall us more about yourself and what you're got in mind.
            </p>
          </div>
          <ContactUsForm />
        </div>
      </div>
      <div className="w-11/12 flex flex-col items-center gap-6 my-12">
        <h1 className="text-4xl font-semibold text-richblack-5">
          Reviews from other learners
        </h1>
        <ReviewSlider />
      </div>
      <Footer />
    </div>
  );
}

export default Contact;

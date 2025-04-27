import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import countryCodes from '../../../data/countrycode.json';
import { setLoading } from '../../../slices/authSlice';
import { useDispatch } from 'react-redux';

function ContactUsForm() {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm();

  const submitForm = async (data) => {
    dispatch(setLoading(true));
    console.log(data);
    dispatch(setLoading(false));
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        email: '',
        firstName: '',
        lastName: '',
        message: '',
        phoneNo: '',
        countryCode: '+91',
      });
    }
  }, [isSubmitSuccessful, reset]);
  return (
    <form
      className="w-full mt-8 flex flex-col gap-4"
      onSubmit={handleSubmit(submitForm)}
    >
      {/* first name and last name */}
      <div className="w-full flex lg:flex-row flex-col items-center justify-between gap-4">
        <label htmlFor="firstName" className="flex flex-col gap-2 w-full">
          <h1 className="text-richblack-5">First Name</h1>
          <input
            type="text"
            placeholder="Enter your first name"
            {...register('firstName', { required: true })}
            className="w-full h-12 p-4 bg-richblack-800 rounded-xl text-richblack-5"
          />
          {errors.firstName && (
            <span className="text-xs text-pink-200">
              First name is required
            </span>
          )}
        </label>
        <label htmlFor="lastName" className="flex flex-col gap-2 w-full">
          <h1 className="text-richblack-5">Last Name</h1>
          <input
            type="text"
            placeholder="Enter your last name"
            {...register('lastName')}
            className="w-full h-12 p-4 bg-richblack-800 rounded-xl text-richblack-5"
          />
        </label>
      </div>

      {/* email */}
      <label htmlFor="email" className="w-full flex flex-col gap-2">
        <h1 className="text-richblack-5">Email</h1>
        <input
          type="email"
          {...register('email', { required: true })}
          placeholder="Enter email"
          className="w-full h-12 p-4 bg-richblack-800 rounded-xl text-richblack-5"
        />
        {errors.email && (
          <span className="text-xs text-pink-200">Email is required</span>
        )}
      </label>

      {/* phone number */}
      <label className="text-richblack-5 flex flex-col gap-2">
        <h1 className="text-normal">Phone Number</h1>
        <div className="flex gap-4">
          <select
            name="countryCode"
            defaultValue="+91"
            id="code"
            className="w-1/4 h-12 p-2 bg-richblack-800 rounded-xl text-center text-richblack-5"
            {...register('countryCode', { required: true })}
          >
            {countryCodes.map((code) => (
              <option
                key={code.country}
                value={code.code}
                className="text-richblack-200 w-16"
              >
                {code.code}
              </option>
            ))}
          </select>
          <input
            type="tel"
            placeholder="12345 67890"
            name="phoneNumber"
            pattern="[0-9]{10}"
            className="w-full h-12 p-4 bg-richblack-800 rounded-xl"
            {...register('phoneNo', { required: true })}
          />
        </div>
      </label>

      {/* message */}
      <label htmlFor="message" className="flex flex-col gap-2">
        <h1 className="text-richblack-5">Message</h1>
        <textarea
          name="message"
          placeholder="Enter your message"
          rows="4"
          cols="50"
          {...register('firstName', { required: true })}
          className="p-4 bg-richblack-800 rounded-xl text-richblack-5"
        />
      </label>

      <button
        type="submit"
        className="bg-yellow-50 w-full h-12 rounded-xl mt-4 text-richblack-900 font-semibold"
      >
        Send Message
      </button>
    </form>
  );
}

export default ContactUsForm;

import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { X } from 'lucide-react';

function AddRequirements({
  register,
  setValue,
  getValues,
  errors ,
  setError, 
  clearErrors, 
  name = 'Requirements',
  required = true,
}) {
  const [reqs, setReqs] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const { editCourse, course } = useSelector((state) => state.course);

  useEffect(() => {
    register(name, {
      required: required ? 'Please add at least one requirement' : false,
      validate: (value) => {
        if (required && (!value || value.length === 0)) {
          return 'At least one requirement is required';
        }
        return true;
      },
    });
  }, [register, name, required]);

  useEffect(() => {
    if( editCourse && course ) {
      const existing = course.requirements || [];
      if (Array.isArray(existing)) {
        setReqs(existing);
      }
    }
  }, [getValues, name]);

  useEffect(() => {
    setValue(name, reqs); 
    if (reqs.length > 0) {
      clearErrors(name); 
    }
    if (reqs.length === 0 && required) {
      setError(name, {
        type: 'required',
        message: 'At least one requirement is required',
      }); 
    }
  }, [reqs, setValue, name, clearErrors, setError, required]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const addRequirement = () => {
    const newReq = inputValue.trim();
    if (newReq === '') {
      setError(name, {
        type: 'custom',
        message: 'Please input a non-empty requirement',
      }); 
      return;
    }
    if (reqs.includes(newReq)) {
      setError(name, {
        type: 'custom',
        message: 'Requirement already exists',
      }); 
      setInputValue('');
      return;
    }
    setReqs((prev) => {
      const next = [...prev, newReq];
      return next;
    }); 
    setInputValue('');
  };

  const removeReq = (toRemove) => {
    setReqs((prev) => prev.filter((r) => r !== toRemove));
  };

  return (
    <label htmlFor={name} className="flex flex-col w-full gap-2 items-start">
      <h1 className="text-richblack-5 text-xl">
        Requirements/Instructions
        {required && <sup className="text-pink-200 text-xl">*</sup>}
      </h1>

      {reqs.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-2">
          {reqs.map((req, idx) => (
            <span
              key={idx}
              className="inline-flex items-center gap-1 bg-yellow-200 text-richblack-900 px-3 py-1 rounded-full text-lg border border-richblack-500"
            >
              <span>{req}</span>
              <button
                type="button"
                onClick={() => removeReq(req)}
                className="hover:bg-richblack-500 rounded-full p-0.5 transition-colors"
                aria-label={`Remove ${req} requirement`}
              >
                <X
                  size={14}
                  className="text-richblack-900 hover:text-richblack-100"
                />
              </button>
            </span>
          ))}
        </div>
      )}

      <input
        type="text"
        id={name + '_input'}
        value={inputValue}
        onChange={handleInputChange}
        className="bg-richblack-700 rounded-lg p-2 h-12 text-lg text-richblack-5 w-full"
        placeholder="Enter requirement and click Add"
      />

      <input
        type="hidden"
        {...register(name)} 
      />

      <button
        type="button"
        onClick={addRequirement}
        className="text-yellow-50 rounded-lg p-2 h-12 text-xl font-senmibold"
      >
        Add
      </button>

      {errors[name] && (
        <span className="text-pink-200 text-sm">{errors[name].message}</span>
      )}
    </label>
  );
}

export default AddRequirements;

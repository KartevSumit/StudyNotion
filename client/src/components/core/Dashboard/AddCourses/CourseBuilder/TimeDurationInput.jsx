import React, { useEffect } from 'react';
import { FaAngleUp, FaAngleDown } from 'react-icons/fa';

const TimeDurationInput = ({
  register,
  errors,
  setValue,
  defaultValues,
  disabled = false,
}) => {
  useEffect(() => {
    if (defaultValues) {
      setValue('hours', defaultValues.hours || 0);
      setValue('minutes', defaultValues.minutes || 0);
      setValue('seconds', defaultValues.seconds || 0);
    }
  }, [defaultValues, setValue]);

  const adjustValue = (name, change) => {
    if (disabled) return;

    const input = document.querySelector(`input[name="${name}"]`);
    if (!input) return;

    const current = parseInt(input.value) || 0;
    const limits = { hours: 23, minutes: 59, seconds: 59 };
    const newValue = Math.max(0, Math.min(current + change, limits[name]));

    input.value = newValue;
    setValue(name, newValue, { shouldValidate: true });
    input.dispatchEvent(new Event('change', { bubbles: true }));
  };

  const TimeInput = ({ name, max, placeholder }) => (
    <div className="relative w-[30%]">
      <input
        type="number"
        {...register(name, {
          valueAsNumber: true,
          min: 0,
          max,
          value: defaultValues?.[name] || 0,
        })}
        placeholder={placeholder}
        min="0"
        max={max}
        disabled={disabled}
        className={`w-full p-3 pr-8 rounded-md bg-richblack-700 text-richblack-50
          [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none
          [&::-webkit-inner-spin-button]:appearance-none
          ${disabled ? 'opacity-70 cursor-not-allowed' : ''}
        `}
      />
      {!disabled && (
        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex flex-col">
          <button
            type="button"
            onClick={() => adjustValue(name, 1)}
            className="text-richblack-300 hover:text-white text-xs"
          >
            <FaAngleUp />
          </button>
          <button
            type="button"
            onClick={() => adjustValue(name, -1)}
            className="text-richblack-300 hover:text-white text-xs"
          >
            <FaAngleDown />
          </button>
        </div>
      )}
    </div>
  );

  return (
    <div className="flex flex-col">
      <h1 className="text-lg text-richblack-5 font-semibold mb-2">
        Video Playback Time<sup className="text-pink-300">*</sup>
      </h1>
      <div className="flex items-center justify-between">
        <TimeInput name="hours" max={23} placeholder="HH" />
        <span className="text-richblack-300 mx-2">:</span>
        <TimeInput name="minutes" max={59} placeholder="MM" />
        <span className="text-richblack-300 mx-2">:</span>
        <TimeInput name="seconds" max={59} placeholder="SS" />
      </div>
      {!disabled && (errors.hours || errors.minutes || errors.seconds) && (
        <div className="mt-2 text-red-400 text-sm">
          {errors.hours && <p>Enter valid hours (0-23)</p>}
          {errors.minutes && <p>Enter valid minutes (0-59)</p>}
          {errors.seconds && <p>Enter valid seconds (0-59)</p>}
        </div>
      )}
      {disabled && (
        <p className="mt-2 text-richblack-400 text-sm">View only mode</p>
      )}
    </div>
  );
};

export default TimeDurationInput;

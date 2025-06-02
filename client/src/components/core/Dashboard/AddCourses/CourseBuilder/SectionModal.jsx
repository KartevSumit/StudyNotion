import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import UploadFile from '../CourseInformation/UploadFile';
import TimeDurationInput from './TimeDurationInput';
import IconButton from '../../../../common/IconButton';
import { useDispatch, useSelector } from 'react-redux';
import {
  addSubSection,
  updateSubSection,
} from '../../../../../services/operations/SectionApi';
import { setCourse } from '../../../../../slices/courseSlice';
import { toast } from 'react-hot-toast';

function SectionModal({ text, defaultValues, handleCancel }) {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      title: '',
      description: '',
      hours: 0,
      minutes: 0,
      seconds: 0,
      video: null,
    },
  });

  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (
      defaultValues &&
      (defaultValues.mode === 'edit' || defaultValues.mode === 'view')
    ) {
      let hours = 0,
        minutes = 0,
        seconds = 0;

      if (defaultValues.subSection?.timeDuration) {
        const timeParts = defaultValues.subSection.timeDuration.split(':');
        if (timeParts.length === 3) {
          hours = parseInt(timeParts[0]) || 0;
          minutes = parseInt(timeParts[1]) || 0;
          seconds = parseInt(timeParts[2]) || 0;
        }
      }

      reset({
        title: defaultValues.subSection?.title || '',
        description: defaultValues.subSection?.description || '',
        hours: hours,
        minutes: minutes,
        seconds: seconds,
        video: defaultValues.subSection?.video || null,
      });

      setValue('hours', hours);
      setValue('minutes', minutes);
      setValue('seconds', seconds);

      if (defaultValues.subSection?.video) {
        setValue('video', defaultValues.subSection.video);
      }
    } else if (defaultValues && defaultValues.mode === 'add') {
      reset({
        title: '',
        description: '',
        hours: 0,
        minutes: 0,
        seconds: 0,
        video: null,
      });
    }
  }, [defaultValues, setValue, reset]);

  const onSubmit = async (data) => {
    if (loading) return; 
    
    setLoading(true);
    
    try {
      console.log('Form submitted with data:', data);

      const hours = String(data.hours || 0).padStart(2, '0');
      const minutes = String(data.minutes || 0).padStart(2, '0');
      const seconds = String(data.seconds || 0).padStart(2, '0');
      const timeDuration = `${hours}:${minutes}:${seconds}`;

      if (defaultValues?.mode === 'edit') {
        const formdata = new FormData();
        formdata.append('subsectionId', defaultValues?.subSection._id);
        formdata.append('courseId', defaultValues?.courseId);
        formdata.append('title', data.title);
        formdata.append('timeDuration', timeDuration);
        formdata.append('description', data.description);

        if (data.video && typeof data.video === 'object') {
          formdata.append('video', data.video);
        }

        const result = await dispatch(updateSubSection(formdata, token));
        
        if (result) {
          handleCancel();
        }

      } else if (defaultValues?.mode === 'add') {
        const formdata = new FormData();
        formdata.append('sectionId', defaultValues?.sectionId);
        formdata.append('courseId', defaultValues?.courseId);
        formdata.append('title', data.title);
        formdata.append('timeDuration', timeDuration);
        formdata.append('description', data.description);
        
        if (data.video && typeof data.video === 'object') {
          formdata.append('video', data.video);
        }

        const result =await dispatch(addSubSection(formdata, token));
      
        if (result) {
          handleCancel();
        }
        
      }

    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelClick = (e) => {
    e.preventDefault();
    handleCancel();
  };

  const isViewMode = defaultValues?.mode === 'view';

  return (
    <div className="backdrop-blur-md fixed inset-0 flex flex-col items-center justify-center bg-richblack-500/10 z-50 overflow-y-auto">
      <h1 className="w-[40%] text-2xl font-semibold text-richblack-5 bg-richblack-700 p-3 rounded-t-lg">
        {text}
      </h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-[40%] bg-richblack-800 p-8 flex flex-col gap-4 rounded-b-lg"
      >
        <label htmlFor="video" className="flex flex-col gap-2">
          <h1 className="text-lg text-richblack-5 font-semibold">
            Lecture Video<sup className="text-pink-300">*</sup>
          </h1>
          <UploadFile
            register={register}
            name="video"
            getValues={getValues}
            setValue={setValue}
            errors={errors}
            required={defaultValues?.mode === 'add'}
            disabled={isViewMode}
            file={
              (defaultValues?.mode === 'edit' ||
                defaultValues?.mode === 'view') &&
              defaultValues?.subSection?.videoUrl
                ? defaultValues.subSection.videoUrl
                : null
            }
          />
        </label>

        <label htmlFor="title" className="flex flex-col gap-2">
          <h1 className="text-lg text-richblack-5 font-semibold">
            Lecture Title<sup className="text-pink-300">*</sup>
          </h1>
          <input
            type="text"
            placeholder="Enter Lecture Title"
            name="title"
            id="title"
            disabled={isViewMode || loading}
            className={`w-full rounded-md bg-richblack-700 p-3 text-richblack-25 text-lg ${
              isViewMode || loading ? 'opacity-70 cursor-not-allowed' : ''
            }`}
            {...register('title', {
              required: isViewMode ? false : 'Title is required',
            })}
          />
          {errors.title && !isViewMode && (
            <p className="text-pink-400 text-sm">{errors.title.message}</p>
          )}
        </label>

        <TimeDurationInput
          register={register}
          errors={errors}
          setValue={setValue}
          disabled={isViewMode || loading}
          defaultValues={
            (defaultValues?.mode === 'edit' ||
              defaultValues?.mode === 'view') &&
            defaultValues.subSection?.timeDuration
              ? {
                  hours:
                    parseInt(defaultValues.subSection.timeDuration.split(':')[0]) || 0,
                  minutes:
                    parseInt(defaultValues.subSection.timeDuration.split(':')[1]) || 0,
                  seconds:
                    parseInt(defaultValues.subSection.timeDuration.split(':')[2]) || 0,
                }
              : null
          }
        />

        <label htmlFor="description" className="flex flex-col gap-2">
          <h1 className="text-lg text-richblack-5 font-semibold">
            Lecture Description<sup className="text-pink-300">*</sup>
          </h1>
          <textarea
            placeholder="Enter Description"
            name="description"
            id="description"
            rows={4}
            disabled={isViewMode || loading}
            className={`w-full rounded-md bg-richblack-700 p-3 text-richblack-25 text-lg resize-none ${
              isViewMode || loading ? 'opacity-70 cursor-not-allowed' : ''
            }`}
            {...register('description', {
              required: isViewMode ? false : 'Description is required',
            })}
          />
          {errors.description && !isViewMode && (
            <p className="text-pink-400 text-sm">
              {errors.description.message}
            </p>
          )}
        </label>

        <div className="w-full items-center justify-end flex gap-6">
          <IconButton
            text={'Cancel'}
            type="button"
            onClick={handleCancelClick}
            customClass={'bg-richblack-700 text-richblack-5'}
            disabled={loading}
          />
          {!isViewMode && (
            <IconButton
              type="button"
              text={loading ? 'Processing...' : (defaultValues?.mode === 'edit' ? 'Update' : 'Add')}
              disabled={loading}
              onClick={handleSubmit(onSubmit)}
              customClass={'bg-yellow-25 text-richblack-900'}
            />
          )}
        </div>
      </form>
    </div>
  );
}

export default SectionModal;
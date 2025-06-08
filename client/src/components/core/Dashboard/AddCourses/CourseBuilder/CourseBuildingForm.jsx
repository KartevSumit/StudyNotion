import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import IconButton from '../../../../common/IconButton';
import { GrAddCircle } from 'react-icons/gr';
import { Link } from 'react-router-dom';
import { MdNavigateNext } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';
import NestedView from './NestedView';
import { setCourse, setStep } from '../../../../../slices/courseSlice';
import { setEditCourse } from '../../../../../slices/courseSlice';
import {
  updateSection,
  addSection,
} from '../../../../../services/operations/SectionApi';

function CourseBuildingForm() {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();

  const [editSectionName, setEditSectionName] = useState(null);
  const { course, step } = useSelector((state) => state.course);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);

  const cancelEdit = () => {
    setEditSectionName(null);
    setValue('sectionname', '');
  };

  const goBack = () => {
    dispatch(setStep(1));
    dispatch(setEditCourse(true));
    localStorage.setItem('editCourse', true);
    localStorage.setItem('step', 1);
  };
  const [loading, setLoading] = useState(false);

  const goNext = () => {
    if (course.courseContent.length === 0) {
      return toast.error('Please add at least one section to proceed');
    }
    if (
      course.courseContent.some((section) => section.subSections.length === 0)
    ) {
      return toast.error(
        'Please add at least one lecture in each section to proceed'
      );
    }

    dispatch(setStep(3));
    localStorage.setItem('step', 3);
  };

  const onSubmit = async (data) => {
    setLoading(true);
    let result;
    if (editSectionName) {
      result = await updateSection(
        {
          sectionName: data.sectionname,
          sectionId: editSectionName,
          courseId: course._id,
        },
        token
      );
    } else {
      console.log(data);
      console.log(course);
      result = await addSection(
        {
          sectionName: data.sectionname,
          courseId: course._id,
        },
        token
      );
    }

    if (result) {
      dispatch(setCourse(result));
      setValue('sectionname', '');
      setEditSectionName(null);
    }
    setLoading(false);
  };

  const handleChangeSectionName = (sectionId, sectionName) => {
    if (editSectionName === sectionId) {
      cancelEdit();
      return;
    }
    setEditSectionName(sectionId);
    setValue('sectionname', sectionName);
  };

  return (
    <div className="w-full sm:p-8 p-4 flex flex-col bg-richblack-800 rounded-xl">
      <h1 className="text-2xl font-semibold text-richblack-5">
        Course Builder
      </h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-6 mt-6 ">
          <label
            htmlFor="Section Name"
            className="text-richblack-5 sm:text-lg flex flex-col gap-1"
          >
            <h1>
              Section Name <sup className="text-pink-200">*</sup>
            </h1>
            <input
              className="w-full h-12 p-4 bg-richblack-700 rounded-xl text-richblack-5"
              type="text"
              name="sectionname"
              id="sectionname"
              placeholder="Add section to build your course"
              {...register('sectionname', { required: true })}
            />
            {errors.sectionname && (
              <span className="text-pink-200">Section name is required</span>
            )}
          </label>

          <div className="flex items-center gap-6">
            <IconButton
              type="submit"
              text={editSectionName ? 'Edit Section Name' : 'Create Section'}
              customClass={
                'border-2 border-yellow-25 text-yellow-25 md:text-xl shadow-none'
              }
              children={<GrAddCircle className="text-xl" />}
            />
            {editSectionName && (
              <Link onClick={cancelEdit}>
                <h1 className="text-richblack-300 underline text-lg">
                  Cancel edit
                </h1>
              </Link>
            )}
          </div>
        </div>
        {course?.courseContent?.length > 0 && (
          <NestedView handleChangeSectionName={handleChangeSectionName} />
        )}
      </form>
      <div className="w-full items-center justify-end flex gap-6">
        <IconButton
          text={'Back'}
          onClick={goBack}
          customClass={'bg-richblack-700 text-richblack-5'}
        />
        <IconButton
          text={'Next'}
          type="button"
          onClick={() => goNext()}
          children={<MdNavigateNext />}
          customClass={'bg-yellow-25 text-richblack-900'}
        />
      </div>
    </div>
  );
}

export default CourseBuildingForm;

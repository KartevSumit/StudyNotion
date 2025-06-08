import { useEffect, useCallback, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { HiOutlineCurrencyRupee } from 'react-icons/hi2';
import TagInput from './TagInput';
import UploadFile from './UploadFile';
import AddRequirements from './AddRequirements';
import IconButton from '../../../../common/IconButton';
import {
  setStep,
  setLoading,
  setCourse,
} from '../../../../../slices/courseSlice';
import {
  editCourseDetails,
  addCourseDetails,
} from '../../../../../services/operations/CourseApi';
import { toast } from 'react-hot-toast';
import { COURSE_STATUS } from '../../../../../utils/constants';

function CourseInformationForm() {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    getValues,
    clearErrors,
    formState: { errors, isDirty },
    setError,
  } = useForm({
    mode: 'onTouched',
    defaultValues: {
      courseName: '',
      courseDescription: '',
      price: '',
      category: '',
      requirements: [],
      tags: [],
      thumbnail: null,
      whatyouwilllearn: '',
    },
  });

  const dispatch = useDispatch();

  const authState = useSelector((state) => state.auth);
  const courseState = useSelector((state) => state.course);

  const { token } = authState;
  const { categories, course, editCourse, loading, step } = courseState;

  const courseCategories = useMemo(() => categories || [], [categories]);

  const validationRules = useMemo(
    () => ({
      courseName: {
        required: 'Course name is required',
        minLength: {
          value: 3,
          message: 'Course name must be at least 3 characters',
        },
        maxLength: {
          value: 100,
          message: 'Course name must not exceed 100 characters',
        },
      },
      courseDescription: {
        required: 'Course description is required',
        minLength: {
          value: 10,
          message: 'Description must be at least 10 characters',
        },
        maxLength: {
          value: 500,
          message: 'Description must not exceed 500 characters',
        },
      },
      price: {
        required: 'Course price is required',
        min: { value: 0, message: 'Price must be a positive number' },
        pattern: {
          value: /^\d+(\.\d{1,2})?$/,
          message: 'Please enter a valid price (up to 2 decimal places)',
        },
      },
      category: {
        required: 'Please select a category',
      },
      whatyouwilllearn: {
        required: 'Course benefits are required',
        minLength: {
          value: 10,
          message: 'Benefits must be at least 10 characters',
        },
        maxLength: {
          value: 1000,
          message: 'Benefits must not exceed 1000 characters',
        },
      },
    }),
    []
  );

  useEffect(() => {
    if (editCourse && course) {
      const formData = {
        courseName: course.courseName || '',
        courseDescription: course.courseDescription || '',
        price: course.price?.toString() || '',
        category: course.category?._id || '',
        requirements: course.requirements || [],
        tags: course.tags || [],
        thumbnail: null,
        whatyouwilllearn: course.whatyouwilllearn || '',
      };

      Object.entries(formData).forEach(([key, value]) => {
        setValue(key, value);
      });
    } else {
      reset();
    }
  }, [editCourse, course, setValue, reset]);

  const isFormUpdated = useCallback(() => {
    if (!editCourse || !course) return true;

    const formValues = getValues();

    const checks = [
      formValues.courseName !== course.courseName,
      formValues.courseDescription !== course.courseDescription,
      parseFloat(formValues.price) !== parseFloat(course.price),
      formValues.category !== course.category?._id,
      JSON.stringify(formValues.requirements) !==
        JSON.stringify(course.requirements),
      JSON.stringify(formValues.tags) !== JSON.stringify(course.tags),
      formValues.whatyouwilllearn !== course.whatyouwilllearn,
      formValues.thumbnail && formValues.thumbnail.length > 0,
    ];

    return checks.some(Boolean);
  }, [editCourse, course, getValues]);

  const createFormData = useCallback(
    (values, isEdit = false) => {
      const formData = new FormData();

      if (isEdit) {
        formData.append('courseId', course._id);

        if (values.courseName !== course.courseName) {
          formData.append('courseName', values.courseName);
        }
        if (values.courseDescription !== course.courseDescription) {
          formData.append('courseDescription', values.courseDescription);
        }
        if (parseFloat(values.price) !== parseFloat(course.price)) {
          formData.append('price', values.price);
        }
        if (values.category !== course.category?._id) {
          formData.append('category', values.category);
        }
        if (
          JSON.stringify(values.requirements) !==
          JSON.stringify(course.requirements)
        ) {
          formData.append('requirements', JSON.stringify(values.requirements));
        }
        if (JSON.stringify(values.tags) !== JSON.stringify(course.tags)) {
          formData.append('tags', JSON.stringify(values.tags));
        }
        if (values.whatyouwilllearn !== course.whatyouwilllearn) {
          formData.append('whatyouwilllearn', values.whatyouwilllearn);
        }
        if (values.thumbnail !== course.thumbnail) {
          formData.append('thumbnail', values.thumbnail);
        }
      } else {
        formData.append('courseId', course._id);
        formData.append('courseName', values.courseName);
        formData.append('courseDescription', values.courseDescription);
        formData.append('price', values.price);
        formData.append('category', values.category);
        formData.append('requirements', JSON.stringify(values.requirements));
        formData.append('tags', JSON.stringify(values.tags));
        formData.append('whatyouwilllearn', values.whatyouwilllearn);
        formData.append('status', COURSE_STATUS.DRAFT);
        formData.append('thumbnail', values.thumbnail);
      }

      return formData;
    },
    [course]
  );

  const onSubmit = async (data) => {
    try {
      console.log('Form submission data:', data);

      if (editCourse) {
        if (!isFormUpdated()) {
          toast.error('No changes made');
          return;
        }
      }

      const formData = createFormData(data, editCourse);

      dispatch(setLoading(true));

      const result = editCourse
        ? await editCourseDetails(formData, token)
        : await addCourseDetails(formData, token);

      if (result) {
        dispatch(setCourse(result));
        dispatch(setStep(2));
        localStorage.setItem('step', 2);
        toast.success(
          editCourse
            ? 'Course updated successfully!'
            : 'Course created successfully!'
        );
      }
    } catch (error) {
      console.error('Form submission error:', error);
      toast.error('Something went wrong. Please try again.');
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleContinueWithoutSaving = useCallback(() => {
    if (isDirty) {
      const confirmLeave = window.confirm(
        'You have unsaved changes. Are you sure you want to continue without saving?'
      );
      if (!confirmLeave) return;
    }
    dispatch(setStep(2));
    localStorage.setItem('step', 2);
  }, [isDirty, dispatch]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="rounded-lg bg-richblack-800 p-6 flex flex-col gap-6 h-[70vh] overflow-y-scroll pb-10"
    >
      {/* Course Name */}
      <label htmlFor="courseName" className="flex flex-col w-full gap-2">
        <h1 className="text-richblack-5 text-xl">
          Course Name<sup className="text-pink-200 text-xl">*</sup>
        </h1>
        <input
          type="text"
          id="courseName"
          className="bg-richblack-700 rounded-lg p-2 h-12 text-lg text-richblack-5"
          {...register('courseName', validationRules.courseName)}
          placeholder="Enter course name"
        />
        {errors.courseName && (
          <span className="text-pink-200 text-sm">
            {errors.courseName.message}
          </span>
        )}
      </label>

      {/* Course Description */}
      <label htmlFor="courseDescription" className="flex flex-col w-full gap-2">
        <h1 className="text-richblack-5 text-xl">
          Course Description<sup className="text-pink-200 text-xl">*</sup>
        </h1>
        <textarea
          id="courseDescription"
          rows="4"
          cols="50"
          className="bg-richblack-700 rounded-lg p-2 text-lg text-richblack-5"
          {...register('courseDescription', validationRules.courseDescription)}
          placeholder="Enter description for your course"
        />
        {errors.courseDescription && (
          <span className="text-pink-200 text-sm">
            {errors.courseDescription.message}
          </span>
        )}
      </label>

      {/* Course Price */}
      <label htmlFor="price" className="flex flex-col w-full gap-2 relative">
        <h1 className="text-richblack-5 text-xl">
          Price<sup className="text-pink-200 text-xl">*</sup>
        </h1>
        <input
          type="text"
          id="price"
          className="bg-richblack-700 rounded-lg p-2 h-12 text-lg pl-12 text-richblack-5"
          {...register('price', validationRules.price)}
          placeholder="Enter Price for your course"
        />
        <span className="absolute top-12 left-3">
          <HiOutlineCurrencyRupee className="text-richblack-200 text-2xl" />
        </span>
        {errors.price && (
          <span className="text-pink-200 text-sm">{errors.price.message}</span>
        )}
      </label>

      {/* Course Category */}
      <label htmlFor="category" className="flex flex-col w-full gap-2">
        <h1 className="text-richblack-5 text-xl">
          Category<sup className="text-pink-200 text-xl">*</sup>
        </h1>
        <select
          id="category"
          className="bg-richblack-700 rounded-lg p-2 h-12 text-lg text-richblack-5"
          {...register('category', validationRules.category)}
          disabled={!courseCategories.length || loading}
        >
          <option value="">
            {!courseCategories.length
              ? 'No categories available'
              : 'Select category'}
          </option>
          {courseCategories.map((category) => (
            <option key={category._id} value={category._id}>
              {category.name}
            </option>
          ))}
        </select>
        {errors.category && (
          <span className="text-pink-200 text-sm">
            {errors.category.message}
          </span>
        )}
      </label>

      {/* Tags Input */}
      <TagInput
        register={register}
        setValue={setValue}
        getValues={getValues}
        errors={errors}
        name="tags"
        required={true}
      />

      {/* Course Thumbnail */}
      <label htmlFor="thumbnail" className="flex flex-col w-full">
        <h1 className="text-richblack-5 text-xl">
          Course Thumbnail<sup className="text-pink-200 text-xl">*</sup>
        </h1>
        <UploadFile
          register={register}
          setValue={setValue}
          getValues={getValues}
          errors={errors}
          name="thumbnail"
          required={true}
        />
      </label>

      {/* What You Will Learn */}
      <label htmlFor="whatyouwilllearn" className="flex flex-col w-full">
        <h1 className="text-richblack-5 text-xl">
          What You Will Learn<sup className="text-pink-200 text-xl">*</sup>
        </h1>
        <textarea
          id="whatyouwilllearn"
          rows="4"
          cols="50"
          className="bg-richblack-700 rounded-lg p-2 text-lg text-richblack-5"
          {...register('whatyouwilllearn', validationRules.whatyouwilllearn)}
          placeholder="Enter what students will learn from your course"
        />
        {errors.whatyouwilllearn && (
          <span className="text-pink-200 text-sm">
            {errors.whatyouwilllearn.message}
          </span>
        )}
      </label>

      {/* Add Requirements */}
      <AddRequirements
        register={register}
        setValue={setValue}
        getValues={getValues}
        setError={setError}
        clearErrors={clearErrors}
        errors={errors}
        name="requirements"
        required={true}
      />

      <div className="w-full flex justify-end gap-6">
        {editCourse && (
          <IconButton
            text="Continue without saving"
            onClick={handleContinueWithoutSaving}
            disabled={loading}
            customClass={'bg-richblack-600 text-richblack-50'}
          />
        )}
        <IconButton
          text={
            loading ? 'Processing...' : editCourse ? 'Save Changes' : 'Next'
          }
          type="submit"
          disabled={loading}
          customClass="bg-yellow-50 text-richblack-900"
        />
      </div>
    </form>
  );
}

export default CourseInformationForm;

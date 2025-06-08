import React, { useEffect, useState } from 'react';
import Footer from '../components/common/Footer';
import CourseSlider from '../components/core/Catelog/CourseSlider';
import { useLocation } from 'react-router-dom';
import Path from '../components/common/Path';
import { useDispatch, useSelector } from 'react-redux';
import { getCategoryPage } from '../services/operations/CategoryApi';
import Spinner from '../components/common/Spinner';
import Card from '../components/core/Catelog/Card';
import { setLoading } from '../slices/authSlice';

function Catelog() {
  const location = useLocation();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);
  const [category, setCategory] = useState(null);
  const [differentCategory, setDifferentCategory] = useState(null);
  const [topSellingCourses, setTopSellingCourses] = useState(null);
  const [mostPopular, setMostPopular] = useState(true);

  useEffect(() => {
    console.log('useEffect triggered');
    const path = location.pathname;
    console.log('Current path:', path);

    const categoryId = path.split('/')[2];
    console.log('Extracted categoryId:', categoryId);

    const fetchCategoryDetails = async () => {
      try {
        dispatch(setLoading(true));
        console.log('Calling getCategoryPage...');
        const response = await getCategoryPage({ categoryId }, dispatch);
        console.log('response', response);
        setCategory(response.category);
        setDifferentCategory(response.differentCategorys);
        setTopSellingCourses(response.topSellingCourse);
      } catch (error) {
        console.log('Error fetching category details:', error);
      } finally {
        dispatch(setLoading(false));
      }
    };

    if (categoryId) {
      fetchCategoryDetails();
    } else {
      console.log('No categoryId found, skipping fetch');
    }
  }, [location.pathname, dispatch]);

  return loading ? (
    <Spinner></Spinner>
  ) : (
    <div className="w-full min-h-[92vh] text-richblack-200 flex flex-col gap-14 items-center ">
      <div className="w-full flex flex-col gap-4 bg-richblack-800 p-20 px-28">
        <div className="flex flex-col gap-1">
          <Path name={category?.name}></Path>
          <h1 className="text-4xl font-semibold text-richblack-5">
            {category?.name}
          </h1>
        </div>
        <p>{category?.description}</p>
      </div>

      <div className="w-8/12 flex flex-col items-start gap-10">
        <div className="w-full text-lg flex flex-col gap-4">
          <h1 className="text-3xl font-semibold text-richblack-5">
            Courses to get you started
          </h1>
          <div className="flex gap-3 border-b border-richblack-600">
            <button
              className={`p-2 ${
                mostPopular
                  ? 'text-yellow-100 border-b border-yellow-100'
                  : 'text-richblack-200'
              }`}
              onClick={() => setMostPopular(true)}
            >
              Most Popular
            </button>
            <button
              onClick={() => setMostPopular(false)}
              className={`p-2 ${
                mostPopular === false
                  ? 'text-yellow-100 border-b border-yellow-100'
                  : 'text-richblack-200'
              }`}
            >
              New
            </button>
          </div>
          {category?.course ? (
            <CourseSlider data={category?.course} mostPopular={mostPopular} />
          ) : (
            <div className="text-richblack-300">No courses available.</div>
          )}
        </div>

        <div className="w-full flex flex-col gap-4">
          <h1 className="text-3xl font-semibold text-richblack-5">
            Top Courses {differentCategory?.name}
          </h1>
          {differentCategory?.course ? (
            <CourseSlider
              data={differentCategory?.course}
              mostPopular={false}
            />
          ) : (
            <div className="text-richblack-300">No courses available.</div>
          )}
        </div>

        <div className="w-full flex flex-col gap-6">
          <h1 className="text-3xl font-semibold text-richblack-5">
            Frequently Bought Together
          </h1>
          <div className="flex gap-10 flex-wrap">
            {topSellingCourses?.map((course) => {
              return (
                <div className="w-[48%]">
                  <Card data={course}></Card>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default Catelog;

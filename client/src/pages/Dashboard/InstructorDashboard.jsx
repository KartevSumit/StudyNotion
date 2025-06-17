import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getInstructorDashboard } from '../../services/operations/ProfileApi';
import { setLoading } from '../../slices/profileSlice';
import { Link } from 'react-router-dom';
import Card from '../../components/common/Card';
import IntructorGraph from '../../components/core/Dashboard/IntructorGraph';

function InstructorDashboard() {
  const { user } = useSelector((state) => state.profile);
  const token = useSelector((state) => state.auth.token);
  const [data, setData] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setLoading(true));
    const fetchData = async () => {
      const result = await getInstructorDashboard(token);
      setData(result);
      console.log('result', result);
    };
    fetchData();
    dispatch(setLoading(false));
  }, [token, dispatch]);

  const totalAmount = data.reduce((acc, curr) => {
    return acc + curr.totalRevenue;
  }, 0);
  const totalStudents = data.reduce((acc, curr) => {
    return acc + curr.totalStudents;
  }, 0);

  return (
    <div className="w-full min-h-[92vh] flex justify-center">
      <div className="w-8/12 mx-auto text-richblack-100 p-12">
        <h1 className="text-3xl text-richblack-5 font-semibold">
          Hi {user.firstName}
        </h1>
        <h1 className="text-xl text-richblack-5 font-semibold">
          Let's start something new
        </h1>
        <div className="h-[50%] w-full flex items-center gap-6">
          <div className="w-[70%] bg-richblack-800 p-6">
            <IntructorGraph data={data} />
          </div>
          <div className="w-[27%] h-full flex flex-col gap-4 bg-richblack-800 p-6">
            <h1 className="text-xl text-richblack-5 font-semibold">
              Statistics
            </h1>
            <div>
              <h1 className="text-lg text-richblack-300">Total Courses</h1>
              <p className="text-xl text-richblack-5">{data.length}</p>
            </div>
            <div>
              <h1 className="text-lg text-richblack-300">Total Students</h1>
              <p className="text-xl text-richblack-5">{totalStudents}</p>
            </div>
            <div>
              <h1 className="text-lg text-richblack-300">Total Income</h1>
              <p className="text-xl text-richblack-5">{totalAmount}</p>
            </div>
          </div>
        </div>
        <div className="w-full flex flex-col gap-4 mt-6 bg-richblack-800 p-6">
          <div className="w-full flex items-center justify-between">
            <h1>Your Courses</h1>
            <Link className="text-yellow-100" to={'/dashboard/my-courses'}>
              <p>View All</p>
            </Link>
          </div>
          <div className="w-full flex items-center gap-6">
            {data.slice(0, 3).map((course, index) => {
              return <Card key={index} data={course} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default InstructorDashboard;

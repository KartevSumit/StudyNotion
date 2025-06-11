import React, { useEffect, useState } from 'react';
import Path from '../../components/common/Path';
import { useSelector, useDispatch } from 'react-redux';
import {
  getCart,
  removeFromCart,
  buyCourse,
} from '../../services/operations/ProfileApi';
import { setLoading } from '../../slices/authSlice';
import Spinner from '../../components/common/Spinner';
import { toast } from 'react-hot-toast';
import Card from '../../components/common/Card';
import IconButton from '../../components/common/IconButton';

function Cart() {
  const { token } = useSelector((state) => state.auth);
  const { loading } = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  const [cart, setCart] = useState([]);
  const [selectedCourses, setSelectedCourses] = useState([]);

  const fetchCart = async () => {
    dispatch(setLoading(true));
    try {
      const response = await getCart(token);
      if (response && Array.isArray(response)) {
        setCart(response);
      } else {
        setCart([]);
        toast.error('No cart found');
      }
    } catch (error) {
      toast.error(error.message || 'Failed to fetch cart');
    }
    console.log('cart', cart);
    dispatch(setLoading(false));
  };

  useEffect(() => {
    fetchCart();
  }, [token]);

  useEffect(() => {
    setSelectedCourses(cart);
  }, [cart]);

  const handleRemoveFromCart = async (courseId) => {
    try {
      const response = dispatch(removeFromCart(token, courseId));
      setCart((prev) => prev.filter((c) => c._id !== courseId));
    } catch (error) {
      toast.error(error.message || 'Failed to remove from cart');
    }
  };

  const handleBuyCourse = async () => {
    try {
      if (selectedCourses.length === 0) {
        toast.error('Please select a course to buy');
      } else {
        const response = dispatch(buyCourse(token, selectedCourses));
        setCart(() => cart.filter((c) => !selectedCourses.includes(c._id)));
      }
    } catch (error) {
      toast.error(error.message || 'Failed to buy course');
    }
  };

  const handleCheckboxChange = (course) => {
    if (selectedCourses.includes(course)) {
      setSelectedCourses(selectedCourses.filter((i) => i !== course));
    } else {
      setSelectedCourses([...selectedCourses, course]);
    }
  };

  return loading ? (
    <Spinner />
  ) : (
    <div className="w-full h-[92vh] p-16 flex justify-center gap-8">
      <div className="w-[70%]">
        <Path />
        <h1 className="text-3xl font-semibold text-richblack-5 mt-1">
          Wishlist
        </h1>
        <div className="w-full h-12 border-b-2 border-richblack-300"></div>
        {cart.length === 0 ? (
          <div className="w-full h-[50vh] flex items-center justify-center">
            <h1 className="text-2xl font-semibold text-richblack-5 mt-1">
              Your cart is empty
            </h1>
          </div>
        ) : (
          <div className="w-full p-4 grid grid-cols-3 gap-4">
            {cart.map((course) => {
              return (
                <div
                  key={course._id}
                  className={`p-4 hover:bg-richblack-700 rounded-xl flex flex-col gap-3 ${
                    selectedCourses.includes(course) ? 'bg-richblack-700' : ''
                  }`}
                >
                  <div className="w-full flex justify-between items-center">
                    <input
                      type="checkbox"
                      name="cart"
                      id=""
                      className="w-5 h-5"
                      onChange={() => {
                        handleCheckboxChange(course);
                      }}
                      checked={selectedCourses.includes(course)}
                    />
                    <IconButton
                      text="Remove"
                      onClick={() => {
                        handleRemoveFromCart(course._id);
                      }}
                      customClass={'bg-pink-200 px-3 py-2'}
                    ></IconButton>
                  </div>
                  <Card key={course?._id} data={course} />
                </div>
              );
            })}
          </div>
        )}
      </div>
      <div className="w-[20%] h-fit flex flex-col gap-3 p-4 bg-richblack-800 rounded-2xl">
        <h1 className="text-2xl font-semibold text-richblack-5">
          Total Amount
        </h1>
        <h1 className="text-xl font-semibold text-richblack-5">
          SubTotal Amount: ${' '}
          {selectedCourses.reduce((acc, curr) => acc + curr.price, 0)}
        </h1>
        <IconButton
          text="Buy Now"
          onClick={() => handleBuyCourse(selectedCourses)}
          customClass={'bg-yellow-50 w-full flex items-center justify-center'}
        ></IconButton>
      </div>
    </div>
  );
}

export default Cart;

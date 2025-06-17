const BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:4000';
const API_VERSION = '/api/v1';

// Auth API endpoints
export const AUTH_API = {
  SEND_OTP: BASE_URL + API_VERSION + '/auth/sendOTP',
  SIGNUP: BASE_URL + API_VERSION + '/auth/signup',
  LOGIN: BASE_URL + API_VERSION + '/auth/login',
  CHANGE_PASSWORD: BASE_URL + API_VERSION + '/auth/changePassword',
  LOGOUT: BASE_URL + API_VERSION + '/auth/logout',
  RESET_PASSWORD_TOKEN: BASE_URL + API_VERSION + '/auth/resetPasswordToken',
  RESET_PASSWORD: BASE_URL + API_VERSION + '/auth/resetPassword',
};

// Course API endpoints
export const COURSE_API = {
  CREATE_COURSE: BASE_URL + API_VERSION + '/course/createCourse',
  GET_ALL_COURSES: BASE_URL + API_VERSION + '/course/getAllCourses',
  GET_COURSE_DETAILS: BASE_URL + API_VERSION + '/course/getCourseDetails',
  PUBLISH_COURSE: BASE_URL + API_VERSION + '/course/publishCourse',
  GET_INSTRUCTOR_COURSES:
    BASE_URL + API_VERSION + '/course/getInstructorCourses',
  EDIT_COURSE_DETAILS: BASE_URL + API_VERSION + '/course/editCourseDetails',
  DELETE_COURSE: BASE_URL + API_VERSION + '/course/deleteCourse',
  CREATE_SECTION: BASE_URL + API_VERSION + '/course/createSection',
  UPDATE_SECTION: BASE_URL + API_VERSION + '/course/updateSection',
  DELETE_SECTION: BASE_URL + API_VERSION + '/course/deleteSection',
  CREATE_SUBSECTION: BASE_URL + API_VERSION + '/course/createSubSection',
  UPDATE_SUBSECTION: BASE_URL + API_VERSION + '/course/updateSubSection',
  DELETE_SUBSECTION: BASE_URL + API_VERSION + '/course/deleteSubSection',
  CREATE_CATEGORY: BASE_URL + API_VERSION + '/course/createCategory',
  GET_ALL_CATEGORIES: BASE_URL + API_VERSION + '/course/getAllCategories',
  GET_CATEGORY_DETAILS: BASE_URL + API_VERSION + '/course/getcategoryDetails',
  GET_CATEGORY_PAGE_DETAILS:
    BASE_URL + API_VERSION + '/course/categoryPageDetails',
  CREATE_RATING_AND_REVIEW:
    BASE_URL + API_VERSION + '/course/createRatingAndReview',
  GET_AVERAGE_RATING: BASE_URL + API_VERSION + '/course/getAverageRating',
  GET_ALL_RATING: BASE_URL + API_VERSION + '/course/getAllRating',
  ADD_COMPLETED_LECTURE: BASE_URL + API_VERSION + '/course/addCompletedLecture',
};

// Payment API endpoints
export const PAYMENT_API = {
  CAPTURE_PAYMENT: BASE_URL + API_VERSION + '/payment/capturePayment',
  VERIFY_SIGNATURE: BASE_URL + API_VERSION + '/payment/verifySignature',
};

// Profile API endpoints
export const PROFILE_API = {
  GET_ALL_PROFILES: BASE_URL + API_VERSION + '/profile/getAllProfile',
  UPDATE_PROFILE: BASE_URL + API_VERSION + '/profile/updateProfile',
  UPDATE_PROFILE_IMAGE: BASE_URL + API_VERSION + '/profile/updateProfileImage',
  UPLOAD_PROFILE_IMAGE: BASE_URL + API_VERSION + '/profile/uploadProfileImage',
  DELETE_CURRENT_IMAGE: BASE_URL + API_VERSION + '/profile/deleteCurrentImage',
  UPDATE_PASSWORD: BASE_URL + API_VERSION + '/profile/updatePassword',
  DELETE_USER: BASE_URL + API_VERSION + '/profile/deleteUser',
  GET_CART: BASE_URL + API_VERSION + '/profile/getCart',
  ADD_TO_CART: BASE_URL + API_VERSION + '/profile/addToCart',
  REMOVE_FROM_CART: BASE_URL + API_VERSION + '/profile/removeFromCart',
  BUY_COURSE: BASE_URL + API_VERSION + '/profile/buyCourse',
  GET_INSTRUCTOR_DASHBOARD:
    BASE_URL + API_VERSION + '/profile/getInstructorDashboard',
};

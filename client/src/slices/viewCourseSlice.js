import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  courseSectionData: {},
  courseEntireData: {},
  totalNoOfLectures: 0,
  completedLectures: 0,
  loading: false,
};

const viewCourseSlice = createSlice({
  name: 'viewCourse',
  initialState: initialState,
  reducers: {
    setCourseSectionData: (state, action) => {
      state.courseSectionData = action.payload;
    },
    setCourseEntireData: (state, action) => {
      state.courseEntireData = action.payload;
    },
    setTotalNoOfLectures: (state, action) => {
      state.totalNoOfLectures = action.payload;
    },
    setCompletedLectures: (state, action) => {
      state.completedLectures = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const {
  setCourseSectionData,
  setCourseEntireData,
  setTotalNoOfLectures,
  setCompletedLectures,
  setLoading,
} = viewCourseSlice.actions;

export default viewCourseSlice.reducer;

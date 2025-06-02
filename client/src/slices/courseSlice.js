import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  step: Number(localStorage.getItem('step')) || 1,
  course: JSON.parse(localStorage.getItem('course')) || {},
  editCourse: false,
  loading: false,
  categories: [],
};

const courseSlice = createSlice({
  name: 'course',
  initialState: initialState,
  reducers: {
    setStep: (state, action) => {
      state.step = action.payload;
    },
    setCourse: (state, action) => {
      state.course = { ...action.payload };
    },

    setEditCourse: (state, action) => {
      state.editCourse = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setCategories: (state, action) => {
      state.categories = action.payload;
    },
  },
});

export const { setStep, setCourse, setEditCourse, setLoading, setCategories } =
  courseSlice.actions;
export default courseSlice.reducer;

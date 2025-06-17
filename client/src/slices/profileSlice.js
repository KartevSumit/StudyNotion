import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: JSON.parse(localStorage.getItem('user')) || null,
  loading: false,
  selectedImage: null,
  deleteImage: false,
};

const profileSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
      localStorage.setItem('user', JSON.stringify(action.payload));
    },
    addTotalVideos(state, action) {
      const { courseId, totalVideo } = action.payload;
      const course = state.user.courseProgress.find(
        (course) => course.courseId._id === courseId
      );
      if (course) {
        course.totalVideos = totalVideo;
      }
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setSelectedImage(state, action) {
      state.selectedImage = action.payload;
    },
    setDeleteImage(state, action) {
      state.deleteImage = action.payload;
    },
  },
});

export const {
  setUser,
  setLoading,
  setSelectedImage,
  setDeleteImage,
  addTotalVideos,
} = profileSlice.actions;
export default profileSlice.reducer;

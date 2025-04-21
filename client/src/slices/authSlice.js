import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  signupData: null,
  loading: false,
  token: localStorage.getItem('token') || null,
  email: '',
  emailSent: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    setSignupData(state, action) {
      state.signupData = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setToken(state, action) {
      state.token = action.payload;
    },
    setEmail(state, action) {
      state.email = action.payload;
    },
    setEmailSent(state, action) {
      state.emailSent = action.payload;
    },
  },
});

export const { setToken, setLoading, setSignupData, setEmail, setEmailSent } =
  authSlice.actions;
export default authSlice.reducer;

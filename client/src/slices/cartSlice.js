import { createSlice } from '@reduxjs/toolkit';
import { addToCart } from '../services/operations/ProfileApi';

const initialState = {
  totalItems: localStorage.getItem('totalItems') || 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setItems: (state, action) => {
      state.totalItems = action.payload.length;
      localStorage.setItem('totalItems', action.payload.length);
    },
    AddToCart: (state, action) => {
      state.totalItems = state.totalItems + 1;
      localStorage.setItem('totalItems', state.totalItems);
    },
    removeFromCart: (state, action) => {
      state.totalItems = state.totalItems - 1;
      localStorage.setItem('totalItems', state.totalItems);
    },
    clearCart: (state, action) => {
      state.totalItems = 0;
      localStorage.setItem('totalItems', 0);
    },
  },
});

export const { setItems, AddToCart, removeFromCart, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;

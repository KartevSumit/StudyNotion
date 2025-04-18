import { createSlice } from "@reduxjs/toolkit";
import {toast} from "react-hot-toast";

const initialState = {
    totalItems: localStorage.getItem("totalItems") || 0,
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        setTotalItems: (state, action) => {
            state.totalItems = action.payload;
            localStorage.setItem("totalItems", action.payload);
        },
        clearCart: (state) => {
            state.totalItems = 0;
            localStorage.removeItem("totalItems");
            toast.success("Cart cleared");
        },
        addToCart: (state, action) => {
            toast.success("Item added to cart");
        },
        removeFromCart: (state, action) => {
            toast.error("Item removed from cart");
        },
    },
}); 

export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
